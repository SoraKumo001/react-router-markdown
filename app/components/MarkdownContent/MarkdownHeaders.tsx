import { useMemo, type FC } from "react";
import { visit } from "unist-util-visit";
import type { Root } from "mdast";

export const MarkdownHeaders: FC<{ tree: Root }> = ({ tree }) => {
  const headers = useMemo(() => {
    const titles: { id: number; text?: string; depth: number }[] = [];
    const property = { count: 0 };
    visit(tree, "heading", (node) => {
      titles.push({
        id: property.count,
        text: node.data?.hProperties?.id as string | undefined,
        depth: node.depth,
      });
    });
    return titles;
  }, [tree]);
  return (
    <ul className="sticky bottom-0 left-full z-10 h-60 w-80 overflow-y-scroll rounded bg-white/80 p-2 text-sm">
      {headers.map(({ id, text, depth }) => (
        <li key={id} style={{ left: `${depth * 16}px` }}>
          <a href={`#${text}`}>{text}</a>
        </li>
      ))}
    </ul>
  );
};
