import { style } from "@vanilla-extract/css";
import { minMediaQuery } from "../../styles/breakpoints";
import { gutterWidth, popoutGutterWidth, size } from "../../styles/sizes.css";

export const seeAllLinkGridStyle = style({
  gridColumn: "1 / -1",
  "@media": {
    [minMediaQuery("tablet")]: {
      position: "absolute",
      top: 0,
      right: 0,
    },
    [minMediaQuery("desktop")]: {
      right: popoutGutterWidth,
    },
  },
});

export const movieListStyle = style({
  padding: 0,
  "@media": {
    [minMediaQuery("tablet")]: {
      padding: `0 ${popoutGutterWidth}`,
      display: "grid",
      gridTemplateColumns: "repeat(2, minmax(100px, 312px))",
      columnGap: size[32],
      rowGap: size[32],
      maxWidth: `calc(656px + ${popoutGutterWidth})`,
    },
    [minMediaQuery("desktop")]: {
      padding: `${size[8]} ${gutterWidth} 0`,
      maxWidth: "unset",
      gridTemplateColumns: "repeat(4,1fr)",
    },
  },
});
