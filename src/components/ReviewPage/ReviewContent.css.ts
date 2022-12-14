import { style, styleVariants } from "@vanilla-extract/css";
import { minMediaQuery } from "../../styles/breakpoints";
import { PROSE_CONTENT_WIDTH, size } from "../../styles/sizes.css";
import { gridTemplate, SPACER } from "../../utils/gridTemplate";

export const gradeStyle = style({
  height: size[32],
  width: "auto",
  margin: "0 auto",
  "@media": {
    [minMediaQuery("desktop")]: {
      margin: "0 0 0 -2px",
    },
  },
});

export const gridStyle = style({
  display: "grid",
  maxWidth: PROSE_CONTENT_WIDTH,
  margin: "0 auto",
  ...gridTemplate<GridAreas, 1>({
    rows: [
      { [size[24]]: SPACER },
      ["grade"],
      ["date"],
      { [size[32]]: SPACER },
      ["text"],
    ],
    columns: ["auto"],
  }),
  "@media": {
    [minMediaQuery("desktop")]: {
      margin: 0,
      ...gridTemplate<GridAreas, 1>({
        rows: [
          { [size[24]]: SPACER },
          ["grade"],
          { [size[16]]: SPACER },
          ["date"],
          { [size[32]]: SPACER },
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
        fontWeight: "normal",
      },
    },
  },
  text: {
    gridArea: "text",
    "@media": {
      [minMediaQuery("desktop")]: {
        marginLeft: "calc(16px + 1ch)",
      },
    },
  },
};

export type GridAreas = "grade" | "date" | "text";

export const gridAreas = styleVariants(gridAreaStyles);
