import { createSprinkles, defineProperties } from "@vanilla-extract/sprinkles";
import { minMediaQuery } from "./breakpoints";
import { backgroundColors, borderColors, foregroundColors } from "./colors.css";
import { height, relativeSize, size, width } from "./sizes.css";
import { fontWeights, letterSpacing, lineHeights } from "./typography.css";

const unresponsiveAtomicProperties = defineProperties({
  properties: {
    fontSize: {
      ...relativeSize,
      posterSlug: {
        fontSize: ".875rem",
        lineHeight: "1rem",

        "@media": {
          [minMediaQuery("tablet")]: {
            fontSize: "0.75rem",
            lineHeight: "1rem",
          },
        },
      },
      xSmall: {
        fontSize: "0.75rem",
        lineHeight: 1,
      },
      small: {
        fontSize: "0.875rem",
        lineHeight: 1,
      },
      default: {
        fontSize: "1rem",
        lineHeight: "1.5rem",
      },
      medium: {
        fontSize: "1.1875rem",
        lineHeight: "1.5rem",

        "@media": {
          [minMediaQuery("desktop")]: {
            fontSize: "1.25rem",
          },
        },
      },
      large: {
        fontSize: "1.625rem",
        lineHeight: "2rem",

        "@media": {
          [minMediaQuery("desktop")]: {
            fontSize: "1.875rem",
          },
        },
      },
      xLarge: {
        fontSize: "2rem",
        lineHeight: 1,
      },
      pageTitle: {
        fontSize: "2rem",
        fontWeight: "normal",
        lineHeight: 1,

        "@media": {
          [minMediaQuery("desktop")]: {
            fontSize: "2.25rem",
          },
        },
      },
    },
    lineHeight: lineHeights,
    backgroundImage: {
      ripNotComingSoon: {
        backgroundImage: `url("/assets/ripnotcomingsoon.jpg")`,
        "@media": {
          "(prefers-color-scheme: dark)": {
            filter: "brightness(0.8) contrast(1.2)",
          },
        },
      },
    },
    borderRadius: { half: "50%", 4: "4px", 8: "8px", 24: "24px" },
    color: foregroundColors,
    flex: [1],
    flexBasis: { 352: "352px" },
    flexGrow: [1],
    flexShrink: [0],
    fontWeight: fontWeights,
    justifyItems: ["center", "inherit"],
    letterSpacing: letterSpacing,
    overflow: ["hidden"],
    textAlign: ["left", "right", "center", "inherit"],
    textTransform: ["uppercase"],
    textUnderlinePosition: ["under"],
    transform: {
      safariBorderRadiusFix: {
        transform: "translateZ(0)",
      },
    },
    whiteSpace: ["nowrap"],
    zIndex: [100, 500, 1000],
  },
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
    boxShadow: {
      unset: "unset",
      borderBottom: {
        boxShadow: `0px 1px ${borderColors.default}`,
      },
      borderAll: {
        boxShadow: `0 0 0 1px ${borderColors.default}`,
      },
    },
    columnGap: width,
    display: [
      "block",
      "none",
      "flex",
      "inline",
      "inline-flex",
      "inline-block",
      "contents",
    ],
    flexDirection: ["row", "column"],
    flexWrap: ["wrap", "nowrap"],
    height: height,
    justifyContent: ["space-between", "center", "flex-end", "flex-start"],
    maxWidth: width,
    minHeight: height,
    minWidth: width,
    paddingBottom: height,
    paddingLeft: width,
    paddingRight: width,
    paddingTop: height,
    position: ["relative", "sticky"],
    rowGap: height,
    top: size,
    width: width,
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
