import { expect, test } from "vitest";

import { flattenedTree } from "../../__mocks__/flattened-tree";
import { tree } from "../../__mocks__/tree";

import { buildTree } from ".";

test("buildTree", () => {
  expect(buildTree(flattenedTree)).toEqual(tree);
});
