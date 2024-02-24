import { findIndex, invariant } from "@suimenkathemove/utils";

import { Node, NodeId, Tree } from "@/types";

type TargetType = "siblingParent" | "siblingChild";
type Target = {
  type: TargetType;
  id: NodeId;
};

const addNodeToAround = <T extends Record<string, unknown>>(
  nodes: Node<T>[],
  newNode: Node<T>,
  targetType: TargetType,
  targetIndex: number,
): Node<T>[] => {
  const splitIndex = ((): number => {
    switch (targetType) {
      case "siblingParent":
        return targetIndex + 1;
      case "siblingChild":
        return targetIndex;
      default:
        return targetType satisfies never;
    }
  })();

  return [...nodes.slice(0, splitIndex), newNode, ...nodes.slice(splitIndex)];
};

export const addNodeToSibling = <T extends Record<string, unknown>>(
  tree: Tree<T>,
  target: Target,
  newNode: Node<T>,
): Tree<T> => {
  let newTree: Tree<T> = tree.map((node) => ({
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

    if (original.id === target.id) {
      const targetIndex = findIndex(
        parent.children,
        (node) => node.id === target.id,
      );
      invariant(targetIndex != null, "targetIndex should exist");
      parent.children = addNodeToAround(
        parent.children,
        newNode,
        target.type,
        targetIndex,
      );
    }
  };

  tree.forEach((original, index) => {
    original.children.forEach((c) => {
      dfs(c, original.id);
    });

    if (original.id === target.id) {
      newTree = addNodeToAround(newTree, newNode, target.type, index);
    }
  });

  return newTree;
};
