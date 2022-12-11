import { style } from "@vanilla-extract/css";
import { HEADER_HEIGHT } from "../../styles/sizes";

export const stickyHeaderStyle = style({
  position: "sticky",
  top: `calc(${HEADER_HEIGHT}px + 2.5rem)`,
  zIndex: 100,
  lineHeight: "calc(2.5rem - 2px)",
});

export const gridStyle = style({
  display: "grid",
  gridTemplateColumns: "auto 1fr auto",
});

export const detailsRowGridStyle = style({
  gridColumnEnd: 4,
  gridColumnStart: 1,
});
