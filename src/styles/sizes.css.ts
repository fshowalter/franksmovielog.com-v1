import { createVar, globalStyle } from "@vanilla-extract/css";
import { minMediaQuery } from "./breakpoints";

export const gutterWidth = createVar();
export const popoutGutterWidth = createVar();

globalStyle(":root", {
  vars: {
    [gutterWidth]: "20px",
    [popoutGutterWidth]: "20px",
  },
  "@media": {
    [minMediaQuery("tablet")]: {
      vars: {
        [gutterWidth]: "48px",
        [popoutGutterWidth]: "24px",
      },
    },
    [minMediaQuery("desktop")]: {
      vars: {
        [gutterWidth]: "64px",
        [popoutGutterWidth]: "32px",
      },
    },
  },
});

export const size = {
  px: "1px",
  full: "100%",
  half: "50%",
  0: 0,
  4: "4px",
  8: "8px",
  16: "16px",
  24: "24px",
  32: "32px",
  40: "40px",
  48: "48px",
  64: "64px",
  80: "80px",
  96: "96px",
  112: "112px",
  128: "128px",
  144: "144px",
  256: "256px",
  320: "320px",
  384: "384px",
  512: "512px",
};

export const HEADER_HEIGHT = 128;

export const GUTTER = "clamp(20px, 4vw, 64px)";

export const GRID = {
  GUTTER: `minmax(${gutterWidth}, 1fr)`,
};

export const STILL_WIDTH = "960px";
export const POSTER_WIDTH = "248px";
export const PROSE_CONTENT_WIDTH = "33rem";

export const POPOUT_WIDTH = `calc((${popoutGutterWidth} * 2) + 33rem)`;
export const PROSE_CONTENT_WIDTH_WITH_GUTTERS = `calc((${gutterWidth} * 2) + 33rem)`;
export const MAX_CONTENT_WIDTH_WITH_GUTTERS = `calc((${GUTTER} * 2) + ${STILL_WIDTH})`;
export const QUAD_POSTER = "1088px";

function toRem(px: number) {
  return `${px / 16}rem`;
}

export const relativeSize = {
  0: 0,
  8: toRem(8),
  14: toRem(14),
  16: toRem(16),
  18: toRem(18),
  19: toRem(19),
  20: toRem(20),
  25: toRem(25),
  26: toRem(26),
};
