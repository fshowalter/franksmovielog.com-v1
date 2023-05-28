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

export const dayFontStyle = style({
  fontSize: "0.75rem",
  lineHeight: "1rem",
  "@media": {
    [minMediaQuery("tablet")]: {
      // fontSize: "0.875rem",
      // letterSpacing: "1px",
      // lineHeight: "1rem",
    },
  },
});

export const dateFontStyle = style({
  fontSize: "1.125rem",
  lineHeight: "1.5rem",
  "@media": {
    [minMediaQuery("tablet")]: {
      // fontSize: "1.125rem",
      // lineHeight: "2rem",
    },
  },
});

export const stickyCalendarStyle = style({
  top: "5.5rem",
  position: "sticky",
  paddingBottom: "1rem",
  "@media": {
    [minMediaQuery("tablet")]: {
      position: "unset",
    },
  },
});
