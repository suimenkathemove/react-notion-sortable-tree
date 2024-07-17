import { Node, NodeId, Tree } from "@/types";

export const addNodeToParent = <T extends Record<string, unknown>>(
  tree: Tree<T>,
  targetId: NodeId,
  newNode: Node<T>,
): Tree<T> => {
  const dfs = (nodes: Tree<T>): Tree<T> =>
    nodes.reduce((acc, node) => {
      const n: Node<T> = {
        ...node,
        children:
          node.id === targetId
            ? [...dfs(node.children), newNode]
            : dfs(node.children),
      };

      return [...acc, n];
    }, [] as Tree<T>);

  return dfs(tree);
};
