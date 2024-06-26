import { style } from "@vanilla-extract/css";
import { foregroundColors } from "../../styles/colors.css";

export const iconStyle = style({
  color: foregroundColors.subtle,
  height: "1.5rem",
  minWidth: "1.5rem",
  display: "block",
});
