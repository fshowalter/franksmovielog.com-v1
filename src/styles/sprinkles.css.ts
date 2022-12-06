import { createSprinkles, defineProperties } from "@vanilla-extract/sprinkles";
import { minMediaQuery } from "./breakpoints";
import { backgroundColors, borderColors, foregroundColors } from "./colors.css";
import { space } from "./spacing";
import {
  fontSizes,
  fontWeights,
  letterSpacing,
  lineHeights,
} from "./typography.css";

export const borderWidths = {
  "0": 0,
  "1": "1px",
};

const baseProperties = defineProperties({
  properties: {
    backgroundColor: backgroundColors,
    color: foregroundColors,
    boxShadow: {
      borderBottom: `0px 1px ${borderColors.default}`,
    },
    whiteSpace: ["nowrap"],
    overflow: ["hidden"],
    fontWeight: fontWeights,
    letterSpacing: letterSpacing,
    textDecoration: ["none"],
    justifyItems: ["center"],
    maxWidth: {
      prose: "32.5rem",
    },
    backgroundImage: {
      ripNotComingSoon: {
        background: `#202020 url("/assets/ripnotcomingsoon.jpg") repeat`,
        "@media": {
          "(prefers-color-scheme: dark)": {
            filter: "brightness(0.8) contrast(1.2)",
          },
        },
      },
    },
    background: {
      zebra: {
        selectors: {
          "&:nth-child(even)": {
            backgroundColor: backgroundColors.subtle,
          },
        },
      },
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
    justifySelf: ["center", "unset"],
    padding: space,
    fontSize: fontSizes,
    lineHeight: lineHeights,
    display: ["flex", "block", "grid", "none"],
    alignItems: ["stretch", "center", "start"],
    alignSelf: ["start"],
    flexGrow: [0, 1, "unset"],
    flexDirection: ["row", "column", "row-reverse"],
    columnGap: space,
    rowGap: space,
    flexWrap: ["wrap"],
    justifyContent: ["center", "flex-start", "space-between"],
    margin: {
      center: "0 auto",
      0: "0",
    },
    flex: [1],
    paddingLeft: space,
    paddingRight: space,
    paddingTop: space,
    paddingBottom: space,
    position: ["relative", "sticky"],
    gridAutoRows: {
      48: `min-content`,
    },
    textAlign: ["center", "left"],
    border: {
      all: {
        borderWidth: `1px`,
        borderColor: borderColors.default,
        borderStyle: "solid",
        margin: `-1px`,
      },
      bottom: {
        borderBottomWidth: `1px`,
        borderBottomColor: borderColors.default,
        borderBottomStyle: "solid",
        marginBottom: `-1px`,
      },
      0: "0",
    },
    marginLeft: ["auto"],
    marginRight: ["auto"],
    top: space,
    width: space,
    minWidth: space,
    minHeight: space,
    height: space,
    flexBasis: [0],
  },
  shorthands: {
    paddingX: [`paddingLeft`, `paddingRight`],
    paddingY: [`paddingTop`, `paddingBottom`],
    marginX: [`marginLeft`, `marginRight`],
  },
});

export const sprinkles = createSprinkles(baseProperties, responsiveProperties);

export type Sprinkles = Parameters<typeof sprinkles>[0];
