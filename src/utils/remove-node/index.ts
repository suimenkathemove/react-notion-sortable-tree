import { Node, NodeId, Tree } from "@/types/tree";

export const removeNode = (tree: Tree, id: NodeId): Tree => {
  const dfs = (node: Node): Node => ({
    ...node,
    children: node.children.filter((c) => c.id !== id).map(dfs),
  });

  return tree.filter((c) => c.id !== id).map(dfs);
};
