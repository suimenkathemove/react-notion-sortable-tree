import { Tree } from "@/types/tree";

export const tree: Tree<Record<string, unknown>> = [
  {
    id: "1",
    children: [
      {
        id: "4",
        children: [
          {
            id: "10",
            children: [],
            collapsed: true,
            data: {},
          },
          {
            id: "11",
            children: [],
            collapsed: true,
            data: {},
          },
          {
            id: "12",
            children: [],
            collapsed: true,
            data: {},
          },
        ],
        collapsed: true,
        data: {},
      },
      {
        id: "5",
        children: [],
        collapsed: true,
        data: {},
      },
      {
        id: "6",
        children: [],
        collapsed: true,
        data: {},
      },
    ],
    collapsed: true,
    data: {},
  },
  {
    id: "2",
    children: [
      {
        id: "7",
        children: [],
        collapsed: true,
        data: {},
      },
      {
        id: "8",
        children: [],
        collapsed: true,
        data: {},
      },
      {
        id: "9",
        children: [],
        collapsed: true,
        data: {},
      },
    ],
    collapsed: true,
    data: {},
  },
  {
    id: "3",
    children: [],
    collapsed: true,
    data: {},
  },
];
