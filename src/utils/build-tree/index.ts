import { FlattenedTreeItem, Node, NodeId, Tree } from "@/types/tree";

export const buildTree = (flattenedTree: FlattenedTreeItem[]): Tree => {
  const tree: Tree = { id: "root", children: [] };
  const map: Record<NodeId, Node> = {
    [tree.id]: tree as Node,
  };

  flattenedTree.forEach((item) => {
    const { parentId } = item;
    if (!map[parentId]) {
      map[parentId] = {
        id: parentId,
        children: [],
        collapsed: true,
      };
    }
    const parent = map[parentId]!;

    if (!map[item.id]) {
      map[item.id] = {
        id: item.id,
        children: [],
        collapsed: item.collapsed,
      };
    }
    const node = map[item.id]!;

    parent.children.push(node);
  });

  return tree;
};
