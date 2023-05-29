import { style } from "@vanilla-extract/css";
import { minMediaQuery } from "../../styles/breakpoints";

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
