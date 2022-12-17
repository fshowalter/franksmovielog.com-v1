import { createSprinkles, defineProperties } from "@vanilla-extract/sprinkles";
import { atomicProperties } from "./atomicProperties";
import { minMediaQuery } from "./breakpoints";
import { backgroundColors, borderColors } from "./colors.css";
import {
  gutterWidth,
  MAX_POSTER_WIDTH,
  popoutGutterWidth,
  POPOUT_WIDTH,
  PROSE_CONTENT_WIDTH,
  PROSE_CONTENT_WIDTH_WITH_GUTTERS,
  size,
} from "./sizes.css";

const unresponsiveAtomicProperties = defineProperties({
  properties: atomicProperties,
});

const responsiveAtomicProperties = defineProperties({
  defaultCondition: `default`,
  conditions: {
    default: {},
    tablet: {
      "@media": minMediaQuery("tablet"),
    },
    desktop: {
      "@media": minMediaQuery("desktop"),
    },
  },
  properties: {
    alignItems: ["center", "inherit", "flex-start", "baseline"],
    backgroundColor: {
      ...backgroundColors,
      zebra: {
        selectors: {
          "&:nth-child(even)": {
            backgroundColor: backgroundColors.subtle,
          },
        },
      },
      zebraOdd: {
        selectors: {
          "&:nth-child(odd)": {
            backgroundColor: backgroundColors.subtle,
          },
        },
      },
      zebraOff: {
        selectors: {
          "&:nth-child(odd)": {
            backgroundColor: "inherit",
          },
          "&:nth-child(even)": {
            backgroundColor: "inherit",
          },
        },
      },
    },
    borderRadius: size,
    boxShadow: {
      unset: "unset",
      borderBottom: {
        boxShadow: `0px 1px ${borderColors.default}`,
      },
      borderAll: {
        boxShadow: `0 0 0 1px ${borderColors.default}`,
      },
    },
    columnGap: [".5ch", 8, 16, 24, 32, 40, 64],
    display: [
      "block",
      "none",
      "flex",
      "inline-flex",
      "inline-block",
      "contents",
    ],
    flexDirection: ["row", "column"],
    flexWrap: ["wrap", "nowrap"],
    height: {
      160: "160px",
      200: "200px",
      prose: PROSE_CONTENT_WIDTH,
      proseWithGutters: PROSE_CONTENT_WIDTH_WITH_GUTTERS,
      poster: MAX_POSTER_WIDTH,
      ...size,
    },
    justifyContent: ["space-between", "center", "flex-end", "flex-start"],
    maxWidth: {
      160: "160px",
      200: "200px",
      popout: POPOUT_WIDTH,
      prose: PROSE_CONTENT_WIDTH,
      proseWithGutters: PROSE_CONTENT_WIDTH_WITH_GUTTERS,
      poster: MAX_POSTER_WIDTH,
      ...size,
    },
    minHeight: {
      160: "160px",
      200: "200px",
      prose: PROSE_CONTENT_WIDTH,
      proseWithGutters: PROSE_CONTENT_WIDTH_WITH_GUTTERS,
      poster: MAX_POSTER_WIDTH,
      ...size,
    },
    minWidth: {
      160: "160px",
      200: "200px",
      prose: PROSE_CONTENT_WIDTH,
      proseWithGutters: PROSE_CONTENT_WIDTH_WITH_GUTTERS,
      poster: MAX_POSTER_WIDTH,
      ...size,
    },
    paddingBottom: [0, 8, 16, 24, 32, 40, 48, 128],
    paddingLeft: {
      ...size,
      gutter: gutterWidth,
      popoutGutter: popoutGutterWidth,
    },
    paddingRight: {
      ...size,
      gutter: gutterWidth,
      popoutGutter: popoutGutterWidth,
    },
    paddingTop: [0, 8, 16, 24, 32, 40, 48, 128],
    position: ["relative", "sticky"],
    rowGap: [0, 4, 8, 16, 24, 32, 48, 64, 96],
    top: size,
    width: {
      unset: "unset",
      160: "160px",
      200: "200px",
      prose: PROSE_CONTENT_WIDTH,
      proseWithGutters: PROSE_CONTENT_WIDTH_WITH_GUTTERS,
      poster: MAX_POSTER_WIDTH,
      ...size,
    },
  },
  shorthands: {
    paddingX: [`paddingLeft`, `paddingRight`],
    paddingY: [`paddingTop`, `paddingBottom`],
  },
});

export const sprinkles = createSprinkles(
  unresponsiveAtomicProperties,
  responsiveAtomicProperties
);

export type Sprinkles = Parameters<typeof sprinkles>[0];
