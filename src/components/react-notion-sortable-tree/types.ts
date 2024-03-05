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

export interface Coordinate {
  x: number;
  y: number;
}

export type Rect = Coordinate & {
  width: number;
  height: number;
};
