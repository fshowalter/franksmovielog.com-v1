import { style } from "@vanilla-extract/css";
import {
  backgroundColors,
  borderColors,
  foregroundColors,
} from "../../styles/colors.css";

export const inputStyle = style({
  border: 0,
  backgroundColor: backgroundColors.subtle,
  boxShadow: `0 0 0 1px ${borderColors.default}`,
  color: foregroundColors.default,
  fontSize: "1rem",
  lineHeight: 1.5,
  padding: "8px 16px",
});
