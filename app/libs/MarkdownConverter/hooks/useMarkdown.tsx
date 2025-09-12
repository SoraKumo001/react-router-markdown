import { useMemo, useRef } from "react";
import { markdownCompiler } from "../markdownCompiler";
import type { Root } from "mdast";

export const useMarkdown = ({
  markdown,
  line,
}: {
  markdown?: string;
  line?: number;
}) => {
  const node = useMemo(
    () =>
      markdownCompiler.processSync({
        value: markdown,
        data: {
          line,
          onTree: (tree: Root) => {
            console.log(tree);
          },
        },
      }).result,
    [markdown, line]
  );
  return node;
};
