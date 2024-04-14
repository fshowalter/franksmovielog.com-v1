import { style } from "@vanilla-extract/css";
import { minMediaQuery } from "../../styles/breakpoints";
import { foregroundColors } from "../../styles/colors.css";

export const flagTypographyStyle = style({
  fontSize: "1.5625rem",
  lineHeight: "2rem",
});

export const taglineStyle = style({
  fontStyle: "italic",
  lineHeight: "1rem",

  "@media": {
    [minMediaQuery("desktop")]: {
      paddingLeft: "1px",
    },
  },
});

export const navActiveLinkStyle = style({
  color: foregroundColors.muted,
});

export const orderStyle = style({
  "@media": {
    [minMediaQuery("max")]: {
      order: 4,
    },
  },
});
