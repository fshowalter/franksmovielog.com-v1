import { style, styleVariants } from "@vanilla-extract/css";
import { minMediaQuery } from "../../styles/breakpoints";
import { borderColors } from "../../styles/colors.css";
import { space } from "../../styles/spacing";
import { gridTemplate, SPACER } from "../../utils/gridTemplate";

export const gridStyle = style({
  display: "grid",
  boxShadow: `0px -1px ${borderColors.default}`,
  ...gridTemplate<GridAreas, 1>({
    rows: [
      { [space[24]]: SPACER },
      ["title"],
      ["originalTitle"],
      { [space[16]]: SPACER },
      ["details"],
      { [space[24]]: SPACER },
    ],
    columns: ["auto"],
  }),
  "@media": {
    [minMediaQuery("desktop")]: {
      ...gridTemplate<GridAreas, 1>({
        rows: [
          { [space[24]]: SPACER },
          ["title"],
          ["originalTitle"],
          { [space[16]]: SPACER },
          ["details"],
          { [space[24]]: SPACER },
        ],
        columns: ["auto"],
      }),
      boxShadow: "none",
    },
  },
});

const gridAreaStyles = {
  title: {
    gridArea: "title",
  },
  originalTitle: {
    gridArea: "originalTitle",
  },
  details: {
    gridArea: "details",
  },
};

export type GridAreas = "title" | "originalTitle" | "details";

export const gridAreas = styleVariants(gridAreaStyles);
