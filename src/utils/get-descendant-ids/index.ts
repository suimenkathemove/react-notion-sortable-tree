import { findIndex, invariant } from "@suimenkathemove/utils";

import { FlattenedTreeItem, NodeId } from "@/types";

export const getDescendantIds = (
  flattenedTree: FlattenedTreeItem[],
  targetId: NodeId,
): NodeId[] => {
  const targetIndex = findIndex(flattenedTree, (item) => item.id === targetId);
  invariant(targetIndex != null, "targetIndex should exist");
  const targetItem = flattenedTree[targetIndex];
  invariant(targetItem != null, "targetItem should exist");

  const descendantIds: NodeId[] = [targetId];

  for (let i = targetIndex + 1; i < flattenedTree.length; i++) {
    const item = flattenedTree[i];
    invariant(item != null, "item should exist");
    if (item.depth <= targetItem.depth) break;
    descendantIds.push(item.id);
  }

  return descendantIds;
};
