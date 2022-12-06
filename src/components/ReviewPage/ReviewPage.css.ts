import { style, styleVariants } from "@vanilla-extract/css";
import { minMediaQuery } from "../../styles/breakpoints";
import { borderColors } from "../../styles/colors.css";
import { GUTTER, space } from "../../styles/spacing";
import { gridTemplate, SPACER } from "../../utils/gridTemplate";
import { reviewContainerName } from "./breakpoints.css";

export const containerStyle = style({
  containerType: "inline-size",
  containerName: reviewContainerName,
});

export const creditsStyle = style({
  flexBasis: "min-content",
  flexGrow: 1,
});

export const gridStyle = style({
  display: "grid",
  borderTop: `solid 1px ${borderColors.default}`,
  marginBottom: "-1px",
  ...gridTemplate<GridAreas, 3>({
    rows: [
      [SPACER, "title", SPACER],
      ["still", "still", "still"],
      [SPACER, "content", SPACER],
      { [space[80]]: SPACER },
      ["viewings", "viewings", "viewings"],
      { [space[64]]: SPACER },
      ["credits", "credits", "credits"],
      { [space[80]]: SPACER },
      ["related", "related", "related"],
    ],
    columns: [GUTTER, "auto", GUTTER],
  }),
  "@media": {
    [minMediaQuery("desktop")]: {
      ...gridTemplate<GridAreas, 5>({
        rows: [
          ["still", "still", "still", "still", "still"],
          [SPACER, "title", "title", "title", SPACER],
          [SPACER, "content", SPACER, "credits", SPACER],
          [SPACER, "viewings", SPACER, "credits", SPACER],
          [SPACER, "related", "related", "related", SPACER],
        ],
        columns: [GUTTER, "66ch", "minmax(64px, 186px)", "224px", GUTTER],
      }),
      borderTop: 0,
      marginBottom: 0,
    },
  },
});

const gridAreaStyles = {
  title: {
    gridArea: "title",
  },
  still: {
    gridArea: "still",
    justifySelf: "center",
  },
  content: {
    gridArea: "content",
  },
  viewings: {
    gridArea: "viewings",
  },
  credits: {
    gridArea: "credits",
  },
  related: {
    gridArea: "related",
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
