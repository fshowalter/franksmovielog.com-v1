import { style } from "@vanilla-extract/css";
import { minMediaQuery } from "../../styles/breakpoints";
import { POSTER_WIDTH, relativeSize, size } from "../../styles/sizes.css";

export const gridStyle = style({
  "@media": {
    [minMediaQuery("tablet")]: {
      columnGap: size[24],
      display: "grid",
      gridTemplateColumns: `repeat(auto-fill, minmax(${size[128]}, 1fr))`,
      rowGap: size[32],
    },
  },
});

export const slugTypographyStyle = style({
  fontSize: ".875rem",
  lineHeight: "1rem",

  "@media": {
    [minMediaQuery("tablet")]: {
      fontSize: "0.75rem",
      lineHeight: "1rem",
      letterSpacing: "0.5px",
    },
  },
});

export const titleTypographyStyle = style({
  fontSize: relativeSize[18],
  lineHeight: "1.5rem",

  "@media": {
    [minMediaQuery("tablet")]: {
      fontSize: "1rem",
      lineHeight: "1.5rem",
    },
  },
});

export const showTitleOnMobileOnlyStyle = style({
  display: "block",
  "@media": {
    [minMediaQuery("tablet")]: {
      display: "none",
    },
  },
});

export const posterStyle = style({
  borderRadius: 0,
  maxWidth: "48px",

  "@media": {
    [minMediaQuery("tablet")]: {
      borderRadius: size[8],
      maxWidth: POSTER_WIDTH,
    },
  },
});
