import Editor from "@monaco-editor/react";

const MonacoEditor = ({ value, onChange }) => {
  return (
    <Editor
      height="100%"
      width="100%"
      theme="vs-dark"
      defaultLanguage="c"
      value={value}
      onChange={onChange}
      options={{
        fontSize: 18,
        minimap: { enabled: false },
        automaticLayout: true,
      }}
    />
  );
};

export default MonacoEditor;

