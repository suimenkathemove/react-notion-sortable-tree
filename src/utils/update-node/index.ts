import { Node, NodeId, Tree } from "@/types/tree";

export const updateNode = (
  tree: Tree,
  id: NodeId,
  newNode: (node: Node) => Node,
): Tree => {
  const dfs = (node: Node): Node => {
    if (node.id === id) return newNode(node);

    return {
      ...node,
      children: node.children.map(dfs),
    };
  };

  return {
    id: "root",
    children: tree.children.map(dfs),
  };
};
