import { style } from "@vanilla-extract/css";
import { breakpoints, minMediaQuery } from "../../styles/breakpoints";
import { MAX_STILL_WIDTH } from "../../styles/sizes.css";

export const pageCanvasStyle = style({
  minHeight: "100dvh",
  maxWidth: `clamp(${MAX_STILL_WIDTH}, 95vw, ${breakpoints.max})`,
  margin: "0 auto",
});

export const bandStickyStyle = style({
  maxWidth: `clamp(${MAX_STILL_WIDTH}, 95vw, ${breakpoints.max})`,
  margin: "0 auto",

  "@media": {
    [minMediaQuery("desktop")]: {
      position: "sticky",
      top: "0",
      zIndex: 1000,
    },
  },
});

export const headerLayoutStyle = style({
  flexDirection: "column",
  textAlign: "center",

  "@media": {
    [minMediaQuery("desktop")]: {
      flexDirection: "row",
      justifyContent: "space-between",
      textAlign: "left",
      position: "sticky",
      top: "16px",
      zIndex: 1000,
    },
  },
});
