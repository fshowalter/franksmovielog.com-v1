import { createSprinkles, defineProperties } from "@vanilla-extract/sprinkles";
import { atomicProperties } from "./atomicProperties";
import { minMediaQuery } from "./breakpoints";
import { GUTTER, size } from "./sizes";

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
    width: size,
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
