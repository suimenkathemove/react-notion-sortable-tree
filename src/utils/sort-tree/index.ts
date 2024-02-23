import { arrayMove, findIndex, invariant } from "@suimenkathemove/utils";

import { FlattenedTreeItem, NodeId, Tree } from "@/types/tree";
import { buildTree } from "@/utils/build-tree";
import { flattenTree } from "@/utils/flatten-tree";
import { getDescendantIds } from "@/utils/get-descendant-ids";

export const sortTree = <T extends Record<string, unknown>>(
  tree: Tree<T>,
  fromItem: FlattenedTreeItem<T>,
  newParentIdOfFromItem: FlattenedTreeItem<T>["parentId"],
  toId: NodeId,
): Tree<T> => {
  const flattenedTree = flattenTree(tree);

  const descendantIds = getDescendantIds(flattenedTree, fromItem.id);
  if (descendantIds.some((id) => id === newParentIdOfFromItem))
    return buildTree(flattenedTree);

  const newFromItem: FlattenedTreeItem<T> = {
    ...fromItem,
    parentId: newParentIdOfFromItem,
  };
  const newFlattenedTree = flattenedTree.map((item) =>
    item.id === newFromItem.id ? newFromItem : item,
  );
  const fromIndex = findIndex(flattenedTree, (item) => item.id === fromItem.id);
  invariant(fromIndex != null, "fromIndex should exist");
  const toIndex = findIndex(flattenedTree, (item) => item.id === toId);
  invariant(toIndex != null, "toIndex should exist");
  const sortedFlattenedTree = arrayMove(newFlattenedTree, fromIndex, toIndex);

  return buildTree(sortedFlattenedTree);
};
