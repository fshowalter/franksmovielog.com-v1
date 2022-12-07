import { style, styleVariants } from "@vanilla-extract/css";
import { GRID, size } from "../../styles/sizes";
import { gridTemplate, SPACER } from "../../utils/gridTemplate";

export const gridStyle = style({
  display: "grid",
  ...gridTemplate<GridAreas, 3>({
    rows: [
      { [size[32]]: SPACER },
      [SPACER, "nav", SPACER],
      { [size[24]]: SPACER },
      [SPACER, "fairUse", SPACER],
      { [size[32]]: SPACER },
    ],
    columns: [GRID.GUTTER, "auto", GRID.GUTTER],
  }),
  textAlign: "center",
});

const gridAreaStyles = {
  fairUse: {
    gridArea: "fairUse",
  },
  nav: {
    gridArea: "nav",
  },
};

export type GridAreas = "nav" | "fairUse";

export const gridAreas = styleVariants(gridAreaStyles);
