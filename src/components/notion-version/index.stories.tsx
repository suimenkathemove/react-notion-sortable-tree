import { StoryObj } from "@storybook/react";
import { range } from "@suimenkathemove/utils";
import { useCallback, useEffect, useState } from "react";
import * as uuid from "uuid";

import { MoveTarget } from "../react-notion-sortable-tree";

import { NotionVersion, NotionVersionProps } from ".";

import { NodeId, Tree } from "@/types/tree";
import { removeNode } from "@/utils/remove-node";
import { sortTree } from "@/utils/sort-tree";
import { updateNode } from "@/utils/update-node";

export default {};

const backendApi = {
  listNodes: async (): Promise<{ id: NodeId }[]> =>
    range(3).map(() => ({ id: uuid.v4() })),

  addNode: async (_parentId: NodeId | null): Promise<{ id: NodeId }> => ({
    id: uuid.v4(),
  }),

  updateNode: async (input: {
    id: NodeId;
    title: string;
  }): Promise<{ id: NodeId; title: string }> => ({
    id: input.id,
    title: input.title,
  }),

  removeNode: async (id: NodeId): Promise<NodeId> => id,

  moveNode: async (id: NodeId, _target: MoveTarget): Promise<NodeId> => id,
};

type Data = {
  title: string;
};

export const Default: StoryObj = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [tree, setTree] = useState<Tree<Data>>([]);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      void (async () => {
        const roots = await backendApi.listNodes();
        const newTree: Tree<Data> = roots.map((r) => ({
          id: r.id,
          children: [],
          collapsed: true,
          data: {
            title: "",
          },
        }));
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
                data: {
                  title: "",
                },
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
        const newTree: Tree<Data> = tree.concat({
          id: newNode.id,
          children: [],
          collapsed: true,
          data: {
            title: "",
          },
        });
        setTree(newTree);
      }, [tree]);

    const onClickAddChild: NotionVersionProps["onClickAddChild"] =
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useCallback(
        async (id) => {
          const newNode = await backendApi.addNode(id);
          const newTree = updateNode(tree, id, (node) => ({
            ...node,
            children: node.children.concat({
              id: newNode.id,
              children: [],
              collapsed: true,
              data: {
                title: "",
              },
            }),
            collapsed: false,
          }));
          setTree(newTree);
        },
        [tree],
      );

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const onClickRename: NotionVersionProps["onClickRename"] = useCallback(
      async (item) => {
        const value = window.prompt("", item.data.title) ?? "";
        await backendApi.updateNode({ id: item.id, title: value });
        const newTree = updateNode(tree, item.id, (node) => ({
          ...node,
          data: {
            title: value,
          },
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

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const onMove: NotionVersionProps["onMove"] = useCallback(
      async (fromItem, toParentId, toIndex, target) => {
        await backendApi.moveNode(fromItem.id, target);
        const newTree = sortTree(tree, fromItem, toParentId, toIndex);
        setTree(newTree);
      },
      [tree],
    );

    return (
      <NotionVersion
        tree={tree}
        onClickCollapse={onClickCollapse}
        onClickAddRoot={onClickAddRoot}
        onClickAddChild={onClickAddChild}
        onClickRename={onClickRename}
        onClickDelete={onClickDelete}
        onMove={onMove}
      />
    );
  },
};
