import { style, styleVariants } from "@vanilla-extract/css";
import { GRID, GUTTER, size } from "../../styles/sizes";
import { gridTemplate, SPACER } from "../../utils/gridTemplate";

export const gridStyle = style({
  display: "grid",
  ...gridTemplate<GridAreas, 3>({
    rows: [
      [SPACER, "heading", SPACER],
      ["list", "list", "list"],
    ],
    columns: [GUTTER, `1fr`, GUTTER],
  }),
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
      { [size[16]]: SPACER },
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
      { [size[16]]: SPACER },
      [
        SPACER,
        SPACER,
        SPACER,
        "viewingNote",
        "viewingNote",
        "viewingNote",
        SPACER,
      ],
    ],
    columns: [GRID.GUTTER, "16px", "1ch", "auto", ".5ch", "10fr", GRID.GUTTER],
  }),
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
