import { style } from "@vanilla-extract/css";
import { minMediaQuery } from "./breakpoints";
import { HEADER_HEIGHT } from "./sizes.css";

export const stickyHeaderScrollMarginTopStyle = style({
  "@media": {
    [minMediaQuery("desktop")]: {
      scrollMarginTop: HEADER_HEIGHT,
    },
  },
});
