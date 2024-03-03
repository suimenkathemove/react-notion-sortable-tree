import { findIndex, invariant, range } from "@suimenkathemove/utils";
import {
  createRef,
  memo,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

import { BorderOrBackground } from "./types";

import { FlattenedTreeItem, MoveTarget, NodeId, Tree } from "@/types";
import { collapseFlattenTree } from "@/utils/collapse-flatten-tree";
import { flattenTree } from "@/utils/flatten-tree";
import { getDescendantIds } from "@/utils/get-descendant-ids";
import { getLastDescendantIndex } from "@/utils/get-last-descendant-index";

interface Coordinate {
  x: number;
  y: number;
}

export interface ContainerProps {
  style: React.CSSProperties;
  children: React.ReactNode;
}

export interface ItemProps<
  ItemElement extends HTMLElement,
  Data extends Record<string, unknown>,
> {
  onPointerDown: React.PointerEventHandler<ItemElement>;
  style: React.CSSProperties;
  item: FlattenedTreeItem<Data>;
  paddingLeft: number;
}

export interface ReactNotionSortableTreeProps<
  ContainerElement extends HTMLElement,
  ItemElement extends HTMLElement,
  Data extends Record<string, unknown>,
> {
  tree: Tree<Data>;
  Container: React.ForwardRefExoticComponent<
    React.PropsWithoutRef<ContainerProps> &
      React.RefAttributes<ContainerElement>
  >;
  Item: React.ForwardRefExoticComponent<
    React.PropsWithoutRef<ItemProps<ItemElement, Data>> &
      React.RefAttributes<ItemElement>
  >;
  onMove: (fromItem: FlattenedTreeItem<Data>, target: MoveTarget) => void;
  itemHeight?: number;
  paddingPerDepth?: number;
  backgroundColor?: string;
  borderHeight?: number;
  borderColor?: string;
}

export const _ReactNotionSortableTree = <
  ContainerElement extends HTMLElement,
  ItemElement extends HTMLElement,
  Data extends Record<string, unknown>,
>(
  props: ReactNotionSortableTreeProps<ContainerElement, ItemElement, Data>,
) => {
  const itemHeight = props.itemHeight ?? 28;
  const heightDisplayBorder = itemHeight / 5;
  const paddingPerDepth = props.paddingPerDepth ?? 24;
  const backgroundColor = props.backgroundColor ?? "blue";
  const borderHeight = props.borderHeight ?? 1;
  const borderOffset = borderHeight / 2;
  const borderColor = props.borderColor ?? "blue";

  const collapsedFlattenedTree = useMemo(
    () => collapseFlattenTree(props.tree),
    [props.tree],
  );

  const [fromItem, setFromItem] = useState<FlattenedTreeItem<Data> | null>(
    null,
  );

  const containerElementRef = useRef<ContainerElement>(null);
  const itemElementRefMap = useRef<Map<NodeId, React.RefObject<ItemElement>>>(
    new Map(),
  );
  // TODO: useIsomorphicLayoutEffect
  useLayoutEffect(() => {
    collapsedFlattenedTree.forEach((item) => {
      itemElementRefMap.current.set(item.id, createRef());
    });
  }, [collapsedFlattenedTree]);

  const [pointerCoordinate, setPointerCoordinate] = useState<Coordinate | null>(
    null,
  );

  const pointerStartPositionRef = useRef<Coordinate | null>(null);
  const [pointerMovingDistance, setPointerMovingDistance] =
    useState<Coordinate | null>(null);

  const borderOrBackground = useMemo((): BorderOrBackground | null => {
    if (
      fromItem == null ||
      containerElementRef.current == null ||
      pointerCoordinate == null
    )
      return null;

    const movingDistance =
      pointerCoordinate.y -
      containerElementRef.current.getBoundingClientRect().top;

    const upperIndex = findIndex(
      range(collapsedFlattenedTree.length),
      (index) =>
        itemHeight * index - heightDisplayBorder <= movingDistance &&
        movingDistance <= itemHeight * index + heightDisplayBorder,
    );
    if (upperIndex != null) {
      const upperItem = collapsedFlattenedTree[upperIndex];
      invariant(upperItem != null, "upperItem should exist");
      const directlyUpperBorder = upperItem.id === fromItem.id;
      if (
        getDescendantIds(collapsedFlattenedTree, fromItem.id).includes(
          upperItem.id,
        ) &&
        !directlyUpperBorder
      )
        return null;

      return { type: "border", index: upperIndex };
    }

    const lastBorder =
      itemHeight * collapsedFlattenedTree.length - heightDisplayBorder <=
      movingDistance;
    if (lastBorder) {
      return { type: "lastBorder" };
    }

    const backgroundIndex = Math.floor(movingDistance / itemHeight);
    const backgroundItem = collapsedFlattenedTree[backgroundIndex];
    if (backgroundItem != null) {
      if (
        getDescendantIds(collapsedFlattenedTree, fromItem.id).includes(
          backgroundItem.id,
        )
      )
        return null;

      return { type: "background", index: backgroundIndex };
    }

    return null;
  }, [
    collapsedFlattenedTree,
    fromItem,
    heightDisplayBorder,
    itemHeight,
    pointerCoordinate,
  ]);

  const onPointerDown = useCallback(
    (event: React.PointerEvent<ItemElement>, item: FlattenedTreeItem<Data>) => {
      setFromItem(item);

      pointerStartPositionRef.current = { x: event.clientX, y: event.clientY };
    },
    [],
  );

  const onPointerMove = useCallback((event: PointerEvent) => {
    if (pointerStartPositionRef.current == null) return;

    setPointerCoordinate({
      x: event.clientX,
      y: event.clientY,
    });

    setPointerMovingDistance({
      x: event.clientX - pointerStartPositionRef.current.x,
      y: event.clientY - pointerStartPositionRef.current.y,
    });
  }, []);

  const onMove = useCallback(
    (target: MoveTarget) => {
      if (fromItem == null) return;
      const flattenedTree = flattenTree(props.tree);
      const descendantIds = getDescendantIds(flattenedTree, fromItem.id);
      if (descendantIds.some((id) => id === target.id)) return;
      props.onMove(fromItem, target);
    },
    [fromItem, props],
  );

  const onPointerUp = useCallback(() => {
    setFromItem(null);

    setPointerCoordinate(null);

    pointerStartPositionRef.current = null;
    setPointerMovingDistance(null);

    if (fromItem == null || borderOrBackground == null) return;

    switch (borderOrBackground.type) {
      case "border":
        {
          const borderIndex = borderOrBackground.index;
          if (borderIndex === 0) {
            const firstItem = collapsedFlattenedTree[borderIndex];
            invariant(firstItem != null, "toItem should exist");
            onMove({ type: "siblingChild", id: firstItem.id });
          } else {
            const upperItem = collapsedFlattenedTree[borderIndex - 1];
            invariant(upperItem != null, "upperItem should exist");
            const lowerItem = collapsedFlattenedTree[borderIndex];
            invariant(lowerItem != null, "lowerItem should exist");
            const isSiblingLeaf = fromItem.depth !== lowerItem.depth;
            const lastDescendantIndex = getLastDescendantIndex(
              collapsedFlattenedTree,
              fromItem.id,
            );
            const directlyLowerBorder = borderIndex === lastDescendantIndex + 1;
            const shouldLiftUp = isSiblingLeaf && directlyLowerBorder;
            if (shouldLiftUp) {
              const parentItem = collapsedFlattenedTree.find(
                (item) => item.id === fromItem.parentId,
              );
              if (parentItem == null) return;
              onMove({ type: "siblingParent", id: parentItem.id });
            } else {
              if (lowerItem.depth > upperItem.depth) {
                onMove({ type: "siblingChild", id: lowerItem.id });
              } else {
                onMove({ type: "siblingParent", id: upperItem.id });
              }
            }
          }
        }
        break;
      case "lastBorder":
        {
          const lastIndex = collapsedFlattenedTree.length - 1;
          const lastItem = collapsedFlattenedTree[lastIndex];
          invariant(lastItem != null, "lastItem should exist");
          const lastDescendantIndex = getLastDescendantIndex(
            collapsedFlattenedTree,
            fromItem.id,
          );
          const directlyLowerBorder = lastIndex === lastDescendantIndex;
          const shouldLiftUp = directlyLowerBorder;
          if (shouldLiftUp) {
            const parentItem = collapsedFlattenedTree.find(
              (item) => item.id === fromItem.parentId,
            );
            if (parentItem == null) return;
            onMove({ type: "siblingParent", id: parentItem.id });
          } else {
            onMove({ type: "siblingParent", id: lastItem.id });
          }
        }
        break;
      case "background":
        {
          const backgroundIndex = borderOrBackground.index;
          const backgroundItem = collapsedFlattenedTree[backgroundIndex];
          invariant(backgroundItem != null, "backgroundItem should exist");
          onMove({ type: "parent", id: backgroundItem.id });
        }
        break;
      default:
        borderOrBackground satisfies never;
    }
  }, [borderOrBackground, collapsedFlattenedTree, fromItem, onMove]);

  useEffect(() => {
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, [onPointerMove, onPointerUp]);

  const paddingLeft = useCallback(
    (depth: number): number => paddingPerDepth * depth,
    [paddingPerDepth],
  );

  const borderY = useMemo((): number | null => {
    if (borderOrBackground == null || borderOrBackground.type === "background")
      return null;
    switch (borderOrBackground.type) {
      case "border":
        return itemHeight * borderOrBackground.index - borderOffset;
      case "lastBorder":
        return itemHeight * collapsedFlattenedTree.length - borderOffset;
      default:
        return borderOrBackground satisfies never;
    }
  }, [
    borderOffset,
    borderOrBackground,
    collapsedFlattenedTree.length,
    itemHeight,
  ]);

  const ghostMovingDistance = useMemo((): Coordinate | null => {
    if (fromItem == null || pointerMovingDistance == null) return null;
    const fromElement = itemElementRefMap.current.get(fromItem.id)?.current;
    invariant(fromElement != null, "fromElement should exist");
    const fromRect = fromElement.getBoundingClientRect();

    return {
      x: fromRect.x + pointerMovingDistance.x,
      y: fromRect.y + pointerMovingDistance.y,
    };
  }, [fromItem, pointerMovingDistance]);

  return (
    <>
      <props.Container
        style={{
          position: "relative",
        }}
        ref={containerElementRef}
      >
        {collapsedFlattenedTree.map((item, index) => (
          <props.Item
            key={item.id}
            onPointerDown={(event) => {
              onPointerDown(event, item);
            }}
            style={{
              height: itemHeight,
              paddingLeft: paddingLeft(item.depth),
              userSelect: "none",
              backgroundColor:
                borderOrBackground?.type === "background" &&
                index === borderOrBackground.index
                  ? backgroundColor
                  : undefined,
            }}
            item={item}
            paddingLeft={paddingLeft(item.depth)}
            ref={itemElementRefMap.current.get(item.id)}
          />
        ))}
        {borderY != null && (
          <div
            style={{
              position: "absolute",
              top: borderY,
              width: "100%",
              height: borderHeight,
              backgroundColor: borderColor,
            }}
          />
        )}
      </props.Container>
      {fromItem != null &&
        ghostMovingDistance != null &&
        createPortal(
          <props.Item
            onPointerDown={() => {}}
            style={{
              position: "absolute",
              top: ghostMovingDistance.y,
              left: ghostMovingDistance.x,
              height: itemHeight,
              paddingLeft: paddingLeft(fromItem.depth),
              opacity: 0.5,
            }}
            item={fromItem}
            paddingLeft={paddingLeft(fromItem.depth)}
          />,
          document.body,
        )}
    </>
  );
};

export const ReactNotionSortableTree = memo(
  _ReactNotionSortableTree,
) as typeof _ReactNotionSortableTree;
