import { style } from "@vanilla-extract/css";
import { minMediaQuery } from "../../styles/breakpoints";
import { borderColors } from "../../styles/colors.css";
import {
  MAX_POSTER_WIDTH,
  popoutGutterWidth,
  size,
} from "../../styles/sizes.css";

export const seeAllLinkGridStyle = style({
  gridColumn: "1 / -1",
});

export const movieListStyle = style({
  padding: 0,
  "@media": {
    [minMediaQuery("tablet")]: {
      padding: `${size[32]} ${popoutGutterWidth} 0`,
      display: "grid",
      gridTemplateColumns: "repeat(2,1fr)",
      columnGap: size[32],
      boxShadow: `0 0 0 1px ${borderColors.default}`,
      borderRadius: size[8],
    },
    [minMediaQuery("desktop")]: {
      paddingTop: 0,
      maxWidth: `calc((${MAX_POSTER_WIDTH} * 4) + (${size[32]} * 3) + (${size[32]} * 2))`,
      display: "grid",
      gridTemplateColumns: "repeat(4,1fr)",
      columnGap: size[32],
      boxShadow: "unset",
    },
  },
});
