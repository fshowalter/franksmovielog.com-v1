import { style, styleVariants } from "@vanilla-extract/css";
import { minMediaQuery } from "../../styles/breakpoints";
import { MAX_CONTENT_WIDTH_WITH_GUTTERS } from "../../styles/sizes";
import { gridTemplate, SPACER } from "../../utils/gridTemplate";

export const gridStyle = style({
  display: "grid",
  maxWidth: MAX_CONTENT_WIDTH_WITH_GUTTERS,
  margin: "0 auto",
  ...gridTemplate<GridAreas, 3>({
    rows: [
      ["prev", SPACER, "next"],
      ["pages", "pages", "pages"],
    ],
    columns: ["auto", "minmax(24px, 1fr)", "auto"],
  }),
  "@media": {
    [minMediaQuery("tablet")]: {
      ...gridTemplate<GridAreas, 7>({
        rows: [[SPACER, "prev", SPACER, "pages", SPACER, "next", SPACER]],
        columns: ["1fr", "auto", "24px", "auto", "24px", "auto", "1fr"],
      }),
    },
  },
});

const gridAreaStyles = {
  prev: {
    gridArea: "prev",
  },
  next: {
    gridArea: "next",
  },
  pages: {
    gridArea: "pages",
    textAlign: "center" as const,
  },
};

export type GridAreas = "prev" | "next" | "pages";

export const gridAreas = styleVariants(gridAreaStyles);
