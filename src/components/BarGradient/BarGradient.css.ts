import { style } from "@vanilla-extract/css";
import { backgroundColors } from "../../styles/colors.css";

export const gradientBackgroundStyle = style({
  backgroundImage: `linear-gradient(to right, ${backgroundColors.progress}, ${backgroundColors.progress} var(--bar-percent), transparent var(--bar-percent), transparent)`,
  opacity: "0.33",
  lineHeight: "38px",
});
