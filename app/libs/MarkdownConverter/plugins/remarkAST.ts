import type { Node, Root } from "mdast";
import type { Plugin } from "unified";
import type { VFile } from "vfile";

/**
 *  AST情報を取得
 */
export const remarkAST: Plugin = () => {
  return (tree: Root, file: VFile) => {
    const data = file.data as { onTree?: (tree: Root) => void };
    data.onTree?.(tree);
  };
};
