import { style } from "@vanilla-extract/css";
import { minMediaQuery } from "../../styles/breakpoints";
import { size } from "../../styles/sizes.css";

export const navColumnGapStyle = style({
  columnGap: size[16],
  "@media": {
    [minMediaQuery("tablet")]: {
      columnGap: size[24],
    },
  },
});
