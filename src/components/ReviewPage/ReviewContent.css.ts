import { style, styleVariants } from "@vanilla-extract/css";
import { minMediaQuery } from "../../styles/breakpoints";
import { space } from "../../styles/spacing";
import { gridTemplate, SPACER } from "../../utils/gridTemplate";

export const gradeStyle = style({
  height: space[32],
  width: "auto",
  margin: "0 auto",
  "@media": {
    [minMediaQuery("desktop")]: {
      margin: 0,
    },
  },
});

export const gridStyle = style({
  display: "grid",
  maxWidth: "max(32.5em, 58.5ch)",
  ...gridTemplate<GridAreas, 1>({
    rows: [
      { [space[24]]: SPACER },
      ["grade"],
      ["date"],
      { [space[32]]: SPACER },
      ["text"],
    ],
    columns: ["auto"],
  }),
  "@media": {
    [minMediaQuery("desktop")]: {
      ...gridTemplate<GridAreas, 1>({
        rows: [
          { [space[24]]: SPACER },
          ["grade"],
          { [space[8]]: SPACER },
          ["date"],
          { [space[32]]: SPACER },
          ["text"],
        ],
        columns: ["auto"],
      }),
    },
  },
});

const gridAreaStyles = {
  grade: {
    gridArea: "grade",
    textAlign: "center" as const,
  },
  date: {
    gridArea: "date",
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    fontWeight: 700,
    "@media": {
      [minMediaQuery("desktop")]: {
        flexDirection: "row" as const,
        marginLeft: "4px",
        fontWeight: "normal",
      },
    },
  },
  text: {
    gridArea: "text",
  },
};

export type GridAreas = "grade" | "date" | "text";

export const gridAreas = styleVariants(gridAreaStyles);
