import { style, styleVariants } from "@vanilla-extract/css";
import { minMediaQuery } from "../../styles/breakpoints";
import { backgroundColors } from "../../styles/colors.css";
import { GUTTER, MAX_POSTER_WIDTH, size } from "../../styles/sizes";
import { gridTemplate, SPACER } from "../../utils/gridTemplate";

export const gradeStyle = style({
  height: "24px",
  width: "auto",
  padding: "3px 0",
});

export const stillStyle = style({
  borderRadius: "8px",
  overflow: "hidden",
  maxWidth: MAX_POSTER_WIDTH,
  display: "block",
});

export const movieListStyle = style({
  padding: 0,
  "@media": {
    [minMediaQuery("desktop")]: {
      display: "grid",
      gridTemplateColumns: "repeat(4,1fr)",
      columnGap: size[24],
    },
  },
});

export const gridStyle = style({
  display: "grid",
  ...gridTemplate<GridAreas, 3>({
    rows: [
      [SPACER, "heading", SPACER],
      ["list", "list", "list"],
    ],
    columns: [GUTTER, "auto", GUTTER],
  }),
  "@media": {
    [minMediaQuery("desktop")]: {
      padding: `0 ${GUTTER}`,
      ...gridTemplate<GridAreas, 1>({
        rows: [
          { [size[8]]: SPACER },
          ["heading"],
          { [size[8]]: SPACER },
          ["list"],
        ],
        columns: ["auto"],
      }),
      selectors: {
        "&:nth-child(odd)": {
          backgroundColor: backgroundColors.subtle,
        },
      },
    },
  },
});

const gridAreaStyles = {
  heading: {
    gridArea: "heading",
  },
  list: {
    gridArea: "list",
  },
};

export type GridAreas = "heading" | "list";

export const gridAreas = styleVariants(gridAreaStyles);

export const listItemGridStyle = style({
  display: "grid",
  ...gridTemplate<ListItemGridAreas, 5>({
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
    [minMediaQuery("desktop")]: {
      ...gridTemplate<ListItemGridAreas, 1>({
        rows: [
          { [size[16]]: SPACER },
          ["still"],
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
  },
});

const listItemGridAreaStyles = {
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

export type ListItemGridAreas = "title" | "grade" | "still";

export const listItemGridAreas = styleVariants(listItemGridAreaStyles);
