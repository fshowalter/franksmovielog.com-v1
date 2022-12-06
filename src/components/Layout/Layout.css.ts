import { style, styleVariants } from "@vanilla-extract/css";
import { breakpoints, minMediaQuery } from "../../styles/breakpoints";
import {
  MAX_CONTENT_WIDTH_WITH_GUTTERS,
  MAX_STILL_WIDTH,
} from "../../styles/sizes";
import { gridTemplate, SPACER } from "../../utils/gridTemplate";

export const pageCanvasStyle = style({
  minHeight: "100dvh",
  maxWidth: `clamp(${MAX_STILL_WIDTH}, 95vw, ${breakpoints.max})`,
  margin: "0 auto",
});

export const contentStyle = style({
  // maxWidth: "1280px",
  position: "relative",
});

export const gridStyle = style({
  display: "grid",
  ...gridTemplate<GridAreas, 1>({
    rows: [["header"], ["children"]],
    columns: ["auto"],
  }),
  "@media": {
    [minMediaQuery("max")]: {
      ...gridTemplate<GridAreas, 2>({
        rows: [
          ["children", "header"],
          ["children", SPACER],
        ],
        columns: [MAX_CONTENT_WIDTH_WITH_GUTTERS, "224px"],
      }),
      columnGap: "32px",
    },
  },
});

const gridAreaStyles = {
  header: {
    gridArea: "header",
    "@media": {
      [minMediaQuery("max")]: {
        position: "sticky" as const,
        top: "80px",
      },
    },
  },
  children: {
    gridArea: "children",
  },
};

export type GridAreas = "header" | "children";

export const gridAreas = styleVariants(gridAreaStyles);
