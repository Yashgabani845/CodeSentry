import { Editor } from "@monaco-editor/react";
import { useRef, useEffect, forwardRef, useImperativeHandle } from "react";

const MonacoEditorWrapper = forwardRef(({ language, code, theme, onChange }, ref) => {
  const containerRef = useRef(null);
  const editorRef = useRef(null);

  useImperativeHandle(ref, () => ({
    layout: () => {
      editorRef.current?.layout();
    },
  }));

  const handleEditorMount = (editor) => {
    editorRef.current = editor;
    editor.layout();
  };

  return (
    <div ref={containerRef} className="flex-1 overflow-hidden">
      <Editor
        height="100%"
        width="100%"
        language={language}
        value={code}
        onChange={onChange}
        onMount={handleEditorMount}
        theme={theme}
        options={{
          automaticLayout: false,
          minimap: { enabled: false },
          fontSize: 14,
          scrollBeyondLastLine: false,
          lineNumbers: "on",
          wordWrap: "on",
        }}
      />
    </div>
  );
});

export default MonacoEditorWrapper;
