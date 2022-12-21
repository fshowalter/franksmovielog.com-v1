import { globalStyle, style, styleVariants } from "@vanilla-extract/css";
import { minMediaQuery } from "../../styles/breakpoints";
import { borderColors, foregroundColors } from "../../styles/colors.css";
import { gridTemplate, SPACER } from "../../styles/grid";
import { relativeSize, size } from "../../styles/sizes.css";

export const stillBorderStyle = style({
  border: `solid 8px ${borderColors.default}`,
  marginBottom: "4.57px",
});

export const excerptContinueReadingLinkStyle = style({
  color: foregroundColors.muted,
  fontSize: relativeSize[18],
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
      ["still"],
      { [size[16]]: SPACER },
      { "1fr": ["excerpt"] },
      { [size[24]]: SPACER },
      ["date"],
      { [size[40]]: SPACER },
    ],
    columns: ["auto"],
  }),
  "@media": {
    [minMediaQuery("desktop")]: {
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
  },
  date: {
    gridArea: "date",
  },
};

export type GridAreas = "still" | "excerpt" | "date";

export const gridAreas = styleVariants(gridAreaStyles);
