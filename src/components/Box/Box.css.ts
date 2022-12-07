import { style } from "@vanilla-extract/css";
import { minMediaQuery } from "../../styles/breakpoints";

export const mobileOnlyStyle = style({
  "@media": {
    [minMediaQuery("desktop")]: {
      display: "none",
    },
  },
});

export const desktopOnlyStyle = style({
  display: "none",
  "@media": {
    [minMediaQuery("desktop")]: {
      display: "revert",
    },
  },
});

export const screenReaderOnlyStyle = style({
  borderWidth: "0",
  clip: "rect(0, 0, 0, 0)",
  height: "1px",
  margin: "-1px",
  overflow: "hidden",
  padding: "0",
  position: "absolute",
  whiteSpace: "nowrap",
  width: "1px",
});
