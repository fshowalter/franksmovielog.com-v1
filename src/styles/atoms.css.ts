import { createSprinkles, defineProperties } from "@vanilla-extract/sprinkles";
import { minMediaQuery } from "./breakpoints";
import { foregroundColors } from "./colors.css";
import { letterSpacing, relativeSpacing, spacing } from "./spacing";

const backgroundColor = {
  accent: "#0056b3",
  canvas: "#e9e7e0",
  default: "#fff",
  progress: "#14bd41",
  subtle: "#fafafa",
};

const fontSize = {
  "1": "0.875rem",
  "2": "1rem",
  "3": "1.5625rem",
  "4": "1.875rem",
};

export const borderWidths = {
  "0": 0,
  "1": "1px",
};

const baseProperties = defineProperties({
  properties: {
    backgroundColor: backgroundColor,
    color: foregroundColors,
    whiteSpace: ["nowrap"],
    overflow: ["hidden"],
    fontWeight: {
      light: 300,
    },
  },
});

const responsiveProperties = defineProperties({
  conditions: {
    mobile: {},
    tablet: { "@media": minMediaQuery("tablet") },
    desktop: { "@media": minMediaQuery("desktop") },
    max: { "@media": minMediaQuery("max") },
  },
  defaultCondition: "mobile",
  responsiveArray: ["mobile", "tablet", "desktop", "max"],
  properties: {
    padding: spacing,
    fontSize: fontSize,
    lineHeight: relativeSpacing,
    display: ["flex", "block"],
    alignItems: ["stretch"],
    flexGrow: [1, "unset"],
    flexDirection: ["row", "column"],
    columnGap: spacing,
    rowGap: spacing,
    flexWrap: ["wrap"],
    justifyContent: ["center", "flex-start"],
    letterSpacing: letterSpacing,
    paddingLeft: spacing,
    paddingRight: spacing,
    position: ["relative"],
  },
  shorthands: {
    paddingX: [`paddingLeft`, `paddingRight`],
  },
});

export const atoms = createSprinkles(baseProperties, responsiveProperties);
