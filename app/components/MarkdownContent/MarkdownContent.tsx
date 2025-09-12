import styled from "./MarkdownContent.module.css";
import { MarkdownHeaders } from "./MarkdownHeaders";
import type { FC } from "react";
import { classNames } from "~/libs/classNames";
import { useMarkdown } from "~/libs/MarkdownConverter";

export const MarkdownContext: FC<{
  className?: string;
  markdown?: string;
  line?: number;
  onClick?: (line: number, offset: number) => void;
}> = ({ className, markdown, line, onClick }) => {
  const [node, tree] = useMarkdown({ markdown });

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
      <style>{`[data-line="${line}"]:not(:has([data-line="${line}"]))::after {
          visibility: visible;
    }`}</style>
      {node}
      <MarkdownHeaders tree={tree} />
    </div>
  );
};
