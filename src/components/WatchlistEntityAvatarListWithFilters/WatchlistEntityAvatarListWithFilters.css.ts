import { style } from "@vanilla-extract/css";
import { minMediaQuery } from "../../styles/breakpoints";
import { size } from "../../styles/sizes.css";

export const gridStyle = style({
  "@media": {
    [minMediaQuery("tablet")]: {
      display: "grid",
      gridTemplateColumns: `repeat(auto-fill, minmax(144px, 1fr))`,
      rowGap: size[48],
      columnGap: size[32],
      justifyItems: "center",
      justifyContent: "space-between",
    },
  },
});

export const avatarMaxWidthStyle = style({
  maxWidth: "40px",
  "@media": {
    [minMediaQuery("tablet")]: {
      maxWidth: "160px",
    },
  },
});
