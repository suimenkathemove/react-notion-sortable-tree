export type NodeId = string;

export type Node = {
  id: NodeId;
  children: Node[];
  collapsed: boolean;
};

export type Tree = {
  id: "root";
  children: Node[];
};

export type FlattenedTreeItem = {
  id: NodeId;
  parentId: NodeId;
  depth: number;
  collapsed: boolean;
};
