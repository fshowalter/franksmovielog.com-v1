import { style } from "@vanilla-extract/css";
import { minMediaQuery } from "../../styles/breakpoints";

export const headingStyle = style({
  fontSize: "2rem",
  fontWeight: "normal",
  lineHeight: 1,

  "@media": {
    [minMediaQuery("desktop")]: {
      fontSize: "2.25rem",
    },
  },
});
