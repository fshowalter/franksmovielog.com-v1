import { style, styleVariants } from "@vanilla-extract/css";
import { minMediaQuery } from "../../styles/breakpoints";
import { space } from "../../styles/spacing";
import { fontSizes } from "../../styles/typography.css";
import { gridTemplate, SPACER } from "../../utils/gridTemplate";

export const taglineStyle = style({
  fontStyle: "italic",
  lineHeight: space[16],
  "@media": {
    [minMediaQuery("desktop")]: {
      fontSize: "15px",
      paddingLeft: "1px",
      lineHeight: space[24],
    },
    [minMediaQuery("max")]: {
      order: "unset",
    },
  },
});

export const titleStyle = style({
  fontSize: fontSizes["large"],
  fontWeight: "normal",
  "@media": {
    [minMediaQuery("desktop")]: {
      fontSize: fontSizes["xLarge"],
    },
    [minMediaQuery("max")]: {
      fontSize: fontSizes["large"],
    },
  },
});

export const gridStyle = style({
  display: "grid",
  ...gridTemplate<GridAreas, 3>({
    rows: [
      { [space[24]]: SPACER },
      [SPACER, "title", SPACER],
      [SPACER, "tagline", SPACER],
      { [space[24]]: SPACER },
      [SPACER, "search", SPACER],
      { [space[24]]: SPACER },
      [SPACER, "nav", SPACER],
      { [space[24]]: SPACER },
    ],
    columns: ["minmax(20px, 1fr)", "auto", "minmax(20px, 1fr)"],
  }),
  textAlign: "center",
  "@media": {
    [minMediaQuery("desktop")]: {
      textAlign: "unset",
      ...gridTemplate<GridAreas, 4>({
        rows: [
          { [space[48]]: SPACER },
          [SPACER, "title", "search", SPACER],
          [SPACER, "tagline", SPACER, SPACER],
          { [space[32]]: SPACER },
          [SPACER, "nav", "nav", SPACER],
          { [space[40]]: SPACER },
        ],
        columns: ["1fr", "704px", "288px", "1fr"],
      }),
    },
    [minMediaQuery("max")]: {
      ...gridTemplate<GridAreas, 1>({
        rows: [
          ["title"],
          ["tagline"],
          { [space[24]]: SPACER },
          ["search"],
          { [space[48]]: SPACER },
          ["nav"],
        ],
        columns: ["auto"],
      }),
    },
  },
});

const gridAreaStyles = {
  title: {
    gridArea: "title",
  },
  tagline: {
    gridArea: "tagline",
  },
  search: {
    gridArea: "search",
  },
  nav: {
    gridArea: "nav",
  },
};

export type GridAreas = "title" | "tagline" | "search" | "nav";

export const gridAreas = styleVariants(gridAreaStyles);
