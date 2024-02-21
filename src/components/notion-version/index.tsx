import { forwardRef } from "react";
import { ChevronDown, ChevronRight } from "react-feather";

import {
  ContainerProps,
  ItemProps,
  ReactNotionSortableTree,
} from "../react-notion-sortable-tree";

import { FlattenedTreeItem, Tree } from "@/types/tree";

export interface NotionVersionProps {
  tree: Tree;
  setTree: (tree: Tree) => void;
  onClickCollapseButton: (item: FlattenedTreeItem) => void;
}

export const NotionVersion: React.FC<NotionVersionProps> = (props) => {
  return (
    <ReactNotionSortableTree
      tree={props.tree}
      setTree={props.setTree}
      Container={forwardRef<HTMLUListElement, ContainerProps<HTMLUListElement>>(
        (containerProps, ref) => (
          <ul
            style={{
              ...containerProps.style,
              width: 240,
              backgroundColor: "rgb(251 251 250)",
            }}
            ref={ref}
          >
            {containerProps.children}
          </ul>
        ),
      )}
      Item={forwardRef<HTMLLIElement, ItemProps<HTMLLIElement>>(
        (itemProps, ref) => (
          <li
            onPointerDown={itemProps.onPointerDown}
            style={{
              ...itemProps.style,
              display: "flex",
              alignItems: "center",
              paddingTop: 2,
              paddingBottom: 2,
              paddingLeft: 8 + itemProps.paddingLeft,
              paddingRight: 8,
              fontFamily: "BlinkMacSystemFont, sans-serif",
              fontSize: 14,
              fontWeight: 500,
              color: "rgba(25, 23, 17, 0.6)",
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
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexGrow: 0,
                flexShrink: 0,
                width: 22,
                height: 22,
                marginRight: 4,
              }}
            >
              {itemProps.item.collapsed ? (
                <ChevronRight size={20} />
              ) : (
                <ChevronDown size={20} />
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
          </li>
        ),
      )}
      itemHeight={28}
      paddingPerDepth={24}
      backgroundColor="rgba(35, 131, 226, 0.14)"
      borderHeight={4}
      borderColor="rgba(35, 131, 226, 0.43)"
    />
  );
};
