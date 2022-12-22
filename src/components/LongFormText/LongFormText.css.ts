import { style } from "@vanilla-extract/css";
import { minMediaQuery } from "../../styles/breakpoints";

export const typographyStyle = style({
  letterSpacing: "0.3px",
  fontSize: "1.125rem",
  lineHeight: "1.75rem",

  "@media": {
    [minMediaQuery("tablet")]: {
      fontSize: "1.25rem",
      lineHeight: "2rem",
    },
  },
});
