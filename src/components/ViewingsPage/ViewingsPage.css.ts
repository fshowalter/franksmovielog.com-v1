import { style } from "@vanilla-extract/css";
import { minMediaQuery } from "../../styles/breakpoints";

export const stickyHeaderStyle = style({
  top: "2rem",
  position: "sticky",
  "@media": {
    [minMediaQuery("desktop")]: {
      paddingTop: 0,
      top: "165px",
    },
  },
});

export const stickyFiltersStyle = style({
  "@media": {
    [minMediaQuery("desktop")]: {
      position: "sticky",
      top: "155px",
    },
  },
});

export const stickyListInfoStyle = style({
  top: "0",
  position: "sticky",
  zIndex: "1000",
  "@media": {
    [minMediaQuery("desktop")]: {
      top: "129px",
    },
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
