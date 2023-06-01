import { createVar, globalStyle } from "@vanilla-extract/css";
import { minMediaQuery } from "./breakpoints";

export const pageMarginWidth = createVar();
export const gutterWidth = createVar();

globalStyle(":root", {
  vars: {
    [gutterWidth]: "20px",
    [pageMarginWidth]: "20px",
  },
  "@media": {
    [minMediaQuery("tablet")]: {
      vars: {
        [gutterWidth]: "24px",
        [pageMarginWidth]: "48px",
      },
    },
    [minMediaQuery("desktop")]: {
      vars: {
        [gutterWidth]: "32px",
        [pageMarginWidth]: "64px",
      },
    },
  },
});

export const HEADER_HEIGHT = 128;

export const STILL_WIDTH = "960px";
export const POSTER_WIDTH = "248px";
export const PROSE_CONTENT_WIDTH = "36rem";
export const SHORT_FORM_CONTENT_WIDTH = "20rem";
export const POPOUT_WIDTH = `calc((${gutterWidth} * 2) + ${PROSE_CONTENT_WIDTH})`;

function toRem(px: number) {
  return `${px / 16}rem`;
}

export const relativeSize = {
  14: toRem(14),
  18: toRem(18),
  960: toRem(960),
};

export const size = {
  0: 0,
  4: "4px",
  8: "8px",
  16: "16px",
  24: "24px",
  32: "32px",
  40: "40px",
  48: "48px",
  64: "64px",
  128: "128px",
};

export const height = {
  px: "1px",
  0: 0,
  4: toRem(4),
  8: toRem(8),
  16: toRem(16),
  24: toRem(24),
  32: toRem(32),
  40: toRem(40),
  48: toRem(48),
  64: toRem(64),
  80: toRem(80),
  96: toRem(96),
  128: toRem(128),
  144: toRem(144),
};

export const width = {
  px: "1px",
  0: 0,
  ".5ch": ".5ch",
  4: toRem(4),
  8: toRem(8),
  16: toRem(16),
  24: toRem(24),
  32: toRem(32),
  40: toRem(40),
  48: toRem(48),
  56: toRem(56),
  64: toRem(64),
  80: toRem(80),
  96: toRem(96),
  128: toRem(128),
  144: toRem(144),
  960: toRem(960),
  full: "100%",
  half: "50%",
  unset: "unset",
  popout: POPOUT_WIDTH,
  prose: PROSE_CONTENT_WIDTH,
  gutter: gutterWidth,
  pageMargin: pageMarginWidth,
  shortForm: SHORT_FORM_CONTENT_WIDTH,
};
