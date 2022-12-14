import { style } from "@vanilla-extract/css";
import { minMediaQuery } from "../../styles/breakpoints";
import { foregroundColors } from "../../styles/colors.css";

export const taglineStyle = style({
  "@media": {
    [minMediaQuery("desktop")]: {
      paddingLeft: "1px",
    },
  },
});

export const navActiveLinkStyle = style({
  color: foregroundColors.muted,
});

export const orderStyle = style({
  "@media": {
    [minMediaQuery("desktop")]: {
      order: 4,
    },
  },
});
