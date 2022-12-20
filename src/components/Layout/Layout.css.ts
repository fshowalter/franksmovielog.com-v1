import { style } from "@vanilla-extract/css";
import { breakpoints, minMediaQuery } from "../../styles/breakpoints";
import { backgroundColors, foregroundColors } from "../../styles/colors.css";
import { MAX_STILL_WIDTH, size } from "../../styles/sizes.css";

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

export const skipToMainContentStyle = style({
  background: backgroundColors.subtle,
  color: foregroundColors.accent,
  left: "50%",
  margin: "0 auto",
  padding: `${size[8]} ${size[24]}`,
  position: "absolute",
  textAlign: "center",
  top: "2px",
  transform: "translate(-50%, calc(-100% - 2px))",
  zIndex: 10000,

  [":focus"]: {
    transform: "translate(-50%, 0%)",
  },
});
