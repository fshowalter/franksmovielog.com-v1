import { style } from "@vanilla-extract/css";
import { minMediaQuery } from "../../styles/breakpoints";
import { size } from "../../styles/sizes.css";

export const gridStyle = style({
  "@media": {
    [minMediaQuery("tablet")]: {
      columnGap: size[24],
      display: "grid",
      gridTemplateColumns: `repeat(auto-fill, minmax(${size[128]}, 1fr))`,
      rowGap: size[32],
    },
  },
});

export const gradeStyle = style({
  "@media": {
    [minMediaQuery("tablet")]: {
      width: "80px !important",
      height: "16px !important",
    },
  },
});

export const posterBackgroundColorStyle = style({
  backgroundColor: "#e1e1e1",
});
