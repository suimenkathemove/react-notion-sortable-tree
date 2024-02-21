import { FlattenedTreeItem } from "@/types/tree";

export const flattenedTree: FlattenedTreeItem[] = [
  { id: "1", parentId: "root", depth: 0, collapsed: true },
  { id: "4", parentId: "1", depth: 1, collapsed: true },
  { id: "10", parentId: "4", depth: 2, collapsed: true },
  { id: "11", parentId: "4", depth: 2, collapsed: true },
  { id: "12", parentId: "4", depth: 2, collapsed: true },
  { id: "5", parentId: "1", depth: 1, collapsed: true },
  { id: "6", parentId: "1", depth: 1, collapsed: true },
  { id: "2", parentId: "root", depth: 0, collapsed: true },
  { id: "7", parentId: "2", depth: 1, collapsed: true },
  { id: "8", parentId: "2", depth: 1, collapsed: true },
  { id: "9", parentId: "2", depth: 1, collapsed: true },
  { id: "3", parentId: "root", depth: 0, collapsed: true },
];
