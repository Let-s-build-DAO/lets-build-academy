import React, { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";

const CodeEditor = ({ editors, task }) => {
  const initialCodeStates = {
    html: task?.html?.boilerplate,
    css: task?.css?.boilerplate || "body { font-family: Arial, sans-serif; }",
    js: task?.js?.boilerplate || 'console.log("Hello from JavaScript!");',
    solidity:
      task?.solidity?.boilerplate ||
      `
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract HelloWorld {
    string public greet = "Hello, Solidity!";
}
`,
  };

  const [codeStates, setCodeStates] = useState(initialCodeStates);
  const [output, setOutput] = useState("");
  const [validationResults, setValidationResults] = useState({});
  const [manualCheckResults, setManualCheckResults] = useState({});

  const validateCode = (language, code) => {
    const taskSolution =
      task?.[language]?.solution || task?.solution?.[language];
    if (!taskSolution) return null;

    const normalize = (str) => str.trim().replace(/\r\n/g, "\n");
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
  }, [codeStates, editors, task]);

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
      [language]: initialCodeStates[language],
    }));
    // Clear manual check result when resetting
    setManualCheckResults((prev) => {
      const newResults = { ...prev };
      delete newResults[language];
      return newResults;
    });
  };

  const getValidationStatus = (editorType) => {
    if (!task?.[editorType]?.solution) return null;

    if (manualCheckResults.hasOwnProperty(editorType)) {
      return manualCheckResults[editorType] ? "✅ Correct" : "❌ Incorrect";
    }

    return validationResults[editorType] ? "✅ Correct" : "✏️ Needs work";
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          flex: 1,
          margin: "10px",
          // overflowY: "auto", // Make this side scrollable
          // height: "100%",
          // paddingRight: "10px",
        }}
      >
        {editors.map((editorType) => (
          <div key={editorType} style={{ marginBottom: "20px" }}>
            {task?.[editorType]?.description && (
              <div style={{ marginBottom: "10px" }}>
                <h4>Task:</h4>
                <p style={{ margin: "5px 0", fontStyle: "italic" }}>
                  {task?.[editorType]?.description}
                </p>
              </div>
            )}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              <h3>{editorType.toUpperCase()}</h3>
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                {task?.[editorType]?.solution && (
                  <div
                    style={{
                      padding: "5px 10px",
                      backgroundColor: manualCheckResults.hasOwnProperty(
                        editorType
                      )
                        ? manualCheckResults[editorType]
                          ? "#4CAF50"
                          : "#f44336"
                        : validationResults[editorType]
                        ? "#4CAF50"
                        : "#FF9800",
                      color: "white",
                      borderRadius: "4px",
                    }}
                  >
                    {getValidationStatus(editorType)}
                  </div>
                )}
                <button
                  onClick={() => handleManualCheck(editorType)}
                  style={{
                    padding: "5px 10px",
                    backgroundColor: "#FF9800",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Check
                </button>
                <button
                  onClick={() => resetCode(editorType)}
                  style={{
                    padding: "5px 10px",
                    backgroundColor: "#2196F3",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Reset
                </button>
              </div>
            </div>

            {editorType === "solidity" ? (
              <div>
                <Editor
                  height="400px"
                  language="solidity"
                  value={codeStates[editorType]}
                  onChange={(value) => handleCodeChange(editorType, value)}
                  theme="vs-dark"
                />
                <button
                  onClick={runSolidityCode}
                  style={{ marginTop: "10px", padding: "10px" }}
                >
                  Run Solidity
                </button>
              </div>
            ) : (
              <Editor
                height="400px"
                language={editorType}
                value={codeStates[editorType]}
                onChange={(value) => handleCodeChange(editorType, value)}
                theme="vs-dark"
              />
            )}
          </div>
        ))}
      </div>

      {editors.some((editor) => ["html", "css", "js"].includes(editor)) && (
        <div style={{ flex: 1, margin: "10px" }}>
          <h3>Live Preview</h3>
          <iframe
            srcDoc={output}
            title="Live Preview"
            style={{ width: "100%", height: "100%", border: "1px solid #ccc" }}
            sandbox="allow-scripts allow-same-origin"
          />
        </div>
      )}
    </div>
  );
};

export default CodeEditor;
