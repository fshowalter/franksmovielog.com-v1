import { style } from "@vanilla-extract/css";
import { minMediaQuery } from "../../styles/breakpoints";
import { size } from "../../styles/sizes";

export const titleLayoutStyle = style({
  paddingTop: size[24],
  paddingBottom: size[24],

  "@media": {
    [minMediaQuery("desktop")]: {
      paddingTop: size[32],
      paddingBottom: size[32],
    },
  },
});
