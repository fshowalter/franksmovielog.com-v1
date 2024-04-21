import { style } from "@vanilla-extract/css";
import { minMediaQuery } from "../../styles/breakpoints";
import { gutterWidth, pageMarginWidth, size } from "../../styles/sizes.css";

export const seeAllLinkGridStyle = style({
  gridColumn: "1 / -1",
  "@media": {
    [minMediaQuery("tablet")]: {
      position: "absolute",
      top: 0,
      right: 0,
    },
    [minMediaQuery("desktop")]: {
      right: gutterWidth,
    },
  },
});

export const movieListStyle = style({
  padding: 0,
  width: "100%",
  "@media": {
    [minMediaQuery("tablet")]: {
      padding: `0 ${gutterWidth}`,
      display: "grid",
      gridTemplateColumns: "repeat(2, minmax(100px, 312px))",
      columnGap: size[32],
      rowGap: size[32],
      width: "unset",
    },
    [minMediaQuery("desktop")]: {
      padding: `${size[8]} ${pageMarginWidth} 0`,
      maxWidth: "unset",
      gridTemplateColumns: "repeat(4,1fr)",
    },
  },
});
