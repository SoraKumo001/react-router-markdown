import { Editor as MonacoEditor, type OnMount } from "@monaco-editor/react";
import styled from "./MarkdownEditor.module.css";
import type { FC } from "react";
import { classNames } from "~/libs/classNames";

export const MarkdownEditor: FC<{
  onCurrentLine: (
    line: number,
    top: number,
    linePos: number,
    source: string
  ) => void;
  onUpdate: (value: string) => void;
  value: string;
  refEditor: React.RefObject<Parameters<OnMount>[0] | null>;
  className?: string;
}> = ({ onCurrentLine, onUpdate, value, refEditor, className }) => {
  const handleEditorDidMount: OnMount = (editor) => {
    refEditor.current = editor;
    editor.onDidChangeCursorPosition((event) => {
      const currentLine = event.position.lineNumber;
      const top = editor.getScrollTop();
      const linePos = editor.getTopForLineNumber(currentLine);
      onCurrentLine(currentLine, top, linePos, event.source);
    });
  };
  return (
    <MonacoEditor
      className={classNames(styled["markdown-editor"], className)}
      onMount={handleEditorDidMount}
      language="markdown"
      defaultValue={value}
      onChange={(e) => onUpdate(e ?? "")}
      options={{
        renderControlCharacters: true,
        renderWhitespace: "boundary",
        automaticLayout: true,
        scrollBeyondLastLine: false,
        wordWrap: "on",
        wrappingStrategy: "advanced",
        minimap: { enabled: false },
        dragAndDrop: true,
        dropIntoEditor: { enabled: true },
        contextmenu: false,
        occurrencesHighlight: "off",
        renderLineHighlight: "none",
        quickSuggestions: false,
        wordBasedSuggestions: "off",
        language: "markdown",
        selectOnLineNumbers: true,
      }}
    />
  );
};
