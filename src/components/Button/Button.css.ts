import { globalStyle, style } from "@vanilla-extract/css";
import { borderColors } from "../../styles/colors.css";
import { size } from "../../styles/sizes.css";

export const buttonStyle = style({
  cursor: "pointer",
  position: "relative",
  maxWidth: "32rem",

  ":hover": {
    boxShadow: `0 0 0 1px ${borderColors.accent}`,
  },
});

globalStyle(`${buttonStyle} svg`, {
  position: "absolute",
  left: size[24],
});
