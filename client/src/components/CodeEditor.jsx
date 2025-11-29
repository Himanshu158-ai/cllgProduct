import React, { useState } from "react";
import Editor from "@monaco-editor/react";

const MonacoEditor = () => {
  const [code, setCode] = useState("// Type here...");

  return (
    // <div className="p-5 bg-gray-900 min-h-screen">
      <Editor
        height="500px"
        width="500px"
        theme="vs-dark"
        defaultLanguage="javascript"
        value={code}
        onChange={(value) => setCode(value)}
        options={{
          fontSize: 16,
          minimap: { enabled: false },
          automaticLayout: true,
        }}
      />
    // </div>
  );
};

export default MonacoEditor;
