import { style, styleVariants } from "@vanilla-extract/css";
import { minMediaQuery } from "../../styles/breakpoints";
import { GUTTER, space } from "../../styles/spacing";
import { gridTemplate, SPACER } from "../../utils/gridTemplate";

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
        columns: [GUTTER, "auto", GUTTER],
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
  ...gridTemplate<ListItemGridAreas, 7>({
    rows: [
      { [space[16]]: SPACER },
      [SPACER, "icon", SPACER, "date", SPACER, "medium", SPACER],
      [
        SPACER,
        "icon",
        SPACER,
        "mediumNotes",
        "mediumNotes",
        "mediumNotes",
        SPACER,
      ],
      [SPACER, "icon", SPACER, "venue", "venue", "venue", SPACER],
      { [space[16]]: SPACER },
    ],
    columns: [GUTTER, "16px", "1ch", "auto", ".5ch", "10fr", GUTTER],
  }),
  "@media": {
    [minMediaQuery("desktop")]: {
      ...gridTemplate<GridAreas, 3>({
        rows: [
          [SPACER, "heading", SPACER],
          ["list", "list", "list"],
        ],
        columns: [GUTTER, "auto", GUTTER],
      }),
    },
  },
});

const listItemGridAreaStyles = {
  icon: {
    gridArea: "icon",
    marginTop: "4px",
  },
  date: {
    gridArea: "date",
  },
  medium: {
    gridArea: "medium",
  },
  mediumNotes: {
    gridArea: "mediumNotes",
  },
  venue: {
    gridArea: "venue",
  },
  viewingNote: {
    gridArea: "viewingNote",
  },
};

export type ListItemGridAreas =
  | "icon"
  | "date"
  | "medium"
  | "mediumNotes"
  | "venue"
  | "viewingNote";

export const listItemGridAreas = styleVariants(listItemGridAreaStyles);
