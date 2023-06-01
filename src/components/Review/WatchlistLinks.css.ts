import { style } from "@vanilla-extract/css";
import { borderColors } from "../../styles/colors.css";

export const avatarStyle = style({
  display: "block !important",
  height: "40px",
  marginRight: "1ch",
  width: "40px",
});

export const linkStyle = style({
  selectors: {
    "&:hover": {
      boxShadow: `0 0 0 1px ${borderColors.accent}`,
    },
  },
});
