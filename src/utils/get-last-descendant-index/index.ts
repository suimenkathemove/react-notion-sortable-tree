import { findIndex, invariant } from "@suimenkathemove/utils";

import { FlattenedTreeItem, NodeId } from "@/types";
import { getDescendantIds } from "@/utils/get-descendant-ids";

export const getLastDescendantIndex = (
  flattenedTree: FlattenedTreeItem[],
  targetId: NodeId,
): number => {
  const descendantIds = getDescendantIds(flattenedTree, targetId);
  const lastDescendantId = descendantIds[descendantIds.length - 1];
  invariant(lastDescendantId != null, "lastDescendantId should exist");
  const lastDescendantIndex = findIndex(
    flattenedTree,
    (item) => item.id === lastDescendantId,
  );
  invariant(lastDescendantIndex != null, "lastDescendantIndex should exist");

  return lastDescendantIndex;
};
