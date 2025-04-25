import React, { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";

const CodeEditor = ({ editors, expectedSolutions = {} }) => {
  const [codeStates, setCodeStates] = useState({
    html: "<!DOCTYPE html>\n<html>\n<body>\n<h1>Hello, World!</h1>\n</body>\n</html>",
    css: "body { font-family: Arial, sans-serif; }",
    js: 'console.log("Hello from JavaScript!");',
    solidity: `
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract HelloWorld {
    string public greet = "Hello, Solidity!";
}
`,
  });

  const [output, setOutput] = useState("");
  const [validationResults, setValidationResults] = useState({});

  const validateCode = (language, code) => {
    if (!expectedSolutions[language]) return null;

    const expected = expectedSolutions[language];

    switch (language) {
      case "html":
        return expected.regex
          ? new RegExp(expected.regex).test(code)
          : code.trim() === expected.code;

      case "css":
        return expected.rules.every((rule) => code.includes(rule));

      case "js":
        return expected.testFunction
          ? expected.testFunction(code)
          : code.includes(expected.snippet);

      case "solidity":
        // For Solidity we might check contract structure
        return expected.contractParts.every((part) => code.includes(part));

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
    // if (allCorrect && Object.keys(expectedSolutions).length > 0) {
    //   onCorrectSolution?.();
    // }

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
  }, [codeStates, editors, expectedSolutions]);

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

  // Get validation status for an editor
  const getValidationStatus = (editorType) => {
    if (!expectedSolutions[editorType]) return null;
    return validationResults[editorType] ? "✅ Correct" : "❌ Needs work";
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <div style={{ flex: 1, margin: "10px" }}>
        {editors.map((editorType) => (
          <div key={editorType} style={{ marginBottom: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3>{editorType.toUpperCase()}</h3>
              {expectedSolutions[editorType] && (
                <div
                  style={{
                    padding: "5px 10px",
                    backgroundColor: validationResults[editorType]
                      ? "#4CAF50"
                      : "#f44336",
                    color: "white",
                    borderRadius: "4px",
                    marginBottom: 10,
                  }}
                >
                  {getValidationStatus(editorType)}
                </div>
              )}
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
