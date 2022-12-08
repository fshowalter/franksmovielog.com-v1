import { createSprinkles, defineProperties } from "@vanilla-extract/sprinkles";
import { atomicProperties } from "./atomicProperties";
import { minMediaQuery } from "./breakpoints";

const unresponsiveAtomicProperties = defineProperties({
  properties: atomicProperties,
  shorthands: {
    paddingX: [`paddingLeft`, `paddingRight`],
  },
});

const responsiveAtomicProperties = defineProperties({
  defaultCondition: `mobile`,
  conditions: {
    mobile: {},
    desktop: {
      "@media": minMediaQuery("desktop"),
    },
  },
  properties: {
    flexDirection: ["row", "column", "row-reverse"],
    justifyContent: ["space-between", "center", "flex-end"],
    textAlign: ["left", "center", "inherit"],
    paddingTop: [8, 24, 32, 40, 48, 128],
    paddingBottom: [8, 24, 32, 40, 48, 128],
    columnGap: [".5ch", 24, 32, 64],
  },
  shorthands: {
    paddingY: [`paddingTop`, `paddingBottom`],
  },
});

export const sprinkles = createSprinkles(
  unresponsiveAtomicProperties,
  responsiveAtomicProperties
);

export type Sprinkles = Parameters<typeof sprinkles>[0];
