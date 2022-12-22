import { style } from "@vanilla-extract/css";
import { borderColors } from "../../styles/colors.css";

export const linkStyle = style({
  minWidth: "8rem",
  ":hover": {
    boxShadow: `0 0 0 1px ${borderColors.accent}`,
  },
});
