import { globalStyle, style, styleVariants } from "@vanilla-extract/css";
import { minMediaQuery } from "../../styles/breakpoints";
import { borderColors, foregroundColors } from "../../styles/colors.css";
import { SPACER, gridTemplate } from "../../styles/grid";
import { relativeSize, size } from "../../styles/sizes.css";

export const stillBorderStyle = style({
  border: `solid 8px ${borderColors.default}`,
  marginBottom: "4.57px",
});

export const excerptContinueReadingLinkStyle = style({
  color: foregroundColors.muted,
  fontSize: relativeSize[18],
  lineHeight: 1.5,
  letterSpacing: "0.3px",
});

export const dateLetterSpacingStyle = style({
  letterSpacing: "0.046875rem",
});

globalStyle(`${excerptContinueReadingLinkStyle} a[data-continue-reading]`, {
  fontSize: relativeSize[14],
  lineHeight: 1,
  textTransform: "uppercase",
  whiteSpace: "nowrap",
});

export const gridStyle = style({
  display: "grid",
  margin: "0 auto",
  ...gridTemplate<GridAreas, 1>({
    rows: [
      { [size[40]]: SPACER },
      ["date"],
      { [size[24]]: SPACER },
      ["still"],
      { [size[16]]: SPACER },
      { "1fr": ["excerpt"] },
      { [size[40]]: SPACER },
    ],
    columns: ["auto"],
  }),
  "@media": {
    [minMediaQuery("desktop")]: {
      width: "100%",
      ...gridTemplate<GridAreas, 3>({
        rows: [
          { [size[40]]: SPACER },
          ["date", SPACER, "still"],
          { "1fr": ["excerpt", SPACER, "still"] },
          { [size[40]]: SPACER },
        ],
        columns: ["auto", "minmax(64px, 1fr)", "auto"],
      }),
    },
    [minMediaQuery("max")]: {
      width: "100%",
      ...gridTemplate<GridAreas, 5>({
        rows: [
          { [size[40]]: SPACER },
          ["date", SPACER, "excerpt", SPACER, "still"],
          { "1fr": [SPACER, SPACER, "excerpt", SPACER, "still"] },
          { [size[40]]: SPACER },
        ],
        columns: [
          "auto",
          "minmax(64px, 1fr)",
          "auto",
          "minmax(64px, 1fr)",
          "auto",
        ],
      }),
    },
  },
});

const gridAreaStyles = {
  still: {
    gridArea: "still",
  },
  excerpt: {
    gridArea: "excerpt",
    maxWidth: "33rem",
  },
  date: {
    gridArea: "date",
    textAlign: "center" as const,
    "@media": {
      [minMediaQuery("desktop")]: {
        textAlign: "left" as const,
        paddingBottom: "24px",
        lineHeight: "2rem",
      },
    },
  },
};

export type GridAreas = "still" | "excerpt" | "date";

export const gridAreas = styleVariants(gridAreaStyles);
