import { style } from "@vanilla-extract/css";
import { minMediaQuery } from "../../styles/breakpoints";

export const stickyStyle = style({
  top: "0",
  position: "sticky",
  zIndex: "1000",
  "@media": {
    [minMediaQuery("desktop")]: {
      top: "129px",
    },
  },
});
