import { Node, NodeId, Tree } from "@/types/tree";

export const removeNode = <T extends Record<string, unknown>>(
  tree: Tree<T>,
  id: NodeId,
): Tree<T> => {
  const dfs = (node: Node<T>): Node<T> => ({
    ...node,
    children: node.children.filter((c) => c.id !== id).map(dfs),
  });

  return tree.filter((c) => c.id !== id).map(dfs);
};
