import { StoryObj } from "@storybook/react";
import { range } from "@suimenkathemove/utils";
import { useCallback, useEffect, useState } from "react";
import * as uuid from "uuid";

import { NotionVersion, NotionVersionProps } from ".";

import { tree as mockTree } from "@/__mocks__/tree";
import { NodeId, Tree } from "@/types/tree";
import { updateNode } from "@/utils/update-node";

export default {};

const listNodes = async (): Promise<{ id: NodeId }[]> =>
  range(3).map(() => ({ id: uuid.v4() }));

const addNode = async (_parentId: NodeId | null): Promise<{ id: NodeId }> => ({
  id: uuid.v4(),
});

export const Default: StoryObj = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [tree, setTree] = useState(mockTree);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      void (async () => {
        const roots = await listNodes();
        const newTree: Tree = {
          id: "root",
          children: roots.map((r) => ({
            id: r.id,
            children: [],
            collapsed: true,
          })),
        };
        setTree(newTree);
      })();
    }, []);

    const onClickCollapseButton: NotionVersionProps["onClickCollapseButton"] =
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useCallback(
        async (item) => {
          if (item.collapsed) {
            const children = await listNodes();
            const newTree = updateNode(tree, item.id, (node) => ({
              ...node,
              children: children.map((c) => ({
                id: c.id,
                children: [],
                collapsed: true,
              })),
              collapsed: false,
            }));
            setTree(newTree);
          } else {
            const newTree = updateNode(tree, item.id, (node) => ({
              ...node,
              collapsed: true,
            }));
            setTree(newTree);
          }
        },
        [tree],
      );

    const onClickAddRootButton: NotionVersionProps["onClickAddRootButton"] =
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useCallback(async () => {
        const newNode = await addNode(null);
        const newTree: Tree = {
          id: "root",
          children: tree.children.concat({
            id: newNode.id,
            children: [],
            collapsed: true,
          }),
        };
        setTree(newTree);
      }, [tree.children]);

    const onClickAddChildButton: NotionVersionProps["onClickAddChildButton"] =
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useCallback(
        async (item) => {
          const newNode = await addNode(item.id);
          const newTree = updateNode(tree, item.id, (node) => ({
            id: node.id,
            children: node.children.concat({
              id: newNode.id,
              children: [],
              collapsed: true,
            }),
            collapsed: false,
          }));
          setTree(newTree);
        },
        [tree],
      );

    return (
      <NotionVersion
        tree={tree}
        setTree={setTree}
        onClickCollapseButton={onClickCollapseButton}
        onClickAddRootButton={onClickAddRootButton}
        onClickAddChildButton={onClickAddChildButton}
      />
    );
  },
};
