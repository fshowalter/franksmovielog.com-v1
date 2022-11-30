import { style } from "@vanilla-extract/css";
import { minMediaQuery } from "../../styles/breakpoints";

export const gridAreaHeaderStyle = style({
  gridArea: "header",
});

export const mastTaglineStyle = style({
  gridArea: "tagline",
  fontStyle: "italic",
  "@media": {
    [minMediaQuery("desktop")]: {
      fontSize: "15px",
      paddingLeft: "1px",
    },
  },
});
