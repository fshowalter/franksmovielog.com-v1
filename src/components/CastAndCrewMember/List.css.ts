import { style } from "@vanilla-extract/css";
import { minMediaQuery } from "../../styles/breakpoints";

export const stickyGroupHeaderStyle = style({
  top: "2rem",
  position: "sticky",
  "@media": {
    [minMediaQuery("desktop")]: {
      paddingTop: 0,
      top: "197px",
    },
  },
});
