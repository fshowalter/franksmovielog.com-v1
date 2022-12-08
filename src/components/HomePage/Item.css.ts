import { globalStyle, style, styleVariants } from "@vanilla-extract/css";
import { minMediaQuery } from "../../styles/breakpoints";
import { borderColors, foregroundColors } from "../../styles/colors.css";
import { GRID, relativeSize, size } from "../../styles/sizes";
import { gridTemplate, SPACER } from "../../utils/gridTemplate";

export const stillBorderStyle = style({
  border: `solid 8px ${borderColors.default}`,
});

export const excerptContinueReadingLinkStyle = style({
  color: foregroundColors.muted,
  fontSize: relativeSize[18],
});

globalStyle(`${excerptContinueReadingLinkStyle} a[data-continue-reading]`, {
  color: foregroundColors.accent,
  fontSize: relativeSize[14],
  lineHeight: 1,
  textTransform: "uppercase",
  whiteSpace: "nowrap",
  textDecoration: "none",
});

export const gridStyle = style({
  display: "grid",
  margin: "0 auto",
  ...gridTemplate<GridAreas, 3>({
    rows: [
      { [size[40]]: SPACER },
      [SPACER, "still", SPACER],
      { [size[16]]: SPACER },
      { "1fr": [SPACER, "excerpt", SPACER] },
      { [size[24]]: SPACER },
      [SPACER, "date", SPACER],
      { [size[40]]: SPACER },
    ],
    columns: [GRID.GUTTER, "auto", GRID.GUTTER],
  }),
  "@media": {
    [minMediaQuery("desktop")]: {
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
