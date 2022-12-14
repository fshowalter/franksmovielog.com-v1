import { style } from "@vanilla-extract/css";
import { size } from "../../styles/sizes.css";

export const gridStyle = style({
  display: "grid",
  gridTemplateColumns: `repeat(auto-fill, minmax(144px, 1fr))`,
  rowGap: size[48],
  columnGap: size[32],
  justifyItems: "center",
  justifyContent: "space-between",
});

export const progressRingPostionStyle = style({
  bottom: 0,
  left: 0,
  position: "absolute",
  top: 0,
  zIndex: 100,
});

export const progressRingTransformStyle = style({
  transformOrigin: "50% 50%",
});
