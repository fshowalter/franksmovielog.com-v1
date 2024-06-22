import { style, styleVariants } from "@vanilla-extract/css";
import { SPACER, gridTemplate } from "../../styles/grid";
import { relativeSize, size } from "../../styles/sizes.css";

export const mediumNotesTypography = style({
  fontSize: relativeSize[14],
});

export const gridStyle = style({
  display: "grid",
  ...gridTemplate<GridAreas, 3>({
    rows: [
      { [size[16]]: SPACER },
      ["icon", SPACER, "slug"],
      ["icon", SPACER, "slug"],
      { [size[16]]: SPACER },
      ["notes", "notes", "notes"],
    ],
    columns: ["16px", "1ch", "1fr"],
  }),
});

const gridAreaStyles = {
  icon: {
    gridArea: "icon",
    marginTop: "4px",
  },
  slug: {
    gridArea: "slug",
  },
  notes: {
    gridArea: "notes",
  },
};

export type GridAreas = "icon" | "slug" | "notes";

export const gridAreas = styleVariants(gridAreaStyles);
