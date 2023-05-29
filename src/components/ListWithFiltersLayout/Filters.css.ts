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
