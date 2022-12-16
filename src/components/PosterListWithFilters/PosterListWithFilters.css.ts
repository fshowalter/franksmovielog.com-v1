import { style } from "@vanilla-extract/css";
import { minMediaQuery } from "../../styles/breakpoints";

export const stickyHeaderStyle = style({
  top: "2rem",
  position: "sticky",
  "@media": {
    [minMediaQuery("desktop")]: {
      paddingTop: 0,
      top: "196px",
    },
  },
});

export const stickyFiltersStyle = style({
  "@media": {
    [minMediaQuery("desktop")]: {
      position: "sticky",
      top: "184px",
    },
  },
});
