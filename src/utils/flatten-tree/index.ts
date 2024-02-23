import { FlattenedTreeItem, Node, Tree } from "@/types/tree";

export const flattenTree = (tree: Tree): FlattenedTreeItem[] => {
  const flattenedTree: FlattenedTreeItem[] = [];

  const flatten = (
    node: Node,
    parentId: FlattenedTreeItem["parentId"],
    depth = 0,
  ): void => {
    flattenedTree.push({
      id: node.id,
      parentId,
      depth,
      collapsed: node.collapsed,
    });

    node.children.forEach((c) => {
      flatten(c, node.id, depth + 1);
    });
  };
  tree.forEach((c) => {
    flatten(c, null);
  });

  return flattenedTree;
};
