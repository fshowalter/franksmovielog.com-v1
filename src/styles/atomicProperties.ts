import { minMediaQuery } from "./breakpoints";
import { backgroundColors, borderColors, foregroundColors } from "./colors.css";
import {
  MAX_POSTER_WIDTH,
  PROSE_CONTENT_WIDTH,
  PROSE_CONTENT_WIDTH_WITH_GUTTERS,
  relativeSize,
  size,
} from "./sizes";
import {
  fontSizes,
  fontWeights,
  letterSpacing,
  lineHeights,
} from "./typography.css";

export const atomicProperties = {
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
  },
  borderRadius: size,
  color: foregroundColors,
  padding: size,
  whiteSpace: ["nowrap"],
  overflow: ["hidden"],
  flex: [1],
  flexGrow: [1],
  flexWrap: ["wrap"],
  fontStyle: ["italic"],
  justifyItems: ["center", "inherit"],
  alignItems: ["center", "inherit", "flex-start", "baseline"],
  rowGap: [4, 8, 16, 24, 32, 48, 64, 96],
  minHeight: size,
  height: size,
  marginTop: [48, 64, 128],
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
      fontSize: "1rem",
      lineHeight: "1.25rem",
    },
    posterSlug: {
      fontSize: "0.75rem",
      lineHeight: "1rem",
    },
    yearNavigation: {
      fontSize: "1.125rem",
      lineHeight: "1.5rem",
    },
    statNumber: {
      fontSize: "2rem",
      lineHeight: 1,
    },
    statHeading: {
      fontSize: "1.125rem",
      lineHeight: "1.5rem",
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
  maxWidth: {
    160: "160px",
    200: "200px",
    512: "512px",
    prose: PROSE_CONTENT_WIDTH,
    proseWithGutters: PROSE_CONTENT_WIDTH_WITH_GUTTERS,
    poster: MAX_POSTER_WIDTH,
  },
  minWidth: size,
  boxShadow: {
    borderBottom: {
      boxShadow: `0px 1px ${borderColors.default}`,
    },
    borderAll: {
      boxShadow: `0 0 0 1px ${borderColors.default}`,
    },
  },
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
  justifyContent: ["space-between", "center", "flex-end"],
  textAlign: ["left", "right", "center", "inherit"],

  columnGap: [".5ch", 8, 16, 24, 32, 40, 64],
  flexBasis: size,
  flexShrink: [0],
  zIndex: [100],
} as const;
