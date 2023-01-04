import { style } from "@vanilla-extract/css";
import { minMediaQuery } from "../../styles/breakpoints";

export const slugTypographyStyle = style({
  fontSize: ".875rem",
  lineHeight: "1rem",
  letterSpacing: "0.5px",

  "@media": {
    [minMediaQuery("tablet")]: {
      fontSize: "0.75rem",
      lineHeight: "1rem",
      letterSpacing: "0.5px",
    },
  },
});
