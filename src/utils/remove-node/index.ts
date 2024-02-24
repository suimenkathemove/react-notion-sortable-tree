import { Node, NodeId, Tree } from "@/types";

export const removeNode = <T extends Record<string, unknown>>(
  tree: Tree<T>,
  id: NodeId,
): [removedTree: Tree<T>, removedNode: Node<T> | null] => {
  let removedNode: Node<T> | null = null;

  const dfs = (nodes: Node<T>[]): Node<T>[] =>
    nodes
      .filter((node) => {
        if (node.id === id) {
          removedNode = node;

          return false;
        }

        return true;
      })
      .map((node) => ({
        ...node,
        children: dfs(node.children),
      }));

  return [dfs(tree), removedNode];
};
