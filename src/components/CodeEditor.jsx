import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import Editor from "@monaco-editor/react";
import { FaSpinner } from "react-icons/fa";
import { FaPlay, FaUndo, FaEye } from "react-icons/fa";

const CodeEditor = forwardRef(({ editors, task }, ref) => {
  // Always use latest boilerplate for resets
  const getBoilerplate = (language) => {
    if (language === "html") return task?.html?.boilerplate || "";
    if (language === "css") return task?.css?.boilerplate || "body { font-family: Arial, sans-serif; }";
    if (language === "js") return task?.js?.boilerplate || 'console.log("Hello from JavaScript!");';
    if (language === "solidity") return task?.solidity?.boilerplate || `\n      // SPDX-License-Identifier: MIT\n      pragma solidity ^0.8.0;\n\n      contract HelloWorld {\n        string public greet = "Hello, Solidity!";\n      }\n      `;
    return "";
  };

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
  const previewEnabled = editors.some((editor) => ["html", "css", "js"].includes(editor));

  const validateCode = (language, code) => {
    const taskSolution =
      task?.[language]?.solution || task?.solution?.[language];
    if (!taskSolution) return null;

    const normalize = (str) => (str ? str.trim().replace(/\r\n/g, "\n") : "");
    return normalize(code) === normalize(taskSolution);
  };

  const handleManualCheck = (editorType) => {
    const isValid = validateCode(editorType, codeStates[editorType]);
    setManualCheckResults((prev) => ({
      ...prev,
      [editorType]: isValid,
    }));

    // if (isValid) {
    //   alert("✅ Correct! Your code matches the solution.");
    // } else {
    //   alert("❌ Incorrect. Your code doesn't match the expected solution.");
    // }

    return isValid;
  };

  useEffect(() => {
    // Automatic validation on code change
    const results = {};
    let allCorrect = true;

    editors.forEach((editorType) => {
      if (task?.[editorType]?.solution) {
        const isValid = validateCode(editorType, codeStates[editorType]);
        results[editorType] = isValid;
        if (!isValid) allCorrect = false;
      }
    });

    setValidationResults(results);

    // Notify parent component if all expected solutions are correct
    if (allCorrect && Object.keys(results).length > 0) {
      task?.onCorrectSolution?.();
    }

    // Update output for HTML/CSS/JS preview
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

    // JS console preview
    if (activeTab === "preview" && editors.includes("js")) {
      // Run JS code in a sandboxed iframe and capture console.log
      const iframe = document.createElement("iframe");
      iframe.style.display = "none";
      document.body.appendChild(iframe);
      let logs = [];
      try {
        iframe.contentWindow.console.log = function (...args) {
          logs.push(args.join(" "));
        };
        // eslint-disable-next-line no-eval
        iframe.contentWindow.eval(codeStates.js);
      } catch (err) {
        logs.push("Error: " + err.message);
      }
      setJsConsole(logs);
      document.body.removeChild(iframe);
    }
  }, [codeStates, editors, task, activeTab]);

  useImperativeHandle(ref, () => ({
    validateAll: () => {
      const results = {};
      editors.forEach((editorType) => {
        if (task?.[editorType]?.solution) {
          results[editorType] = validateCode(
            editorType,
            codeStates[editorType]
          );
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
  }));

  const handleCodeChange = (language, value) => {
    setCodeStates((prev) => ({
      ...prev,
      [language]: value || "",
    }));
  };

  const runSolidityCode = () => {
    try {
      console.log("Solidity Code to Compile:", codeStates.solidity);
      alert("Solidity code compilation is not implemented in this example!");
    } catch (error) {
      console.error("Error compiling Solidity:", error);
    }
  };

  const resetCode = (language) => {
    setCodeStates((prev) => ({
      ...prev,
      [language]: getBoilerplate(language),
    }));
    // Clear manual check result when resetting
    setManualCheckResults((prev) => {
      const newResults = { ...prev };
      delete newResults[language];
      return newResults;
    });
  };
  // Reset code and active tab when lesson/task changes
  useEffect(() => {
    const states = {};
    editors.forEach((lang) => {
      states[lang] = getBoilerplate(lang);
    });
    setCodeStates(states);
    setManualCheckResults({});
    setActiveTab(editors[0] || "html");
  }, [task, editors]);

  const getValidationStatus = (editorType) => {
    if (!task?.[editorType]?.solution) return null;

    if (manualCheckResults.hasOwnProperty(editorType)) {
      return manualCheckResults[editorType] ? "✅ Correct" : "❌ Incorrect";
    }

    return validationResults[editorType] ? "✅ Correct" : "✏️ Needs work";
  };

  return (
    <div className="flex flex-col pb-[50px] lg:pb-[100px] content-center mb-10 lg:h-[100vh] lg:overflow-y-auto">
      {/* Tabs for language editors and preview */}
      <div className="flex gap-2 border-b mb-4 px-2">
        {editors.map((editorType) => (
          <button
            key={editorType}
            className={`px-4 py-2 rounded-t-md font-semibold transition-colors duration-200 ${activeTab === editorType ? "bg-purple text-white" : "bg-gray-100 text-gray-700 hover:bg-purple/10"}`}
            onClick={() => setActiveTab(editorType)}
            style={{ position: "relative" }}
          >
            {editorType.toUpperCase()}
          </button>
        ))}
        {previewEnabled && (
          <button
            key="preview"
            className={`px-4 py-2 rounded-t-md font-semibold transition-colors duration-200 ${activeTab === "preview" ? "bg-purple text-white" : "bg-gray-100 text-gray-700 hover:bg-green-100"}`}
            onClick={() => setActiveTab("preview")}
            style={{ position: "relative" }}
          >
            <span className="flex items-center gap-1"><FaEye className="inline" /> Preview</span>
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
                      : "bg-yellow-400 text-black border-yellow-500"}`}
                >
                  {getValidationStatus(activeTab)}
                </span>
              )}
              {/* Action icons, shown on hover */}
              <div className="flex gap-2 group">
                <button
                  onClick={() => handleManualCheck(activeTab)}
                  className="relative p-2 rounded hover:bg-purple/20 transition-colors"
                  title="Check Solution"
                >
                  <FaPlay className="text-purple" />
                  <span className="absolute left-1/2 -translate-x-1/2 top-full mt-1 text-xs bg-black text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">Check</span>
                </button>
                <button
                  onClick={() => resetCode(activeTab)}
                  className="relative p-2 rounded hover:bg-blue-100 transition-colors"
                  title="Reset Code"
                >
                  <FaUndo className="text-blue-600" />
                  <span className="absolute left-1/2 -translate-x-1/2 top-full mt-1 text-xs bg-black text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">Reset</span>
                </button>
                {activeTab === "solidity" && (
                  <button
                    onClick={runSolidityCode}
                    className="relative p-2 rounded hover:bg-purple/20 transition-colors"
                    title="Run Solidity"
                  >
                    <FaPlay className="text-purple" />
                    <span className="absolute left-1/2 -translate-x-1/2 top-full mt-1 text-xs bg-black text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">Run</span>
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
              />
            </div>
          </div>
        ) : (
          previewEnabled && (
            <div className="flex-1">
              {editors.includes("js") && (
                <div className="mb-2">
                  <div className="font-semibold mb-1">Console Output</div>
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
                <iframe
                  srcDoc={output}
                  title="Live Preview"
                  style={{ width: "100%", height: "400px", border: "1px solid #ccc" }}
                  sandbox="allow-scripts allow-same-origin"
                />
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
