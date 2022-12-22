import { style } from "@vanilla-extract/css";
import { minMediaQuery } from "../../styles/breakpoints";
import { borderColors, foregroundColors } from "../../styles/colors.css";
import { POSTER_WIDTH, size } from "../../styles/sizes.css";

export const posterStyle = style({
  maxWidth: POSTER_WIDTH,
  marginBottom: "16px",
});

export const posterFloatStyle = style({
  float: "left" as const,
  maxWidth: "50%",
  marginRight: "24px",

  "@media": {
    [minMediaQuery("tablet")]: {
      marginRight: "32px",
    },
  },
});

export const creditStyle = style({
  marginBottom: size[16],
  overflow: "hidden",
});

export const backToTopArrowStyle = style({
  fill: foregroundColors.accent,
  height: "24px",
  width: "24px",
});

export const backToTopContainerStyle = style({
  cursor: "pointer",
  marginLeft: "auto",
  width: "calc(50% - 24px)",

  ":hover": {
    boxShadow: `0 0 0 1px ${borderColors.accent}`,
  },

  "@media": {
    [minMediaQuery("tablet")]: {
      width: "calc(100% - 280px)",
      maxWidth: "unset",
    },
  },
});
