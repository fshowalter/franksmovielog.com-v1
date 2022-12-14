import { globalStyle, style } from "@vanilla-extract/css";
import { borderColors } from "../../styles/colors.css";
import { size } from "../../styles/sizes.css";

export const hoverStyle = style({
  cursor: "pointer",

  ":hover": {
    boxShadow: `0 0 0 1px ${borderColors.accent}`,
  },
});

export const iconLayoutStyle = style({
  position: "relative",
});

globalStyle(`${iconLayoutStyle} svg`, {
  position: "absolute",
  left: size[24],
});
