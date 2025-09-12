import styled from "./MarkdownContent.module.css";
import type { FC } from "react";
import { classNames } from "~/libs/classNames";
import { useMarkdown } from "~/libs/MarkdownConverter";

export const Markdown: FC<{
  className?: string;
  markdown?: string;
  line?: number;
  onClick?: (line: number, offset: number) => void;
}> = ({ className, markdown, line, onClick }) => {
  const node = useMarkdown({ markdown });

  return (
    <div
      className={classNames(className, styled["markdown"])}
      onClick={(e) => {
        const framePos = e.currentTarget.getBoundingClientRect();
        let node = e.target as HTMLElement | null;
        while (node && !node.dataset.line) {
          node = node.parentElement;
        }
        if (node) {
          const p = node.getBoundingClientRect();
          onClick?.(Number(node.dataset.line), p.top - framePos.top);
        }
      }}
    >
      <style>{`[data-line="${line}"]:not(:has([data-line]))::after {
      position: absolute;
      top: -0.125rem;
      right: -0.125rem;
      bottom: -0.125rem;
      left: -0.125rem;
      border-radius: 0.25rem;
      pointer-events: none;
      z-index: 10;
      background-color: rgba(147, 197, 253, 0.1); 
      content: "";
    }`}</style>
      {node}
    </div>
  );
};
