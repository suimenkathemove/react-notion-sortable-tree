import {
  arrayMove,
  buildTree,
  findIndex,
  flattenTree,
  invariant,
} from "@suimenkathemove/utils";

import { FlattenedTreeItem, NodeId, Tree } from "@/types/tree";
import { getDescendantIds } from "@/utils/get-descendant-ids";

export const sortTree = (
  tree: Tree,
  fromItem: FlattenedTreeItem,
  newParentIdOfFromItem: NodeId,
  toId: NodeId,
): Tree => {
  const flattenedTree = flattenTree(tree);

  const descendantIds = getDescendantIds(flattenedTree, fromItem.id);
  if (descendantIds.includes(newParentIdOfFromItem))
    return buildTree(flattenedTree);

  const newFromItem: FlattenedTreeItem = {
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
