import { StoryObj } from "@storybook/react";
import { forwardRef, useState } from "react";

import { tree as mockTree } from "../__mocks__/tree";
import {
  ContainerProps,
  ItemProps,
  ReactNotionSortableTree,
} from "../react-notion-sortable-tree";

import { NotionVersion } from "@/react-notion-sortable-tree/notion-version";

export default {};

const Wrapper: React.FC<{ children: React.ReactNode }> = (props) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      }}
    >
      {props.children}
    </div>
  );
};

export const Default: StoryObj = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [tree, setTree] = useState(mockTree);

    return (
      <Wrapper>
        <ReactNotionSortableTree
          tree={tree}
          setTree={setTree}
          Container={forwardRef<
            HTMLUListElement,
            ContainerProps<HTMLUListElement>
          >((props, ref) => (
            <ul
              style={{
                ...props.style,
                width: 240,
              }}
              ref={ref}
            >
              {props.children}
            </ul>
          ))}
          Item={forwardRef<HTMLLIElement, ItemProps<HTMLLIElement>>(
            (props, ref) => (
              <li
                onPointerDown={props.onPointerDown}
                style={props.style}
                ref={ref}
              >
                <button
                  onClick={() => {
                    props.onCollapse();
                  }}
                  onPointerDown={(event) => {
                    event.stopPropagation();
                  }}
                >
                  {props.item.collapsed ? ">" : "v"}
                </button>
                {props.item.id}
              </li>
            ),
          )}
        />
      </Wrapper>
    );
  },
};

export const Notion: StoryObj = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [tree, setTree] = useState(mockTree);

    return (
      <Wrapper>
        <NotionVersion tree={tree} setTree={setTree} />
      </Wrapper>
    );
  },
};
