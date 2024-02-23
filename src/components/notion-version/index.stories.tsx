import { StoryObj } from "@storybook/react";
import { range } from "@suimenkathemove/utils";
import { useCallback, useEffect, useState } from "react";
import * as uuid from "uuid";

import { NotionVersion, NotionVersionProps } from ".";

import { tree as mockTree } from "@/__mocks__/tree";
import { NodeId, Tree } from "@/types/tree";
import { removeNode } from "@/utils/remove-node";
import { updateNode } from "@/utils/update-node";

export default {};

const backendApi = {
  listNodes: async (): Promise<{ id: NodeId }[]> =>
    range(3).map(() => ({ id: uuid.v4() })),

  addNode: async (_parentId: NodeId | null): Promise<{ id: NodeId }> => ({
    id: uuid.v4(),
  }),

  removeNode: async (id: NodeId): Promise<NodeId> => id,
};

export const Default: StoryObj = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [tree, setTree] = useState(mockTree);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      void (async () => {
        const roots = await backendApi.listNodes();
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

    const onClickCollapse: NotionVersionProps["onClickCollapse"] =
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useCallback(
        async (item) => {
          if (item.collapsed) {
            const children = await backendApi.listNodes();
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

    const onClickAddRoot: NotionVersionProps["onClickAddRoot"] =
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useCallback(async () => {
        const newNode = await backendApi.addNode(null);
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

    const onClickAddChild: NotionVersionProps["onClickAddChild"] =
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useCallback(
        async (item) => {
          const newNode = await backendApi.addNode(item.id);
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

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const onClickDelete: NotionVersionProps["onClickDelete"] = useCallback(
      async (id) => {
        await backendApi.removeNode(id);
        const newTree = removeNode(tree, id);
        setTree(newTree);
      },
      [tree],
    );

    return (
      <NotionVersion
        tree={tree}
        setTree={setTree}
        onClickCollapse={onClickCollapse}
        onClickAddRoot={onClickAddRoot}
        onClickAddChild={onClickAddChild}
        onClickDelete={onClickDelete}
      />
    );
  },
};
