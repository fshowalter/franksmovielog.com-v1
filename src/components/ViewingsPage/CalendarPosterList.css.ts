import { style } from "@vanilla-extract/css";
import { minMediaQuery } from "../../styles/breakpoints";

export const slugTypographyStyle = style({
  fontSize: ".875rem",
  lineHeight: "1rem",
  letterSpacing: "0.5px",
});

export const titleTypographyStyle = style({
  fontSize: "1rem",
  lineHeight: "1.5rem",
});

export const posterStyle = style({
  borderRadius: "4px",
  maxWidth: "64px",
  minWidth: "64px",

  "@media": {
    [minMediaQuery("tablet")]: {
      // maxWidth: "80px",
      // minWidth: "80px",
    },
  },
});

export const listItemStyle = style({
  ":last-of-type": {
    boxShadow: "none",
  },
});
