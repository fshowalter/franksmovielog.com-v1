import { style, styleVariants } from "@vanilla-extract/css";
import { minMediaQuery } from "../../styles/breakpoints";
import { backgroundColors, borderColors } from "../../styles/colors.css";
import { SPACER, gridTemplate } from "../../styles/grid";
import { size } from "../../styles/sizes.css";

export const stillStyle = style({
  borderRadius: "8px",
  overflow: "hidden",
  maxWidth: "312px",
  display: "block",
  transform: "translateZ(0)",
  float: "right",
  marginLeft: "24px",
  marginBottom: "8px",
  width: "calc(50% - 12px)",

  "@media": {
    [minMediaQuery("tablet")]: {
      float: "unset",
      margin: "unset",
      width: "unset",
      borderRadius: "unset",
    },
  },
});

export const gridStyle = style({
  display: "flow-root",
  width: "100%",
  paddingTop: "24px",
  paddingBottom: "24px",
  selectors: {
    "&:nth-child(even)": {
      backgroundColor: backgroundColors.subtle,
    },
  },
  "@media": {
    [minMediaQuery("tablet")]: {
      padding: 0,
      backgroundColor: backgroundColors.default,
      boxShadow: `0 0 0 1px ${borderColors.default}`,
      borderRadius: "8px",
      overflow: "hidden",
      maxWidth: "312px",
      display: "grid",
      ...gridTemplate<GridAreas, 1>({
        rows: [
          ["still"],
          { [size[16]]: SPACER },
          ["title"],
          { "1fr": ["grade"] },
          ["genres"],
          { [size[32]]: SPACER },
        ],
        columns: ["auto"],
      }),
      selectors: {
        "&:nth-child(even)": {
          backgroundColor: backgroundColors.default,
        },
      },
    },
  },
});

const gridAreaStyles = {
  title: {
    gridArea: "title",
    marginBottom: "8px",
    "@media": {
      [minMediaQuery("tablet")]: {
        margin: "unset",
        padding: `${size[8]} ${size[24]} ${size[8]}`,
      },
    },
  },
  grade: {
    gridArea: "grade",
    marginBottom: "16px",
    "@media": {
      [minMediaQuery("tablet")]: {
        margin: "unset",
        padding: `0 ${size[24]} ${size[32]}`,
      },
    },
  },
  still: {
    gridArea: "still",
  },
  genres: {
    gridArea: "genres",
    "@media": {
      [minMediaQuery("tablet")]: {
        padding: `0 ${size[24]} 0`,
      },
    },
  },
};

export type GridAreas = "title" | "grade" | "still" | "genres";

export const gridAreas = styleVariants(gridAreaStyles);
