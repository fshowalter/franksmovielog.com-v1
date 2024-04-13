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

export const stickySummaryStyle = style({
  top: "0",
  position: "sticky",
  zIndex: "1000",
  cursor: "pointer",
  "@media": {
    [minMediaQuery("desktop")]: {
      top: "129px",
    },
  },
  boxSizing: "content-box",
  height: "2.25rem",
  display: "list-item",
  selectors: {
    ["&::marker"]: {
      fontSize: "1.5rem",
    },
  },
});
