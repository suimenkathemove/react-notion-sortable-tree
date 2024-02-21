import { forwardRef } from "react";
import { ChevronDown, ChevronRight, Plus } from "react-feather";

import {
  ContainerProps,
  ItemProps,
  ReactNotionSortableTree,
} from "../react-notion-sortable-tree";

import { FlattenedTreeItem, Tree } from "@/types/tree";

const characterStyle: React.CSSProperties = {
  fontFamily: "BlinkMacSystemFont, sans-serif",
  fontSize: 14,
  fontWeight: 500,
  color: "rgba(25, 23, 17, 0.6)",
};

const ICON_SIZE = 16;

export interface NotionVersionProps {
  tree: Tree;
  setTree: (tree: Tree) => void;
  onClickCollapseButton: (item: FlattenedTreeItem) => void;
  onClickAddRootButton: () => void;
  onClickAddChildButton: (item: FlattenedTreeItem) => void;
}

export const NotionVersion: React.FC<NotionVersionProps> = (props) => {
  return (
    <div
      style={{
        width: 240,
        backgroundColor: "rgb(251 251 250)",
      }}
    >
      <ReactNotionSortableTree
        tree={props.tree}
        setTree={props.setTree}
        Container={forwardRef<
          HTMLUListElement,
          ContainerProps<HTMLUListElement>
        >((containerProps, ref) => (
          <ul style={containerProps.style} ref={ref}>
            {containerProps.children}
          </ul>
        ))}
        Item={forwardRef<HTMLLIElement, ItemProps<HTMLLIElement>>(
          (itemProps, ref) => (
            <li
              onPointerDown={itemProps.onPointerDown}
              style={{
                ...itemProps.style,
                display: "flex",
                alignItems: "center",
                gap: 4,
                paddingTop: 2,
                paddingBottom: 2,
                paddingLeft: 8 + itemProps.paddingLeft,
                paddingRight: 8,
                ...characterStyle,
              }}
              ref={ref}
            >
              <button
                onClick={() => {
                  props.onClickCollapseButton(itemProps.item);
                }}
                onPointerDown={(event) => {
                  event.stopPropagation();
                }}
                style={{
                  flexGrow: 0,
                  flexShrink: 0,
                }}
              >
                {itemProps.item.collapsed ? (
                  <ChevronRight size={ICON_SIZE} />
                ) : (
                  <ChevronDown size={ICON_SIZE} />
                )}
              </button>
              <div
                style={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {itemProps.item.id}
              </div>
              <button
                onClick={() => {
                  props.onClickAddChildButton(itemProps.item);
                }}
                onPointerDown={(event) => {
                  event.stopPropagation();
                }}
                style={{
                  flexGrow: 0,
                  flexShrink: 0,
                }}
              >
                <Plus size={ICON_SIZE} />
              </button>
            </li>
          ),
        )}
        itemHeight={28}
        paddingPerDepth={24}
        backgroundColor="rgba(35, 131, 226, 0.14)"
        borderHeight={4}
        borderColor="rgba(35, 131, 226, 0.43)"
      />
      <button
        onClick={props.onClickAddRootButton}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 4,
          width: "100%",
          padding: "2px 8px",
          ...characterStyle,
        }}
      >
        <Plus size={ICON_SIZE} />
        Add a page
      </button>
    </div>
  );
};
