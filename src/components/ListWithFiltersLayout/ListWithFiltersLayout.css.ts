import { style } from "@vanilla-extract/css";
import { minMediaQuery } from "../../styles/breakpoints";

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

export const stickyGroupHeaderStyle = style({
  top: "2rem",
  position: "sticky",
  "@media": {
    [minMediaQuery("desktop")]: {
      paddingTop: 0,
      top: "165px",
    },
  },
});

export const subListItemStyle = style({
  ":last-of-type": {
    boxShadow: "none",
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
