import { FlattenedTreeItem, Node, Tree } from "@/types/tree";

export const flattenTree = <T extends Record<string, unknown>>(
  tree: Tree<T>,
): FlattenedTreeItem<T>[] => {
  const flattenedTree: FlattenedTreeItem<T>[] = [];

  const flatten = (
    node: Node<T>,
    parentId: FlattenedTreeItem<T>["parentId"],
    depth = 0,
  ): void => {
    flattenedTree.push({
      id: node.id,
      parentId,
      depth,
      collapsed: node.collapsed,
      data: node.data,
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
