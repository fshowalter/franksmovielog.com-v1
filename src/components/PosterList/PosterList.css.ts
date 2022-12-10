import { style } from "@vanilla-extract/css";
import { size } from "../../styles/sizes";

export const gridStyle = style({
  columnGap: size[24],
  display: "grid",
  gridTemplateColumns: `repeat(auto-fill, minmax(${size[128]}, 1fr))`,
  rowGap: size[32],
});
