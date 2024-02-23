import { FlattenedTreeItem, Node, NodeId, Tree } from "@/types/tree";

export const buildTree = (flattenedTree: FlattenedTreeItem[]): Tree => {
  const tree: Tree = flattenedTree
    .filter((item) => item.parentId == null)
    .map((item) => ({
      id: item.id,
      children: [],
      collapsed: item.collapsed,
    }));
  const map: Record<NodeId, Node> = tree.reduce(
    (acc, item) => ({ ...acc, [item.id]: item }),
    {},
  );

  flattenedTree.forEach((item) => {
    const { parentId } = item;
    if (parentId == null) return;
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
