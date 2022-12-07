import { style, styleVariants } from "@vanilla-extract/css";
import { borderColors } from "../../styles/colors.css";
import { GRID, MAX_CONTENT_WIDTH_WITH_GUTTERS } from "../../styles/sizes";
import { gridTemplate, SPACER } from "../../utils/gridTemplate";

export const gridStyle = style({
  display: "grid",
  boxShadow: `0px -1px ${borderColors.default}`,
  maxWidth: MAX_CONTENT_WIDTH_WITH_GUTTERS,
  margin: "0 auto",
  ...gridTemplate<GridAreas, 3>({
    rows: [
      [SPACER, "list", SPACER],
      [SPACER, "pagination", SPACER],
    ],
    columns: [GRID.GUTTER, "auto", GRID.GUTTER],
  }),
});

const gridAreaStyles = {
  list: {
    gridArea: "list",
  },
  pagination: {
    gridArea: "pagination",
  },
};

export type GridAreas = "list" | "pagination";

export const gridAreas = styleVariants(gridAreaStyles);
