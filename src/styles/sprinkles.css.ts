import { createSprinkles, defineProperties } from "@vanilla-extract/sprinkles";
import { atomicProperties } from "./atomicProperties";
import { minMediaQuery } from "./breakpoints";
import {
  GUTTER,
  MAX_POSTER_WIDTH,
  PROSE_CONTENT_WIDTH,
  PROSE_CONTENT_WIDTH_WITH_GUTTERS,
  size,
} from "./sizes";

const unresponsiveAtomicProperties = defineProperties({
  properties: atomicProperties,
});

const responsiveAtomicProperties = defineProperties({
  defaultCondition: `default`,
  conditions: {
    default: {},
    desktop: {
      "@media": minMediaQuery("desktop"),
    },
  },
  properties: {
    display: [
      "block",
      "none",
      "flex",
      "inline-flex",
      "inline-block",
      "contents",
    ],
    flexDirection: ["row", "column"],
    height: {
      160: "160px",
      200: "200px",
      prose: PROSE_CONTENT_WIDTH,
      proseWithGutters: PROSE_CONTENT_WIDTH_WITH_GUTTERS,
      poster: MAX_POSTER_WIDTH,
      ...size,
    },
    maxWidth: {
      160: "160px",
      200: "200px",
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
    paddingBottom: [0, 8, 24, 32, 40, 48, 128],
    paddingLeft: {
      ...size,
      gutter: GUTTER,
    },
    paddingRight: {
      ...size,
      gutter: GUTTER,
    },
    paddingTop: [0, 8, 16, 24, 32, 40, 48, 128],
    position: ["relative", "sticky"],
    top: size,
    width: {
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
