import { style, styleVariants } from "@vanilla-extract/css";
import { gridTemplate, SPACER } from "../../styles/grid";
import { relativeSize, size } from "../../styles/sizes.css";

export const mediumNotesTypography = style({
  fontSize: relativeSize[14],
});

export const gridStyle = style({
  display: "grid",
  ...gridTemplate<GridAreas, 3>({
    rows: [
      { [size[16]]: SPACER },
      ["icon", SPACER, "date"],
      ["icon", SPACER, "venue"],
      { [size[16]]: SPACER },
      ["viewingNote", "viewingNote", "viewingNote"],
    ],
    columns: ["16px", "1ch", "1fr"],
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
