import { style, styleVariants } from "@vanilla-extract/css";
import { minMediaQuery } from "../../styles/breakpoints";
import { backgroundColors, borderColors } from "../../styles/colors.css";
import { size } from "../../styles/sizes.css";
import { gridTemplate, SPACER } from "../../utils/gridTemplate";

export const gradeStyle = style({
  // padding: "3px 0",
});

export const stillStyle = style({
  borderRadius: "8px",
  overflow: "hidden",
  maxWidth: "312px",
  display: "block",

  "@media": {
    [minMediaQuery("tablet")]: {
      borderRadius: "unset",
    },
  },
});

export const gridStyle = style({
  display: "grid",
  ...gridTemplate<GridAreas, 3>({
    rows: [
      { [size[24]]: SPACER },
      ["title", SPACER, "still"],
      { [size[8]]: [SPACER, SPACER, "still"] },
      ["grade", SPACER, "still"],
      [SPACER, SPACER, "still"],
      { [size[24]]: SPACER },
    ],
    columns: [" 1fr", "24px", "1fr"],
  }),
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
      maxWidth: "312px",
      ...gridTemplate<GridAreas, 1>({
        rows: [
          ["still"],
          { [size[8]]: SPACER },
          ["title"],
          { "1fr": ["grade"] },
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
    "@media": {
      [minMediaQuery("tablet")]: {
        padding: `${size[8]} ${size[24]} ${size[8]}`,
      },
    },
  },
  grade: {
    gridArea: "grade",
    "@media": {
      [minMediaQuery("tablet")]: {
        padding: `0 ${size[24]} ${size[64]}`,
      },
    },
  },
  still: {
    gridArea: "still",
  },
};

export type GridAreas = "title" | "grade" | "still";

export const gridAreas = styleVariants(gridAreaStyles);
