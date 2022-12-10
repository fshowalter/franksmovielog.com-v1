import { style, styleVariants } from "@vanilla-extract/css";
import { minMediaQuery } from "../../styles/breakpoints";
import { backgroundColors, foregroundColors } from "../../styles/colors.css";
import { MAX_POSTER_WIDTH, size } from "../../styles/sizes";
import { gridTemplate, SPACER } from "../../utils/gridTemplate";

export const posterStyle = style({
  maxWidth: MAX_POSTER_WIDTH,
  borderRadius: size[8],
});

export const backToTopContainerStyle = style({
  alignItems: "center",
  backfaceVisibility: "hidden",
  backgroundColor: "rgb(0 0 0 / 15%)",
  borderRadius: "100px 0 0",
  bottom: 0,
  color: "rgb(255 255 255)",
  cursor: "pointer",
  display: "flex",
  justifyContent: "center",
  marginBottom: 0,
  marginRight: 0,
  padding: "18.6667px 4.6667px 4.6667px 18.6667px",
  position: "absolute",
  right: 0,

  selectors: {
    "&::before": {
      backgroundColor: "rgb(255 255 255)",
      borderRadius: "inherit",
      content: " ",
      inset: 0,
      opacity: 0,
      pointerEvents: "none",
      position: "absolute",
      zIndex: 1,
    },

    "&::after": {
      borderRadius: "inherit",
      content: " ",
      inset: 0,
      pointerEvents: "none",
      position: "absolute",
      zIndex: 1,
    },
  },
});

export const backToTopInnerStyle = style({
  alignItems: "center",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
});

export const backToTopArrowStyle = style({
  alignItems: "center",
  display: "flex",
  fill: foregroundColors.default,
  height: "31.5px",
  justifyContent: "center",
  transition: "all 0.3s ease 0s",
  width: "31.5px",
  zIndex: 2,
});

export const gridStyle = style({
  display: "grid",
  backgroundColor: backgroundColors.subtle,
  ...gridTemplate<GridAreas, 3>({
    rows: [
      ["poster", SPACER, "meta"],
      { [size[24]]: SPACER },
      ["watchlistLinks", "watchlistLinks", "backToTop"],
    ],
    columns: ["1fr", size[24], "1fr"],
  }),
  "@media": {
    [minMediaQuery("desktop")]: {
      ...gridTemplate<GridAreas, 3>({
        rows: [
          ["poster", SPACER, "meta"],
          { [size[24]]: SPACER },
          ["watchlistLinks", "watchlistLinks", "backToTop"],
        ],
        columns: ["1fr", size[32], "1fr"],
      }),
    },
  },
});

const gridAreaStyles = {
  poster: {
    gridArea: "poster",
  },
  meta: {
    gridArea: "meta",
  },
  watchlistLinks: {
    gridArea: "watchlistLinks",
  },
  backToTop: {
    gridArea: "backToTop",
  },
};

export type GridAreas = "poster" | "meta" | "watchlistLinks" | "backToTop";

export const gridAreas = styleVariants(gridAreaStyles);
