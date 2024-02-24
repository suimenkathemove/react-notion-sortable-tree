import { invariant } from "@suimenkathemove/utils";

import { Node, NodeId, Tree } from "@/types";

export const addNodeToParent = <T extends Record<string, unknown>>(
  tree: Tree<T>,
  targetId: NodeId,
  newNode: Node<T>,
): Tree<T> => {
  const newTree: Tree<T> = tree.map((node) => ({
    id: node.id,
    children: [],
    collapsed: node.collapsed,
    data: node.data,
  }));
  const nodeMap: Record<NodeId, Node<T>> = newTree.reduce(
    (acc, node) => ({ ...acc, [node.id]: node }),
    {},
  );

  const dfs = (original: Node<T>, parentId: NodeId): void => {
    const node: Node<T> = {
      id: original.id,
      children: [],
      collapsed: original.collapsed,
      data: original.data,
    };
    nodeMap[node.id] = node;

    const parent = nodeMap[parentId];
    invariant(parent != null, "parent should exist");
    parent.children.push(node);

    original.children.forEach((c) => {
      dfs(c, original.id);
    });

    if (original.id === targetId) {
      node.children.push(newNode);
    }
  };

  tree.forEach((original) => {
    original.children.forEach((c) => {
      dfs(c, original.id);
    });

    if (original.id === targetId) {
      const targetNode = nodeMap[targetId];
      invariant(targetNode != null, "targetNode should exist");
      targetNode.children.push(newNode);
    }
  });

  return newTree;
};
