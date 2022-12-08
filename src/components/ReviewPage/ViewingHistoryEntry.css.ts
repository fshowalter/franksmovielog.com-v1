import { style, styleVariants } from "@vanilla-extract/css";
import { GRID, size } from "../../styles/sizes";
import { gridTemplate, SPACER } from "../../utils/gridTemplate";

export const gridStyle = style({
  display: "grid",
  ...gridTemplate<GridAreas, 9>({
    rows: [
      { [size[16]]: SPACER },
      [
        SPACER,
        "icon",
        SPACER,
        "date",
        SPACER,
        "medium",
        SPACER,
        "mediumNotes",
        SPACER,
      ],
      [
        SPACER,
        "icon",
        SPACER,
        "venue",
        "venue",
        "venue",
        "venue",
        "venue",
        SPACER,
      ],
      { [size[16]]: SPACER },
      [
        SPACER,
        SPACER,
        SPACER,
        "viewingNote",
        "viewingNote",
        "viewingNote",
        "viewingNote",
        "viewingNote",
        SPACER,
      ],
    ],
    columns: [
      GRID.GUTTER,
      "16px",
      "1ch",
      "auto",
      ".75ch",
      "auto",
      ".5ch",
      "10fr",
      GRID.GUTTER,
    ],
  }),
});

const gridAreaStyles = {
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

export type GridAreas =
  | "icon"
  | "date"
  | "medium"
  | "mediumNotes"
  | "venue"
  | "viewingNote";

export const gridAreas = styleVariants(gridAreaStyles);
