import { FlattenedTreeItem, Node, NodeId, Tree } from "@/types/tree";

export const buildTree = <T extends Record<string, unknown>>(
  flattenedTree: FlattenedTreeItem<T>[],
): Tree<T> => {
  const tree: Tree<T> = flattenedTree
    .filter((item) => item.parentId == null)
    .map((item) => ({
      id: item.id,
      children: [],
      collapsed: item.collapsed,
      data: item.data,
    }));
  const map: Record<NodeId, Node<T>> = tree.reduce(
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
        data: {} as T,
      };
    }
    const parent = map[parentId]!;

    if (!map[item.id]) {
      map[item.id] = {
        id: item.id,
        children: [],
        collapsed: item.collapsed,
        data: item.data,
      };
    }
    const node = map[item.id]!;

    parent.children.push(node);
  });

  return tree;
};
