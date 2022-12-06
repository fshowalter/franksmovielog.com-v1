import { style } from "@vanilla-extract/css";
import { borderColors } from "../../styles/colors.css";

export const ruleStyle = style({
  backgroundColor: borderColors.default,
  minHeight: "1px",
  border: 0,
});

export const marginStyle = style({
  marginBottom: `-1px`,
});
