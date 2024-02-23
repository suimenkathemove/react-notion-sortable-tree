export type NodeId = string;

export type Node = {
  id: NodeId;
  children: Node[];
  collapsed: boolean;
};

export type Tree = Node[];

export type FlattenedTreeItem = {
  id: NodeId;
  parentId: NodeId | null;
  depth: number;
  collapsed: boolean;
};
