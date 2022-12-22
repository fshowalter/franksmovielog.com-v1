import { globalStyle, style } from "@vanilla-extract/css";
import { breakpoints, minMediaQuery } from "../../styles/breakpoints";
import { HEADER_HEIGHT } from "../../styles/sizes.css";

export const stickyTableHeaderStyle = style({
  position: "sticky",
  top: "2.5rem",
  zIndex: 100,
  lineHeight: "calc(2.5rem - 2px)",

  "@media": {
    [minMediaQuery("desktop")]: {
      top: `calc(${HEADER_HEIGHT}px + 2.5rem)`,
    },
  },
});

export const tableBorderStyle = style({
  borderCollapse: "collapse",
});

export const tableWhiteSpaceStyle = style({
  "@media": {
    [minMediaQuery("tablet")]: {
      whiteSpace: "nowrap",
    },
  },
});

export const hideOnSmallScreensStyle = style({
  "@media": {
    [`(max-width: ${breakpoints.tablet})`]: {
      width: 0,
    },
  },
});

globalStyle(`${hideOnSmallScreensStyle} > *`, {
  "@media": {
    [`(max-width: ${breakpoints.tablet})`]: {
      display: "none",
    },
  },
});
