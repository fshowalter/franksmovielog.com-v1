import { style } from "@vanilla-extract/css";
import { minMediaQuery } from "../../styles/breakpoints";
import { borderColors, foregroundColors } from "../../styles/colors.css";
import { gutterWidth, POSTER_WIDTH, size } from "../../styles/sizes.css";

export const posterStyle = style({
  maxWidth: POSTER_WIDTH,
  margin: "0 auto 16px",
  display: "block !important",

  "@media": {
    [minMediaQuery("tablet")]: {
      marginLeft: "unset",
      marginRight: "unset",
    },
  },
});

export const titleStyle = style({
  textAlign: "center",

  "@media": {
    [minMediaQuery("tablet")]: {
      textAlign: "left",
    },
  },
});

export const posterFloatStyle = style({
  display: "block",
  margin: "0 auto",

  "@media": {
    [minMediaQuery("tablet")]: {
      float: "left" as const,
      maxWidth: "50%",
      marginRight: gutterWidth,
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
  width: "100%",
  maxWidth: "unset",

  ":hover": {
    boxShadow: `0 0 0 1px ${borderColors.accent}`,
  },

  "@media": {
    [minMediaQuery("tablet")]: {
      marginLeft: "auto",
      width: `calc(100% - ${POSTER_WIDTH} - ${gutterWidth})`,
    },
  },
});
