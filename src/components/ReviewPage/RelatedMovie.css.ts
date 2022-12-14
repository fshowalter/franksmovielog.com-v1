import { style, styleVariants } from "@vanilla-extract/css";
import { minMediaQuery } from "../../styles/breakpoints";
import { backgroundColors } from "../../styles/colors.css";
import { GUTTER, MAX_POSTER_WIDTH, size } from "../../styles/sizes.css";
import { gridTemplate, SPACER } from "../../utils/gridTemplate";

export const gradeStyle = style({
  padding: "3px 0",
});

export const stillStyle = style({
  borderRadius: "8px",
  overflow: "hidden",
  maxWidth: MAX_POSTER_WIDTH,
  display: "block",
});

export const gridStyle = style({
  display: "grid",
  ...gridTemplate<GridAreas, 5>({
    rows: [
      { [size[24]]: SPACER },
      [SPACER, "title", SPACER, "still", SPACER],
      { [size[8]]: [SPACER, SPACER, SPACER, "still", SPACER] },
      [SPACER, "grade", SPACER, "still", SPACER],
      [SPACER, SPACER, SPACER, "still", SPACER],
      { [size[24]]: SPACER },
    ],
    columns: [GUTTER, " 1fr", "24px", "1fr", GUTTER],
  }),
  selectors: {
    "&:nth-child(even)": {
      backgroundColor: backgroundColors.subtle,
    },
  },
  "@media": {
    [minMediaQuery("tablet")]: {
      ...gridTemplate<GridAreas, 1>({
        rows: [
          { [size[24]]: SPACER },
          ["still"],
          { [size[8]]: SPACER },
          ["title"],
          { "1fr": ["grade"] },
          { [size[24]]: SPACER },
        ],
        columns: ["auto"],
      }),
      selectors: {
        "&:nth-child(even)": {
          backgroundColor: "unset",
        },
      },
    },
    [minMediaQuery("desktop")]: {
      ...gridTemplate<GridAreas, 1>({
        rows: [
          { [size[32]]: SPACER },
          ["still"],
          { [size[8]]: SPACER },
          ["title"],
          { "1fr": ["grade"] },
          { [size[32]]: SPACER },
        ],
        columns: ["auto"],
      }),
      selectors: {
        "&:nth-child(even)": {
          backgroundColor: "unset",
        },
      },
    },
  },
});

const gridAreaStyles = {
  title: {
    gridArea: "title",
  },
  grade: {
    gridArea: "grade",
  },
  still: {
    gridArea: "still",
  },
};

export type GridAreas = "title" | "grade" | "still";

export const gridAreas = styleVariants(gridAreaStyles);
