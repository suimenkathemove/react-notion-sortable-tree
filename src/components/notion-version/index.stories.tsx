import { StoryObj } from "@storybook/react";
import { range } from "@suimenkathemove/utils";
import { useCallback, useEffect, useState } from "react";
import * as uuid from "uuid";

import { NotionVersion, NotionVersionProps } from ".";

import { tree as mockTree } from "@/__mocks__/tree";
import { NodeId, Tree } from "@/types/tree";
import { updateNode } from "@/utils/update-node";

export default {};

const fetchNodes = async (): Promise<{ id: NodeId }[]> =>
  range(3).map(() => ({ id: uuid.v4() }));

export const Default: StoryObj = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [tree, setTree] = useState(mockTree);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      void (async () => {
        const roots = await fetchNodes();
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
            const children = await fetchNodes();
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

    return (
      <NotionVersion
        tree={tree}
        setTree={setTree}
        onClickCollapseButton={onClickCollapseButton}
      />
    );
  },
};
