import { style } from "@vanilla-extract/css";
import { minMediaQuery } from "../../styles/breakpoints";
import { POSTER_WIDTH, size } from "../../styles/sizes.css";

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

export const showTitleOnMobileOnlyStyle = style({
  display: "block",
  "@media": {
    [minMediaQuery("tablet")]: {
      display: "none",
    },
  },
});

export const posterStyle = style({
  borderRadius: 0,
  maxWidth: "48px",

  "@media": {
    [minMediaQuery("tablet")]: {
      borderRadius: size[8],
      maxWidth: POSTER_WIDTH,
    },
  },
});
