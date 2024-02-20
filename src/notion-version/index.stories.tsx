import { StoryObj } from "@storybook/react";
import { useState } from "react";

import { NotionVersion } from ".";

import { tree as mockTree } from "@/__mocks__/tree";

export default {};

export const Default: StoryObj = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [tree, setTree] = useState(mockTree);

    return <NotionVersion tree={tree} setTree={setTree} />;
  },
};
