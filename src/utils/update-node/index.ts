import { Node, NodeId, Tree } from "@/types";

export const updateNode = <T extends Record<string, unknown>>(
  tree: Tree<T>,
  id: NodeId,
  newNode: (node: Node<T>) => Node<T>,
): Tree<T> => {
  const dfs = (node: Node<T>): Node<T> => {
    if (node.id === id) return newNode(node);

    return {
      ...node,
      children: node.children.map(dfs),
    };
  };

  return tree.map(dfs);
};
