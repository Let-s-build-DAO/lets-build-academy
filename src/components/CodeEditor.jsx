import React, { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";

const CodeEditor = ({ editors }) => {
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

  useEffect(() => {
    
    if (editors.includes("html") || editors.includes("css") || editors.includes("js")) {
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

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <div style={{ flex: 1, margin: "10px" }}>
        {editors.map((editorType) => (
          <div key={editorType} style={{ marginBottom: "20px" }}>
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
