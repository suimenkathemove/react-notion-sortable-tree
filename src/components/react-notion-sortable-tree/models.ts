import { findIndex, invariant } from "@suimenkathemove/utils";

import { FlattenedTreeItem, Node, NodeId, Tree } from "@/types";
import { getDescendantIds } from "@/utils/get-descendant-ids";

export type BorderOrBackground =
  | {
      type: "border";
      index: number;
    }
  | {
      type: "lastBorder";
    }
  | {
      type: "background";
      index: number;
    };

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

export const collapseFlattenTree = (tree: Tree): FlattenedTreeItem[] => {
  const flattenedTree: FlattenedTreeItem[] = [];

  const flatten = (
    node: Node,
    parentId: FlattenedTreeItem["parentId"],
    depth = 0,
  ): void => {
    flattenedTree.push({
      id: node.id,
      parentId,
      depth,
      collapsed: node.collapsed,
    });

    if (node.collapsed) return;

    node.children.forEach((c) => {
      flatten(c, node.id, depth + 1);
    });
  };
  tree.children.forEach((c) => {
    flatten(c, tree.id);
  });

  return flattenedTree;
};
