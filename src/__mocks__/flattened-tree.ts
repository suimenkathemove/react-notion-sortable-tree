import { FlattenedTreeItem } from "@/types/tree";

export const flattenedTree: FlattenedTreeItem<Record<string, unknown>>[] = [
  { id: "1", parentId: null, depth: 0, collapsed: true, data: {} },
  { id: "4", parentId: "1", depth: 1, collapsed: true, data: {} },
  { id: "10", parentId: "4", depth: 2, collapsed: true, data: {} },
  { id: "11", parentId: "4", depth: 2, collapsed: true, data: {} },
  { id: "12", parentId: "4", depth: 2, collapsed: true, data: {} },
  { id: "5", parentId: "1", depth: 1, collapsed: true, data: {} },
  { id: "6", parentId: "1", depth: 1, collapsed: true, data: {} },
  { id: "2", parentId: null, depth: 0, collapsed: true, data: {} },
  { id: "7", parentId: "2", depth: 1, collapsed: true, data: {} },
  { id: "8", parentId: "2", depth: 1, collapsed: true, data: {} },
  { id: "9", parentId: "2", depth: 1, collapsed: true, data: {} },
  { id: "3", parentId: null, depth: 0, collapsed: true, data: {} },
];
