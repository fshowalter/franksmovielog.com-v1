import { style } from "@vanilla-extract/css";
import { minMediaQuery } from "../../styles/breakpoints";
import { borderColors } from "../../styles/colors.css";
import { gutterWidth, size } from "../../styles/sizes.css";

export const seeAllLinkGridStyle = style({
  gridColumn: "1 / -1",
  "@media": {
    [minMediaQuery("desktop")]: {
      position: "absolute",
      top: size[8],
      right: gutterWidth,
    },
  },
});

export const movieListStyle = style({
  padding: 0,
  "@media": {
    [minMediaQuery("tablet")]: {
      //   padding: `${size[32]} ${popoutGutterWidth} 0`,
      //   display: "grid",
      //   gridTemplateColumns: "repeat(2,1fr)",
      //   columnGap: size[32],
      boxShadow: `0 0 0 1px ${borderColors.default}`,
      //   borderRadius: size[8],
    },
    [minMediaQuery("desktop")]: {
      paddingTop: 0,
      padding: `0 ${gutterWidth}`,
      maxWidth: "unset",
      display: "grid",
      gridTemplateColumns: "repeat(4,1fr)",
      columnGap: size[32],
      boxShadow: "unset",
    },
  },
});
