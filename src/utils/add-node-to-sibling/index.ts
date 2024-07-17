import { Node, NodeId, Tree } from "@/types";

type TargetType = "siblingParent" | "siblingChild";
type Target = {
  type: TargetType;
  id: NodeId;
};

export const addNodeToSibling = <T extends Record<string, unknown>>(
  tree: Tree<T>,
  target: Target,
  newNode: Node<T>,
): Tree<T> => {
  const dfs = (nodes: Tree<T>): Tree<T> =>
    nodes.reduce((acc, node) => {
      const n: Node<T> = { ...node, children: dfs(node.children) };

      if (node.id === target.id) {
        switch (target.type) {
          case "siblingParent":
            return [...acc, n, newNode];
          case "siblingChild":
            return [...acc, newNode, n];
          default:
            return target.type satisfies never;
        }
      }

      return [...acc, n];
    }, [] as Tree<T>);

  return dfs(tree);
};
