import { style, styleVariants } from "@vanilla-extract/css";
import { minMediaQuery } from "../../styles/breakpoints";
import { borderColors } from "../../styles/colors.css";
import {
  GRID,
  GUTTER,
  MAX_CONTENT_WIDTH_WITH_GUTTERS,
  MAX_STILL_WIDTH,
  PROSE_CONTENT_WIDTH_WITH_GUTTERS,
  size,
} from "../../styles/sizes";
import { gridTemplate, SPACER } from "../../utils/gridTemplate";
import { reviewContainerName } from "./breakpoints.css";

export const containerStyle = style({
  containerType: "inline-size",
  containerName: reviewContainerName,
});

export const creditsStyle = style({
  // flexBasis: "min-content",
  // flexGrow: 1,
});

export const gridStyle = style({
  display: "grid",
  boxShadow: `0px -1px ${borderColors.default}`,
  maxWidth: MAX_CONTENT_WIDTH_WITH_GUTTERS,
  margin: "0 auto",
  ...gridTemplate<GridAreas, 3>({
    rows: [
      [SPACER, "title", SPACER],
      ["still", "still", "still"],
      [SPACER, "content", SPACER],
      { [size[80]]: SPACER },
      ["viewings", "viewings", "viewings"],
      { [size[64]]: SPACER },
      ["credits", "credits", "credits"],
      { [size[80]]: SPACER },
      ["related", "related", "related"],
    ],
    columns: [GRID.GUTTER, "auto", GRID.GUTTER],
  }),
  "@media": {
    [minMediaQuery("desktop")]: {
      ...gridTemplate<GridAreas, 5>({
        rows: [
          ["still", "still", "still", "still", "still"],
          [SPACER, "title", "title", "title", SPACER],
          [SPACER, "content", SPACER, "credits", SPACER],
          { [size[80]]: [SPACER, SPACER, SPACER, "credits", SPACER] },
          [SPACER, "viewings", SPACER, "credits", SPACER],
          { [size[80]]: SPACER },
          ["related", "related", "related", "related", "related"],
          { [size[80]]: SPACER },
        ],
        columns: [
          GRID.GUTTER,
          "66ch",
          "minmax(64px, 186px)",
          "230px",
          GRID.GUTTER,
        ],
      }),
      boxShadow: "none",
    },
    [minMediaQuery("max")]: {
      ...gridTemplate<GridAreas, 5>({
        rows: [
          { [size[64]]: SPACER },
          ["still", "still", "still", "still", "still"],
          [SPACER, "title", "title", "title", SPACER],
          [SPACER, "content", SPACER, "credits", SPACER],
          { [size[80]]: [SPACER, SPACER, SPACER, "credits", SPACER] },
          [SPACER, "viewings", SPACER, "credits", SPACER],
          { [size[80]]: SPACER },
          ["related", "related", "related", "related", "related"],
          { [size[80]]: SPACER },
        ],
        columns: [
          GRID.GUTTER,
          "66ch",
          "minmax(64px, 186px)",
          "230px",
          GRID.GUTTER,
        ],
      }),
      boxShadow: "none",
    },
  },
});

const gridAreaStyles = {
  title: {
    gridArea: "title",
    textAlign: "center" as const,
    "@media": {
      [minMediaQuery("desktop")]: {
        textAlign: "left" as const,
      },
    },
  },
  still: {
    gridArea: "still",
    justifySelf: "center",
    maxWidth: MAX_STILL_WIDTH,
  },
  content: {
    gridArea: "content",
    "@media": {
      [minMediaQuery("desktop")]: {
        boxShadow: `0px -1px ${borderColors.default}`,
      },
    },
  },
  viewings: {
    gridArea: "viewings",
    justifySelf: "center",
    maxWidth: PROSE_CONTENT_WIDTH_WITH_GUTTERS,
    width: size["full"],
    "@media": {
      [minMediaQuery("desktop")]: {
        marginLeft: `calc(-2 * ${GUTTER})`,
      },
    },
  },
  credits: {
    gridArea: "credits",
    justifySelf: "center",
    maxWidth: PROSE_CONTENT_WIDTH_WITH_GUTTERS,
    width: size["full"],
  },
  related: {
    gridArea: "related",
    justifySelf: "center",
    maxWidth: PROSE_CONTENT_WIDTH_WITH_GUTTERS,
    width: size["full"],
    "@media": {
      [minMediaQuery("desktop")]: {
        maxWidth: MAX_CONTENT_WIDTH_WITH_GUTTERS,
      },
    },
  },
};

export type GridAreas =
  | "title"
  | "still"
  | "viewings"
  | "credits"
  | "content"
  | "related";

export const gridAreas = styleVariants(gridAreaStyles);
