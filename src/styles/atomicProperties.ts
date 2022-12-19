import { minMediaQuery } from "./breakpoints";
import { foregroundColors } from "./colors.css";
import { relativeSize, size } from "./sizes.css";
import {
  fontSizes,
  fontWeights,
  letterSpacing,
  lineHeights,
} from "./typography.css";

export const atomicProperties = {
  color: foregroundColors,
  padding: size,
  whiteSpace: ["nowrap"],
  overflow: ["hidden"],
  flex: [1],
  flexGrow: [1],

  fontStyle: ["italic"],
  justifyItems: ["center", "inherit"],

  marginTop: [48, 64, 128],
  marginLeft: ["auto"],
  fontWeight: fontWeights,
  transform: {
    safariBorderRadiusFix: {
      transform: "translateZ(0)",
    },
  },
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
  letterSpacing: letterSpacing,
  textDecoration: ["none"],
  border: [0],
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
  backgroundRepeat: ["repeat-x", "repeat"],
  backgroundPositionY: [16],

  textAlign: ["left", "right", "center", "inherit"],
  textUnderlinePosition: ["under"],
  // columnGap: [".5ch", 8, 16, 24, 32, 40, 64],
  flexBasis: { ...size, 352: "352px" },
  flexShrink: [0],
  zIndex: [100, 500, 1000],
  alignSelf: ["end"],
  textTransform: ["uppercase"],
} as const;
