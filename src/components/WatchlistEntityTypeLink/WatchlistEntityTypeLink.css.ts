import { style } from "@vanilla-extract/css";
import { borderColors } from "../../styles/colors.css";

export const hoverStyle = style({
  ":hover": {
    boxShadow: `0 0 0 1px ${borderColors.accent}`,
  },
});
