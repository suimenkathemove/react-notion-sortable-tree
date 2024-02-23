export type NodeId = string;

export type Node<T extends Record<string, unknown>> = {
  id: NodeId;
  children: Node<T>[];
  collapsed: boolean;
  data: T;
};

export type Tree<T extends Record<string, unknown>> = Node<T>[];

export type FlattenedTreeItem<T extends Record<string, unknown>> = {
  id: NodeId;
  parentId: NodeId | null;
  depth: number;
  collapsed: boolean;
  data: T;
};
