import { Tree } from "@/types/tree";

export const tree: Tree = {
  id: "root",
  children: [
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
            },
            {
              id: "11",
              children: [],
              collapsed: true,
            },
            {
              id: "12",
              children: [],
              collapsed: true,
            },
          ],
          collapsed: true,
        },
        {
          id: "5",
          children: [],
          collapsed: true,
        },
        {
          id: "6",
          children: [],
          collapsed: true,
        },
      ],
      collapsed: true,
    },
    {
      id: "2",
      children: [
        {
          id: "7",
          children: [],
          collapsed: true,
        },
        {
          id: "8",
          children: [],
          collapsed: true,
        },
        {
          id: "9",
          children: [],
          collapsed: true,
        },
      ],
      collapsed: true,
    },
    {
      id: "3",
      children: [],
      collapsed: true,
    },
  ],
};
