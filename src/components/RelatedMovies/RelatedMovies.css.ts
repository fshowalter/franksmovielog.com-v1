import { style, styleVariants } from "@vanilla-extract/css";
import { minMediaQuery } from "../../styles/breakpoints";
import { backgroundColors } from "../../styles/colors.css";
import { popoutGutterWidth, QUAD_POSTER, size } from "../../styles/sizes.css";
import { gridTemplate, SPACER } from "../../utils/gridTemplate";

export const avatarStyle = style({
  borderRadius: "50%",
  display: "block !important",
  height: "40px",
  marginRight: "1ch",
  transform: "translateZ(0)", // Fix Safari border-radius with hidden overflow.
  width: "40px",
  overflow: "hidden",
});

export const movieListStyle = style({
  padding: 0,
  "@media": {
    [minMediaQuery("tablet")]: {
      padding: `0 ${popoutGutterWidth}`,
      display: "grid",
      gridTemplateColumns: "repeat(2,1fr)",
      columnGap: size[32],
    },
    [minMediaQuery("desktop")]: {
      maxWidth: QUAD_POSTER,
      display: "grid",
      gridTemplateColumns: "repeat(4,1fr)",
      columnGap: size[32],
    },
  },
});

export const gridStyle = style({
  display: "grid",
  ...gridTemplate<GridAreas, 1>({
    rows: [["heading"], ["list"]],
    columns: ["auto"],
  }),
  "@media": {
    [minMediaQuery("tablet")]: {
      ...gridTemplate<GridAreas, 1>({
        rows: [
          { [size[8]]: SPACER },
          ["heading"],
          { [size[8]]: SPACER },
          ["list"],
        ],
        columns: ["auto"],
      }),
      selectors: {
        "&:nth-child(even)": {
          backgroundColor: backgroundColors.subtle,
        },
      },
    },
  },
});

const gridAreaStyles = {
  heading: {
    gridArea: "heading",
  },
  list: {
    gridArea: "list",
  },
};

export type GridAreas = "heading" | "list";

export const gridAreas = styleVariants(gridAreaStyles);
