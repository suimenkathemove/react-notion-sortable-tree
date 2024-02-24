import { invariant } from "@suimenkathemove/utils";

import { FlattenedTreeItem, Node, NodeId, Tree } from "@/types/tree";

export const buildTree = <T extends Record<string, unknown>>(
  flattenedTree: FlattenedTreeItem<T>[],
): Tree<T> => {
  const tree: Tree<T> = flattenedTree
    .filter((item) => item.parentId == null)
    .map((item) => ({
      id: item.id,
      children: [],
      collapsed: item.collapsed,
      data: item.data,
    }));
  const nodeMap: Record<NodeId, Node<T>> = tree.reduce(
    (acc, item) => ({ ...acc, [item.id]: item }),
    {},
  );

  flattenedTree.forEach((item) => {
    const { parentId } = item;
    if (parentId == null) return;
    const parent = nodeMap[parentId];
    invariant(parent != null, "parent should exist");

    const node: Node<T> = {
      id: item.id,
      children: [],
      collapsed: item.collapsed,
      data: item.data,
    };
    nodeMap[node.id] = node;

    parent.children.push(node);
  });

  return tree;
};
