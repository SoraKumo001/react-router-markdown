import { useRef, useState, useTransition } from "react";
import type { OnMount } from "@monaco-editor/react";
import { MarkdownContext } from "~/components/MarkdownContent";
import { MarkdownEditor } from "~/components/MarkdownEditor";

const initText = "";

const Page = () => {
  const [content, setContent] = useState(initText);
  const refEditor = useRef<Parameters<OnMount>[0]>(null);
  const [currentLine, setCurrentLine] = useState(1);
  const refMarkdown = useRef<HTMLDivElement>(null);
  const [, startTransition] = useTransition();
  return (
    <div className="flex h-screen gap-2 divide-x divide-blue-100 overflow-hidden p-2">
      <div className="flex-1 rounded border border-gray-200">
        <MarkdownEditor
          refEditor={refEditor}
          value={content}
          onUpdate={(value) => startTransition(() => setContent(value))}
          onCurrentLine={(line, top, linePos, source) => {
            startTransition(() => {
              setCurrentLine(line);
              const node = refMarkdown.current;
              if (node && source !== "api") {
                const nodes = node.querySelectorAll<HTMLElement>("[data-line]");
                const target = Array.from(nodes).find((node) => {
                  const nodeLine = node.dataset.line?.match(/(\d+)/)?.[1];
                  if (!line) return false;
                  return line === Number(nodeLine);
                });
                if (target) {
                  const { top: targetTop } = target.getBoundingClientRect();
                  const { top: nodeTop } = node.getBoundingClientRect();
                  node.scrollTop =
                    targetTop - nodeTop + node.scrollTop - (linePos - top);
                }
              }
            });
          }}
        />
      </div>
      <div
        ref={refMarkdown}
        className="flex-1 overflow-auto rounded border-2 border-gray-200"
      >
        <MarkdownContext
          markdown={content}
          line={currentLine}
          onClick={(line, offset) => {
            const editor = refEditor.current;
            const node = refMarkdown.current;
            if (editor && node) {
              const linePos = editor.getTopForLineNumber(line);
              editor.setScrollTop(linePos - offset + node.scrollTop);
              editor.setPosition({ lineNumber: line, column: 1 });
            }
          }}
        />
      </div>
    </div>
  );
};

export default Page;
