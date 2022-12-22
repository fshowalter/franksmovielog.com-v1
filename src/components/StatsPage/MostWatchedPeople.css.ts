import { style } from "@vanilla-extract/css";
import { minMediaQuery } from "../../styles/breakpoints";
import { gutterWidth, HEADER_HEIGHT } from "../../styles/sizes.css";

export const stickyHeaderStyle = style({
  position: "sticky",
  top: "2.5rem",
  zIndex: 300,
  lineHeight: "calc(2.5rem - 2px)",

  "@media": {
    [minMediaQuery("desktop")]: {
      top: `calc(${HEADER_HEIGHT}px + 2.5rem)`,
    },
  },
});

export const gridStyle = style({
  display: "grid",
  gridTemplateColumns: "auto 1fr auto",
});

export const detailsRowGridStyle = style({
  gridColumnEnd: 4,
  gridColumnStart: 1,
});

export const stickyRowHeaderStyle = style({
  position: "sticky",
  top: "5rem",
  lineHeight: "2.5rem",
  width: "100%",
  display: "grid",
  gridTemplateColumns: `auto 1fr calc(6ch + ${gutterWidth})`,

  "@media": {
    [minMediaQuery("desktop")]: {
      top: `calc(${HEADER_HEIGHT}px + 5rem)`,
    },
  },
});
