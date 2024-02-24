import { invariant } from "@suimenkathemove/utils";

import { addNodeToParent } from "../add-node-to-parent";
import { addNodeToSibling } from "../add-node-to-sibling";
import { removeNode } from "../remove-node";

import { MoveTarget, NodeId, Tree } from "@/types";

export const moveNode = <T extends Record<string, unknown>>(
  tree: Tree<T>,
  id: NodeId,
  target: MoveTarget,
): Tree<T> => {
  const [removedTree, removedNode] = removeNode(tree, id);
  invariant(removedNode != null, "removedNode should exist");
  const newTree =
    target.type === "parent"
      ? addNodeToParent(removedTree, target.id, removedNode)
      : addNodeToSibling(
          removedTree,
          { type: target.type, id: target.id },
          removedNode,
        );

  return newTree;
};
