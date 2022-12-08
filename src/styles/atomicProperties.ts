import { backgroundColors, borderColors, foregroundColors } from "./colors.css";
import {
  GUTTER,
  MAX_POSTER_WIDTH,
  PROSE_CONTENT_WIDTH,
  PROSE_CONTENT_WIDTH_WITH_GUTTERS,
  relativeSize,
  size,
} from "./sizes";
import { fontWeights, letterSpacing, lineHeights } from "./typography.css";

export const atomicProperties = {
  display: ["block", "none", "flex", "inline-flex", "inline-block"],
  position: ["relative"],
  backgroundColor: {
    ...backgroundColors,
    zebra: {
      selectors: {
        "&:nth-child(even)": {
          backgroundColor: backgroundColors.subtle,
        },
      },
    },
  },
  color: foregroundColors,
  padding: size,
  whiteSpace: ["nowrap"],
  overflow: ["hidden"],
  flex: [1],
  flexGrow: [1],
  flexWrap: ["wrap"],
  fontStyle: ["italic"],
  justifyItems: ["center", "inherit"],
  alignItems: ["center", "inherit", "flex-start"],
  rowGap: [8, 16, 24, 32, 48, 64, 96],
  minHeight: {
    16: "16px",
  },
  marginTop: [48, 64, 128],
  fontWeight: fontWeights,
  fontSize: relativeSize,
  lineHeight: lineHeights,
  letterSpacing: letterSpacing,
  textDecoration: ["none"],
  paddingLeft: {
    gutter: GUTTER,
  },
  paddingRight: {
    gutter: GUTTER,
  },
  maxWidth: {
    prose: PROSE_CONTENT_WIDTH,
    proseWithGutters: PROSE_CONTENT_WIDTH_WITH_GUTTERS,
    poster: MAX_POSTER_WIDTH,
  },
  width: {
    px: "1px",
    full: "100%",
  },
  boxShadow: {
    borderBottom: {
      boxShadow: `0px 1px ${borderColors.default}`,
    },
  },
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
} as const;
