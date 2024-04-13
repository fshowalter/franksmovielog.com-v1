import { style } from "@vanilla-extract/css";
import { breakpoints, minMediaQuery } from "../../styles/breakpoints";
import { STILL_WIDTH } from "../../styles/sizes.css";

export const pageCanvasStyle = style({
  minHeight: "100dvh",
  maxWidth: `clamp(${STILL_WIDTH}, 95vw, ${breakpoints.max})`,
  margin: "0 auto",
});

export const bandStickyStyle = style({
  maxWidth: `clamp(${STILL_WIDTH}, 95vw, ${breakpoints.max})`,
  margin: "0 auto",

  "@media": {
    [minMediaQuery("desktop")]: {
      position: "sticky",
      top: "0",
      zIndex: 10000,
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
      zIndex: 10000,
    },
  },
});

export const skipToMainContentStyle = style({
  left: "50%",
  margin: "0 auto",
  position: "absolute",
  top: "2px",
  transform: "translate(-50%, calc(-100% - 2px))",
  zIndex: 100000,

  [":focus"]: {
    transform: "translate(-50%, 0%)",
  },
});
