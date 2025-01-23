import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';

const CodeEditor = ({ courseName }) => {
  const [htmlCode, setHtmlCode] = useState('<!DOCTYPE html>\n<html>\n<body>\n<h1>Hello, World!</h1>\n</body>\n</html>');
  const [cssCode, setCssCode] = useState('body { font-family: Arial, sans-serif; }');
  const [jsCode, setJsCode] = useState('console.log("Hello from JavaScript!");');
  const [solidityCode, setSolidityCode] = useState(`
    // SPDX-License-Identifier: MIT
    pragma solidity ^0.8.0;

    contract HelloWorld {
        string public greet = "Hello, Solidity!";
    }
  `);

  const [output, setOutput] = useState('');

  useEffect(() => {
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>${cssCode}</style>
      </head>
      <body>
        ${htmlCode}
        <script>${jsCode}</script>
      </body>
      </html>
    `;
    setOutput(htmlContent);
  }, [htmlCode, cssCode, jsCode]);

  const runSolidityCode = async () => {
    try {
      console.log('Solidity Code to Compile:', solidityCode);
      alert('Solidity code compilation is not implemented in this example!');
    } catch (error) {
      console.error('Error compiling Solidity:', error);
    }
  };

  const renderEditors = () => {
    const includesHTML = courseName.includes('HTML');
    const includesCSS = courseName.includes('CSS');
    const includesJavaScript = courseName.includes('JavaScript');
    const includesSolidity = courseName.includes('Solidity');

    // If none of the keywords are included, show all editors
    if (!includesHTML && !includesCSS && !includesJavaScript && !includesSolidity) {
      return (
        <>
          <div>
            <h3>HTML</h3>
            <Editor
              height="400px"
              language="html"
              value={htmlCode}
              onChange={(value) => setHtmlCode(value || '')}
              theme="vs-dark"
            />
          </div>
          <div>
            <h3>CSS</h3>
            <Editor
              height="400px"
              language="css"
              value={cssCode}
              onChange={(value) => setCssCode(value || '')}
              theme="vs-dark"
            />
          </div>
          <div>
            <h3>JavaScript</h3>
            <Editor
              height="400px"
              language="javascript"
              value={jsCode}
              onChange={(value) => setJsCode(value || '')}
              theme="vs-dark"
            />
          </div>
          <div>
            <h3>Solidity</h3>
            <Editor
              height="400px"
              language="solidity"
              value={solidityCode}
              onChange={(value) => setSolidityCode(value || '')}
              theme="vs-dark"
            />
            <button onClick={runSolidityCode} style={{ marginTop: '10px', padding: '10px' }}>
              Run Solidity
            </button>
          </div>
        </>
      );
    }

    // Display editors based on included keywords
    return (
      <>
        {includesHTML && (
          <div>
            <h3>HTML</h3>
            <Editor
              height="400px"
              language="html"
              value={htmlCode}
              onChange={(value) => setHtmlCode(value || '')}
              theme="vs-dark"
            />
          </div>
        )}
        {includesCSS && (
          <div>
            <h3>CSS</h3>
            <Editor
              height="400px"
              language="css"
              value={cssCode}
              onChange={(value) => setCssCode(value || '')}
              theme="vs-dark"
            />
          </div>
        )}
        {includesJavaScript && (
          <div>
            <h3>JavaScript</h3>
            <Editor
              height="400px"
              language="javascript"
              value={jsCode}
              onChange={(value) => setJsCode(value || '')}
              theme="vs-dark"
            />
          </div>
        )}
        {includesSolidity && (
          <div>
            <h3>Solidity</h3>
            <Editor
              height="400px"
              language="solidity"
              value={solidityCode}
              onChange={(value) => setSolidityCode(value || '')}
              theme="vs-dark"
            />
            <button onClick={runSolidityCode} style={{ marginTop: '10px', padding: '10px' }}>
              Run Solidity
            </button>
          </div>
        )}
      </>
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* Editors */}
      <div style={{ flex: 1, margin: '10px' }}>{renderEditors()}</div>

      {/* Live Preview */}
      {courseName.includes('Solidity') ? null : (
        <div style={{ flex: 1, margin: '10px' }}>
          <h3>Live Preview</h3>
          <iframe
            srcDoc={output}
            title="Live Preview"
            style={{ width: '100%', height: '100%', border: '1px solid #ccc' }}
            sandbox="allow-scripts allow-same-origin"
          />
        </div>
      )}
    </div>
  );
};

export default CodeEditor;
