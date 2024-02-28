import { Tree } from "@/types";

export const tree: Tree<{ title: string }> = [
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
            data: { title: "10" },
          },
          {
            id: "11",
            children: [],
            collapsed: true,
            data: { title: "11" },
          },
          {
            id: "12",
            children: [],
            collapsed: true,
            data: { title: "12" },
          },
        ],
        collapsed: true,
        data: { title: "4" },
      },
      {
        id: "5",
        children: [],
        collapsed: true,
        data: { title: "5" },
      },
      {
        id: "6",
        children: [],
        collapsed: true,
        data: { title: "6" },
      },
    ],
    collapsed: true,
    data: { title: "1" },
  },
  {
    id: "2",
    children: [
      {
        id: "7",
        children: [],
        collapsed: true,
        data: { title: "7" },
      },
      {
        id: "8",
        children: [],
        collapsed: true,
        data: { title: "8" },
      },
      {
        id: "9",
        children: [],
        collapsed: true,
        data: { title: "9" },
      },
    ],
    collapsed: true,
    data: { title: "2" },
  },
  {
    id: "3",
    children: [],
    collapsed: true,
    data: { title: "3" },
  },
];
