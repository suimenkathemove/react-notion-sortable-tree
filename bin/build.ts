const path = require("path");

const { build } = require("esbuild");

void build({
  entryPoints: [
    path.resolve(__dirname, "../src/react-notion-sortable-tree/index.tsx"),
  ],
  bundle: true,
  outdir: "dist",
  platform: "browser",
});
