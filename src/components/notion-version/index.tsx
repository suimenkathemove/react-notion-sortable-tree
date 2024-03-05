import {
  ContentProps,
  Popover,
  TriggerProps,
} from "@suimenkathemove/react-library";
import { forwardRef, memo, useEffect } from "react";
import {
  ChevronDown,
  ChevronRight,
  Edit,
  Menu,
  Plus,
  Trash2,
} from "react-feather";

import {
  ContainerProps,
  ItemProps,
  ReactNotionSortableTree,
} from "../react-notion-sortable-tree";

import { FlattenedTreeItem, MoveTarget, NodeId, Tree } from "@/types";

const characterStyle: React.CSSProperties = {
  fontFamily: "BlinkMacSystemFont, sans-serif",
  fontSize: 14,
  fontWeight: 500,
  color: "rgba(25, 23, 17, 0.6)",
};

const ICON_SIZE = 16;

type Data = {
  title: string;
};

const useFromItem = (fromItem: FlattenedTreeItem<Data> | null) => {
  useEffect(() => {
    const resetCursor = () => {
      document.body.style.setProperty("cursor", "");
    };

    if (fromItem != null) {
      document.body.style.setProperty("cursor", "grabbing", "important");
    } else {
      resetCursor();
    }

    return () => {
      resetCursor();
    };
  }, [fromItem]);
};

export interface NotionVersionProps {
  tree: Tree<Data>;
  onClickCollapse: (item: FlattenedTreeItem<Data>) => void;
  onClickAddRoot: () => void;
  onClickAddChild: (id: NodeId) => void;
  onClickRename: (item: FlattenedTreeItem<Data>) => void;
  onClickDelete: (id: NodeId) => void;
  onMove: (fromItem: FlattenedTreeItem<Data>, target: MoveTarget) => void;
}

export const NotionVersion = memo((props: NotionVersionProps) => {
  return (
    <div
      style={{
        width: 240,
        backgroundColor: "rgb(251 251 250)",
      }}
    >
      <ReactNotionSortableTree
        tree={props.tree}
        Container={forwardRef<HTMLUListElement, ContainerProps>(
          (containerProps, ref) => (
            <ul style={containerProps.style} ref={ref}>
              {containerProps.children}
            </ul>
          ),
        )}
        Item={forwardRef<HTMLLIElement, ItemProps<HTMLLIElement, Data>>(
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
                  props.onClickCollapse(itemProps.item);
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
                {itemProps.item.data.title || "Untitled"}
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  marginLeft: "auto",
                }}
              >
                <Popover
                  Trigger={forwardRef<HTMLButtonElement, TriggerProps>(
                    (triggerProps, ref) => (
                      <button
                        onClick={triggerProps.onClick}
                        onPointerDown={(event) => {
                          event.stopPropagation();
                        }}
                        style={{
                          flexGrow: 0,
                          flexShrink: 0,
                        }}
                        ref={ref}
                      >
                        <Menu size={ICON_SIZE} />
                      </button>
                    ),
                  )}
                  Content={forwardRef<HTMLDivElement, ContentProps>(
                    (contentProps, ref) => (
                      <div
                        onPointerDown={(event) => {
                          event.stopPropagation();
                        }}
                        style={{
                          ...contentProps.style,
                          width: 265,
                          padding: "6px 0",
                          backgroundColor: "white",
                          borderRadius: 6,
                          boxShadow:
                            "rgba(15, 15, 15, 0.05) 0px 0px 0px 1px, rgba(15, 15, 15, 0.1) 0px 3px 6px, rgba(15, 15, 15, 0.2) 0px 9px 24px",
                          ...characterStyle,
                        }}
                        ref={ref}
                      >
                        <div
                          style={{
                            padding: "0 4px",
                          }}
                        >
                          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
                          <div
                            onClick={() => {
                              props.onClickDelete(itemProps.item.id);
                            }}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 10,
                              height: 28,
                              padding: "0 10px",
                            }}
                          >
                            <Trash2 size={ICON_SIZE} />
                            Delete
                          </div>
                        </div>
                        <div
                          style={{
                            padding: "0 4px",
                          }}
                        >
                          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
                          <div
                            onClick={() => {
                              props.onClickRename(itemProps.item);
                            }}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 10,
                              height: 28,
                              padding: "0 10px",
                            }}
                          >
                            <Edit size={ICON_SIZE} />
                            Rename
                          </div>
                        </div>
                      </div>
                    ),
                  )}
                  positionType="right-top"
                />
                <button
                  onClick={() => {
                    props.onClickAddChild(itemProps.item.id);
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
              </div>
            </li>
          ),
        )}
        onMove={props.onMove}
        itemHeight={28}
        paddingPerDepth={24}
        backgroundColor="rgba(35, 131, 226, 0.14)"
        borderHeight={4}
        borderColor="rgba(35, 131, 226, 0.43)"
        useFromItem={useFromItem}
      />
      <button
        onClick={props.onClickAddRoot}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 4,
          width: "100%",
          height: 28,
          padding: "2px 8px",
          ...characterStyle,
        }}
      >
        <Plus size={ICON_SIZE} />
        Add a page
      </button>
    </div>
  );
});
