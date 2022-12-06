import { style, styleVariants } from "@vanilla-extract/css";
import { minMediaQuery } from "../../styles/breakpoints";
import { GUTTER, space } from "../../styles/spacing";
import { gridTemplate, SPACER } from "../../utils/gridTemplate";

export const gradeStyle = style({
  height: "24px",
  width: "auto",
  padding: "3px 0",
});

export const stillStyle = style({
  borderRadius: "8px",
  overflow: "hidden",
  maxWidth: "224px",
});

export const gridStyle = style({
  display: "grid",
  ...gridTemplate<GridAreas, 3>({
    rows: [
      [SPACER, "heading", SPACER],
      ["list", "list", "list"],
    ],
    columns: [GUTTER, "calc(100% - 40px)", GUTTER],
  }),
  "@media": {
    [minMediaQuery("desktop")]: {
      ...gridTemplate<GridAreas, 3>({
        rows: [
          [SPACER, "heading", SPACER],
          ["list", "list", "list"],
        ],
        columns: [GUTTER, "calc(100% - 40px)", GUTTER],
      }),
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
      { [space[24]]: SPACER },
      [SPACER, "title", SPACER, "still", SPACER],
      [SPACER, "grade", SPACER, "still", SPACER],
      { [space[24]]: SPACER },
    ],
    columns: [GUTTER, "8fr", "24px", "8fr", GUTTER],
  }),
  "@media": {
    [minMediaQuery("desktop")]: {
      ...gridTemplate<ListItemGridAreas, 4>({
        rows: [
          { [space[24]]: SPACER },
          [SPACER, "title", "still", SPACER],
          [SPACER, "grade", "still", SPACER],
          { [space[24]]: SPACER },
        ],
        columns: [GUTTER, "auto", "auto", GUTTER],
      }),
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
