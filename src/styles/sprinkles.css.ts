import { createSprinkles, defineProperties } from "@vanilla-extract/sprinkles";
import { minMediaQuery } from "./breakpoints";
import { backgroundColors, borderColors, foregroundColors } from "./colors.css";
import {
  gutterWidth,
  popoutGutterWidth,
  POPOUT_WIDTH,
  POSTER_WIDTH,
  PROSE_CONTENT_WIDTH,
  PROSE_CONTENT_WIDTH_WITH_GUTTERS,
  relativeSize,
  size,
} from "./sizes.css";
import {
  fontSizes,
  fontWeights,
  letterSpacing,
  lineHeights,
} from "./typography.css";

const unresponsiveAtomicProperties = defineProperties({
  properties: {
    fontSize: {
      ...relativeSize,
      ...fontSizes,
      label: {
        fontSize: "0.875rem",
        lineHeight: 1,
      },
      xSmall: {
        fontSize: "0.75rem",
        lineHeight: 1,
      },
      legend: {
        fontSize: "1.125rem",
        lineHeight: "1.5rem",
      },
      groupHeading: {
        fontSize: "1.125rem",
        lineHeight: "1.5rem",
      },
      posterTitle: {
        fontSize: "1.1875rem",
        lineHeight: "1.5rem",

        "@media": {
          [minMediaQuery("tablet")]: {
            fontSize: "1rem",
            lineHeight: "1.25rem",
          },
        },
      },
      posterYear: {
        fontSize: ".75rem",
        lineHeight: 1,

        "@media": {
          [minMediaQuery("tablet")]: {
            fontSize: "0.75rem",
          },
        },
      },
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
      yearNavigation: {
        fontSize: "1.125rem",
        lineHeight: "1.5rem",
      },
      statNumber: {
        fontSize: "2rem",
        lineHeight: 1,
      },
      homePageTitle: {
        fontSize: "1.625rem",
        lineHeight: "2rem",
      },
      statHeading: {
        fontSize: "1.125rem",
        lineHeight: "1.5rem",
      },
      pagination: {
        fontSize: "1.25rem",
        lineHeight: "1.5rem",
      },
      reviewSubHeading: {
        fontSize: "1.1875rem",
        lineHeight: "2.5rem",
      },
      relatedMovieTitle: {
        fontSize: "1.1875rem",
        lineHeight: "1.5rem",
      },
      relatedMoviesHeader: {
        fontSize: "1.1875rem",
        lineHeight: "2.5rem",
      },
      prose: {
        fontSize: "1.1875rem",
        lineHeight: 1.5,
      },
      logo: {
        fontSize: "1.5625rem",
        lineHeight: "2rem",
      },
      creditsTitle: {
        fontSize: "1.5625rem",
        lineHeight: "2rem",
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
    columnGap: [".5ch", 8, 16, 24, 32, 64],
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
    height: {
      0: "0",
      4: "0.25rem",
      8: "0.5rem",
      16: "1rem",
      24: "1.5rem",
      32: "2rem",
      64: "4rem",
      80: "5rem",
      128: "8rem",
      144: "9rem",
    },
    justifyContent: ["space-between", "center", "flex-end", "flex-start"],
    maxWidth: {
      full: "100%",
      half: "50%",
      popout: POPOUT_WIDTH,
      prose: PROSE_CONTENT_WIDTH,
    },
    minHeight: {
      160: "160px",
      200: "200px",
      prose: PROSE_CONTENT_WIDTH,
      proseWithGutters: PROSE_CONTENT_WIDTH_WITH_GUTTERS,
      poster: POSTER_WIDTH,
      ...size,
    },
    minWidth: {
      160: "160px",
      200: "200px",
      prose: PROSE_CONTENT_WIDTH,
      proseWithGutters: PROSE_CONTENT_WIDTH_WITH_GUTTERS,
      poster: POSTER_WIDTH,
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
      "144r": "9rem",
      160: "160px",
      200: "200px",
      prose: PROSE_CONTENT_WIDTH,
      proseWithGutters: PROSE_CONTENT_WIDTH_WITH_GUTTERS,
      poster: POSTER_WIDTH,
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
