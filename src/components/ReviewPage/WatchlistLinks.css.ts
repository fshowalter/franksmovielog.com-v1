import { style } from "@vanilla-extract/css";
import { borderColors } from "../../styles/colors.css";

export const avatarStyle = style({
  borderRadius: "50%",
  display: "block !important",
  height: "40px",
  marginRight: "1ch",
  transform: "translateZ(0)", // Fix Safari border-radius with hidden overflow.
  width: "40px",
});

export const linkStyle = style({
  borderRadius: "0.5rem",
  selectors: {
    "&:hover": {
      borderColor: borderColors.accent,
    },
  },
});
