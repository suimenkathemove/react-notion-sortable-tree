import { FlattenedTreeItem } from "@/types";

export const flattenedTree: FlattenedTreeItem<{ title: string }>[] = [
  { id: "1", parentId: null, depth: 0, collapsed: true, data: { title: "1" } },
  { id: "4", parentId: "1", depth: 1, collapsed: true, data: { title: "4" } },
  { id: "10", parentId: "4", depth: 2, collapsed: true, data: { title: "10" } },
  { id: "11", parentId: "4", depth: 2, collapsed: true, data: { title: "11" } },
  { id: "12", parentId: "4", depth: 2, collapsed: true, data: { title: "12" } },
  { id: "5", parentId: "1", depth: 1, collapsed: true, data: { title: "5" } },
  { id: "6", parentId: "1", depth: 1, collapsed: true, data: { title: "6" } },
  { id: "2", parentId: null, depth: 0, collapsed: true, data: { title: "2" } },
  { id: "7", parentId: "2", depth: 1, collapsed: true, data: { title: "7" } },
  { id: "8", parentId: "2", depth: 1, collapsed: true, data: { title: "8" } },
  { id: "9", parentId: "2", depth: 1, collapsed: true, data: { title: "9" } },
  { id: "3", parentId: null, depth: 0, collapsed: true, data: { title: "3" } },
];
