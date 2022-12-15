import { style } from "@vanilla-extract/css";
import { minMediaQuery } from "../../styles/breakpoints";
import {
  MAX_POSTER_WIDTH,
  popoutGutterWidth,
  size,
} from "../../styles/sizes.css";

export const avatarStyle = style({
  display: "none",
  "@media": {
    [minMediaQuery("tablet")]: {
      borderRadius: "50%",
      display: "block !important",
      height: "40px",
      marginRight: "1ch",
      transform: "translateZ(0)", // Fix Safari border-radius with hidden overflow.
      width: "40px",
      overflow: "hidden",
    },
  },
});

export const seeAllLinkGridStyle = style({
  gridColumn: "1 / -1",
});

export const movieListStyle = style({
  padding: 0,
  "@media": {
    [minMediaQuery("tablet")]: {
      padding: `0 ${popoutGutterWidth}`,
      display: "grid",
      gridTemplateColumns: "repeat(2,1fr)",
      columnGap: size[32],
    },
    [minMediaQuery("desktop")]: {
      maxWidth: `calc((${MAX_POSTER_WIDTH} * 4) + (${size[32]} * 3) + (${size[32]} * 2))`,
      display: "grid",
      gridTemplateColumns: "repeat(4,1fr)",
      columnGap: size[32],
    },
  },
});
