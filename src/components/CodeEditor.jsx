import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
  useCallback,
  useRef,
} from "react";
import Editor from "@monaco-editor/react";
import { FaSpinner } from "react-icons/fa";
import { FaPlay, FaUndo, FaEye } from "react-icons/fa";

const CodeEditor = forwardRef(({ editors, task }, ref) => {
  // Always use latest boilerplate for resets
  const getBoilerplate = useCallback((language) => {
    if (language === "html") return task?.html?.boilerplate || "";
    if (language === "css") return task?.css?.boilerplate || "body { font-family: Arial, sans-serif; }";
    if (language === "js") return task?.js?.boilerplate || 'console.log("Hello from JavaScript!");';
    if (language === "solidity") return task?.solidity?.boilerplate || `\n      // SPDX-License-Identifier: MIT\n      pragma solidity ^0.8.0;\n\n      contract HelloWorld {\n        string public greet = "Hello, Solidity!";\n      }\n      `;
    return "";
  }, [task]);

  const [codeStates, setCodeStates] = useState(() => {
    const states = {};
    editors.forEach((lang) => {
      states[lang] = getBoilerplate(lang);
    });
    return states;
  });

  const [output, setOutput] = useState("");
  const [jsConsole, setJsConsole] = useState([]);
  const [validationResults, setValidationResults] = useState({});
  const [manualCheckResults, setManualCheckResults] = useState({});
  const [activeTab, setActiveTab] = useState(editors[0] || "html");
  const [isValidating, setIsValidating] = useState(false);

  const previewEnabled = editors.some((editor) => ["html", "css", "js"].includes(editor));
  const iframeRef = useRef(null);

  // Cleanup iframe on unmount
  useEffect(() => {
    return () => {
      if (iframeRef.current) {
        document.body.removeChild(iframeRef.current);
        iframeRef.current = null;
      }
    };
  }, []);

  const validateCode = useCallback((language, code) => {
    const taskSolution = task?.[language]?.solution || task?.solution?.[language];
    if (!taskSolution) return null;

    const normalize = (str) => {
      if (!str) return "";
      return str
        .trim()
        .replace(/\r\n/g, "\n")
        .replace(/\s+/g, " ")
        .replace(/;\s*/g, ";")
        .replace(/{\s*/g, "{")
        .replace(/}\s*/g, "}")
        .replace(/,\s*/g, ",")
        .replace(/:\s*/g, ":");
    };

    return normalize(code) === normalize(taskSolution);
  }, [task]);

  const handleManualCheck = useCallback(async (editorType) => {
    setIsValidating(true);
    try {
      const isValid = validateCode(editorType, codeStates[editorType]);
      setManualCheckResults((prev) => ({
        ...prev,
        [editorType]: isValid,
      }));
      return isValid;
    } catch (error) {
      console.error("Validation error:", error);
      setManualCheckResults((prev) => ({
        ...prev,
        [editorType]: false,
      }));
      return false;
    } finally {
      setIsValidating(false);
    }
  }, [validateCode, codeStates]);

  // Debounced validation to improve performance
  const debouncedValidate = useCallback(
    (() => {
      let timeoutId;
      return (language, code) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          if (task?.[language]?.solution) {
            const isValid = validateCode(language, code);
            setValidationResults((prev) => ({
              ...prev,
              [language]: isValid,
            }));
          }
        }, 500); // 500ms debounce
      };
    })(),
    [task, validateCode]
  );

  const updateOutput = useCallback(() => {
    if (editors.some((editor) => ["html", "css", "js"].includes(editor))) {
      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <style>${codeStates.css || ""}</style>
        </head>
        <body>
          ${codeStates.html || ""}
          <script>${codeStates.js || ""}</script>
        </body>
        </html>
      `;
      setOutput(htmlContent);
    }
  }, [codeStates, editors]);

  const runJsCode = useCallback(() => {
    if (!editors.includes("js")) return;

    // Clean up previous iframe
    if (iframeRef.current) {
      document.body.removeChild(iframeRef.current);
    }

    const iframe = document.createElement("iframe");
    iframe.style.display = "none";
    iframeRef.current = iframe;
    document.body.appendChild(iframe);

    let logs = [];
    try {
      iframe.contentWindow.console.log = function (...args) {
        logs.push(args.join(" "));
      };
      iframe.contentWindow.console.error = function (...args) {
        logs.push("Error: " + args.join(" "));
      };
      // eslint-disable-next-line no-eval
      iframe.contentWindow.eval(codeStates.js);
    } catch (err) {
      logs.push("Error: " + err.message);
    }

    setJsConsole(logs);
  }, [codeStates.js, editors]);

  useEffect(() => {
    updateOutput();
    if (activeTab === "preview" && editors.includes("js")) {
      runJsCode();
    }
  }, [updateOutput, runJsCode, activeTab, editors]);

  useImperativeHandle(ref, () => ({
    validateAll: () => {
      const results = {};
      editors.forEach((editorType) => {
        if (task?.[editorType]?.solution) {
          results[editorType] = validateCode(editorType, codeStates[editorType]);
        }
      });
      return results;
    },
    hasCorrectSolution: () => {
      return editors.every((editorType) => {
        if (!task?.[editorType]?.solution) return true;
        return validateCode(editorType, codeStates[editorType]);
      });
    },
  }), [editors, task, validateCode, codeStates]);

  const handleCodeChange = useCallback((language, value) => {
    const newCode = value || "";
    setCodeStates((prev) => ({
      ...prev,
      [language]: newCode,
    }));

    // Debounced validation
    debouncedValidate(language, newCode);
  }, [debouncedValidate]);

  const runSolidityCode = useCallback(() => {
    try {
      console.log("Solidity Code to Compile:", codeStates.solidity);
      // Implement Solidity compilation logic here
      alert("Solidity code compilation is not implemented in this example!");
    } catch (error) {
      console.error("Error compiling Solidity:", error);
    }
  }, [codeStates.solidity]);

  const resetCode = useCallback((language) => {
    const boilerplate = getBoilerplate(language);
    setCodeStates((prev) => ({
      ...prev,
      [language]: boilerplate,
    }));

    // Clear validation results
    setManualCheckResults((prev) => {
      const newResults = { ...prev };
      delete newResults[language];
      return newResults;
    });

    setValidationResults((prev) => {
      const newResults = { ...prev };
      delete newResults[language];
      return newResults;
    });
  }, [getBoilerplate]);

  // Reset code and active tab when lesson/task changes
  useEffect(() => {
    const states = {};
    editors.forEach((lang) => {
      states[lang] = getBoilerplate(lang);
    });
    setCodeStates(states);
    setManualCheckResults({});
    setValidationResults({});
    setActiveTab(editors[0] || "html");
  }, [task, editors, getBoilerplate]);

  const getValidationStatus = useCallback((editorType) => {
    if (!task?.[editorType]?.solution) return null;

    if (manualCheckResults.hasOwnProperty(editorType)) {
      return manualCheckResults[editorType] ? "✅ Correct" : "❌ Incorrect";
    }

    return validationResults[editorType] ? "✅ Correct" : "✏️ Needs work";
  }, [task, manualCheckResults, validationResults]);

  return (
    <div className="flex flex-col content-center mb-10 lg:h-[100vh] lg:overflow-y-auto">
      {/* Tabs for language editors and preview */}
      <div className="flex gap-2 border-b mb-4 px-2 overflow-x-auto">
        {editors.map((editorType) => (
          <button
            key={editorType}
            className={`px-4 py-2 rounded-t-md font-semibold transition-colors duration-200 whitespace-nowrap ${activeTab === editorType
                ? "bg-purple text-white"
                : "bg-gray-100 text-gray-700 hover:bg-purple/10"
              }`}
            onClick={() => setActiveTab(editorType)}
          >
            {editorType.toUpperCase()}
          </button>
        ))}
        {previewEnabled && (
          <button
            key="preview"
            className={`px-4 py-2 rounded-t-md font-semibold transition-colors duration-200 whitespace-nowrap ${activeTab === "preview"
                ? "bg-green-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-green-100"
              }`}
            onClick={() => setActiveTab("preview")}
          >
            <span className="flex items-center gap-1">
              <FaEye className="inline" /> Preview
            </span>
          </button>
        )}
      </div>

      {/* Editor or Preview based on activeTab */}
      <div className="flex flex-col lg:flex-row gap-6 px-2">
        {activeTab !== "preview" ? (
          <div className="flex-1 relative">
            {task?.[activeTab]?.description && (
              <div className="mb-4 bg-white p-3 rounded shadow">
                <h4 className="font-bold mb-1">Task:</h4>
                <p className="italic text-gray-700">{task?.[activeTab]?.description}</p>
              </div>
            )}
            <div className="flex items-center gap-2 mb-2">
              {/* Validation status */}
              {task?.[activeTab]?.solution && (
                <span
                  className={`px-3 py-1 rounded text-xs font-bold shadow-sm ${manualCheckResults.hasOwnProperty(activeTab)
                      ? manualCheckResults[activeTab]
                        ? "bg-green-600 text-white border-green-700"
                        : "bg-red-600 text-white border-red-700"
                      : validationResults[activeTab]
                        ? "bg-green-600 text-white border-green-700"
                        : "bg-yellow-400 text-black border-yellow-500"
                    }`}
                >
                  {getValidationStatus(activeTab)}
                </span>
              )}

              {/* Action icons */}
              <div className="flex gap-2">
                <button
                  onClick={() => handleManualCheck(activeTab)}
                  disabled={isValidating}
                  className="relative p-2 rounded hover:bg-purple/20 transition-colors disabled:opacity-50"
                  title="Check Solution"
                >
                  {isValidating ? (
                    <FaSpinner className="animate-spin text-purple" />
                  ) : (
                    <FaPlay className="text-purple" />
                  )}
                  <span className="absolute left-1/2 -translate-x-1/2 top-full mt-1 text-xs bg-black text-white px-2 py-1 rounded opacity-0 hover:opacity-100 pointer-events-none transition-opacity">
                    Check
                  </span>
                </button>
                <button
                  onClick={() => resetCode(activeTab)}
                  className="relative p-2 rounded hover:bg-blue-100 transition-colors"
                  title="Reset Code"
                >
                  <FaUndo className="text-blue-600" />
                  <span className="absolute left-1/2 -translate-x-1/2 top-full mt-1 text-xs bg-black text-white px-2 py-1 rounded opacity-0 hover:opacity-100 pointer-events-none transition-opacity">
                    Reset
                  </span>
                </button>
                {activeTab === "solidity" && (
                  <button
                    onClick={runSolidityCode}
                    className="relative p-2 rounded hover:bg-purple/20 transition-colors"
                    title="Run Solidity"
                  >
                    <FaPlay className="text-purple" />
                    <span className="absolute left-1/2 -translate-x-1/2 top-full mt-1 text-xs bg-black text-white px-2 py-1 rounded opacity-0 hover:opacity-100 pointer-events-none transition-opacity">
                      Run
                    </span>
                  </button>
                )}
              </div>
            </div>

            {/* Editor */}
            <div className="border rounded shadow">
              <Editor
                height="400px"
                language={activeTab}
                value={codeStates[activeTab]}
                onChange={(value) => handleCodeChange(activeTab, value)}
                theme="vs-dark"
                loading={
                  <div className="flex flex-col items-center justify-center h-96">
                    <FaSpinner className="animate-spin text-purple text-4xl mb-2" />
                    <span className="text-purple font-semibold">Loading editor...</span>
                  </div>
                }
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  lineNumbers: 'on',
                  roundedSelection: false,
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                }}
              />
            </div>
          </div>
        ) : (
          previewEnabled && (
            <div className="flex-1">
              {editors.includes("js") && (
                <div className="mb-4">
                  <div className="font-semibold mb-2">Console Output</div>
                  <div className="bg-black text-green-400 rounded p-3 h-48 overflow-y-auto font-mono text-sm border border-gray-700">
                    {jsConsole.length === 0 ? (
                      <span className="text-gray-400">No output</span>
                    ) : (
                      jsConsole.map((line, idx) => (
                        <div key={idx}>{line}</div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {(editors.includes("html") || editors.includes("css")) && (
                <div>
                  <div className="font-semibold mb-2">Live Preview</div>
                  <iframe
                    srcDoc={output}
                    title="Live Preview"
                    className="w-full h-96 border border-gray-300 rounded"
                    sandbox="allow-scripts allow-same-origin"
                  />
                </div>
              )}
            </div>
          )
        )}
      </div>
    </div>
  );
});

CodeEditor.displayName = "CodeEditor";

export default CodeEditor;