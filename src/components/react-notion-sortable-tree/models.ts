export type BorderOrBackground =
  | {
      type: "border";
      index: number;
    }
  | {
      type: "lastBorder";
    }
  | {
      type: "background";
      index: number;
    };
