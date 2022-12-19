import { style } from "@vanilla-extract/css";
import { borderColors } from "../../styles/colors.css";

export const borderStyle = style({
  border: `1px solid ${borderColors.default}`,
  borderRadius: "50%",
});
