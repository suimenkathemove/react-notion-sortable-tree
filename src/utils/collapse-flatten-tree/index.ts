import { FlattenedTreeItem, Node, Tree } from "@/types/tree";

export const collapseFlattenTree = (tree: Tree): FlattenedTreeItem[] => {
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

    if (node.collapsed) return;

    node.children.forEach((c) => {
      flatten(c, node.id, depth + 1);
    });
  };
  tree.children.forEach((c) => {
    flatten(c, tree.id);
  });

  return flattenedTree;
};
