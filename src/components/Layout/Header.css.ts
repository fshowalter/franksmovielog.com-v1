import { style } from "@vanilla-extract/css";
import { minMediaQuery } from "../../styles/breakpoints";

export const taglineStyle = style({
  fontSize: "15px",

  "@media": {
    [minMediaQuery("desktop")]: {
      paddingLeft: "1px",
    },
  },
});
