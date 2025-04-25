import React, { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";

const CodeEditor = ({ editors, task }) => {
  const initialCodeStates = {
    html:
      task?.html?.boilerplate ||
      "<!DOCTYPE html>\n<html>\n<body>\n<h1>Hello, World!</h1>\n</body>\n</html>",
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

  const expectedSolutions = {
    html: task?.html?.solution,
    css: task?.css?.solution,
    js: task?.js?.solution,
    solidity: task?.solidity?.solution,
  };

  const validateCode = (language, code) => {
    if (!expectedSolutions[language]) return null;

    const expected = expectedSolutions[language];

    switch (language) {
      case "html":
        return expected.regex
          ? new RegExp(expected.regex).test(code)
          : expected.code
          ? code.trim() === expected.code.trim()
          : false;

      case "css":
        return expected.rules
          ? expected.rules.every((rule) => code.includes(rule))
          : expected.code
          ? code.trim() === expected.code.trim()
          : false;

      case "js":
        // For JS we might check function definitions or output
        return expected.testFunction
          ? expected.testFunction(code)
          : expected.snippet
          ? code.includes(expected.snippet)
          : expected.code
          ? code.trim() === expected.code.trim()
          : false;

      case "solidity":
        // For Solidity we might check contract structure
        return expected.contractParts
          ? expected.contractParts.every((part) => code.includes(part))
          : expected.code
          ? code.trim() === expected.code.trim()
          : false;

      default:
        return false;
    }
  };

  useEffect(() => {
    // Validate all active editors whenever code changes
    const results = {};
    let allCorrect = true;

    editors.forEach((editorType) => {
      if (expectedSolutions[editorType]) {
        const isValid = validateCode(editorType, codeStates[editorType]);
        results[editorType] = isValid;
        if (!isValid) allCorrect = false;
      }
    });

    setValidationResults(results);

    // Notify parent component if all expected solutions are correct
    if (allCorrect && Object.keys(expectedSolutions).length > 0) {
      task?.onCorrectSolution?.();
    }

    // Update output for HTML/CSS/JS preview
    if (
      editors.includes("html") ||
      editors.includes("css") ||
      editors.includes("js")
    ) {
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
  }, [codeStates, editors, expectedSolutions, task]);

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

  const getValidationStatus = (editorType) => {
    if (!expectedSolutions[editorType]) return null;
    return validationResults[editorType] ? "✅ Correct" : "❌ Needs work";
  };

  const resetCode = (language) => {
    setCodeStates((prev) => ({
      ...prev,
      [language]: initialCodeStates[language],
    }));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <div style={{ flex: 1, margin: "10px" }}>
        {editors.map((editorType) => (
          <div key={editorType} style={{ marginBottom: "20px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h3>{editorType.toUpperCase()}</h3>
              <div style={{ display: "flex", alignItems: "center" }}>
                {expectedSolutions[editorType] && (
                  <div
                    style={{
                      padding: "5px 10px",
                      backgroundColor: validationResults[editorType]
                        ? "#4CAF50"
                        : "#f44336",
                      color: "white",
                      borderRadius: "4px",
                      marginRight: "10px",
                    }}
                  >
                    {getValidationStatus(editorType)}
                  </div>
                )}
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
                  Reset Code
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
