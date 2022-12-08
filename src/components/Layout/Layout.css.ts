import { style } from "@vanilla-extract/css";
import { breakpoints, minMediaQuery } from "../../styles/breakpoints";
import { MAX_STILL_WIDTH } from "../../styles/sizes";

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
      zIndex: 200,
    },
  },
});

export const headerStickyStyle = style({
  "@media": {
    [minMediaQuery("desktop")]: {
      position: "sticky",
      top: "16px",
      zIndex: 200,
    },
  },
});
