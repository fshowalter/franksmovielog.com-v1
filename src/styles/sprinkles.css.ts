import { createSprinkles, defineProperties } from "@vanilla-extract/sprinkles";
import { minMediaQuery } from "./breakpoints";
import { backgroundColors, borderColors, foregroundColors } from "./colors.css";
import { height, size, width } from "./sizes.css";

const unresponsiveAtomicProperties = defineProperties({
  properties: {
    alignSelf: ["flex-start"],
    borderRadius: { half: "50%", 4: "4px", 8: "8px", 12: "12px", 24: "24px" },
    color: foregroundColors,
    flex: [1],
    flexBasis: { 352: "352px", 360: "424px", full: "100% !important" },
    flexGrow: [1],
    flexShrink: [0],
    fontSize: {
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
        fontSize: "1.125rem",
        lineHeight: "1.5rem",
      },
      medium2: {
        fontSize: "1.5rem",
        lineHeight: "2.25rem",
      },
      large: {
        fontSize: "1.625rem",
        lineHeight: "2rem",
      },
      xLarge: {
        fontSize: "2rem",
        lineHeight: 1,
      },
    },
    fontWeight: {
      light: 300,
      normal: 400,
      semiBold: 600,
      bold: 700,
    },
    justifyItems: ["center", "inherit"],
    letterSpacing: {
      0.25: "0.015625rem",
      0.5: "0.03125rem",
      0.75: "0.046875rem",
    },
    lineHeight: {
      1: 1,
      default: 1.5,
      16: "1rem",
      24: "1.5rem",
      32: "2rem",
      36: "2.25rem",
      40: "2.5rem",
      48: "3rem",
    },
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
    alignItems: ["center", "inherit", "flex-start", "baseline", "stretch"],
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
  responsiveAtomicProperties,
);

export type Sprinkles = Parameters<typeof sprinkles>[0];
