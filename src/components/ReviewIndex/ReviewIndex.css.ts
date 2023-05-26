import { style } from "@vanilla-extract/css";
import { minMediaQuery } from "../../styles/breakpoints";

export const stickyFiltersStyle = style({
  "@media": {
    [minMediaQuery("desktop")]: {
      position: "sticky",
      top: "155px",
    },
  },
});

export const stickyListInfoStyle = style({
  top: "0",
  position: "sticky",
  zIndex: "1000",
  "@media": {
    [minMediaQuery("desktop")]: {
      top: "129px",
    },
  },
});
