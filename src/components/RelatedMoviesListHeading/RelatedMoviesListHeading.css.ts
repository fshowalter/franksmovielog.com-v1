import { style } from "@vanilla-extract/css";
import { minMediaQuery } from "../../styles/breakpoints";

export const avatarStyle = style({
  display: "none",
  "@media": {
    [minMediaQuery("tablet")]: {
      borderRadius: "50%",
      // display: "block !important",
      height: "40px",
      marginRight: "1ch",
      transform: "translateZ(0)", // Fix Safari border-radius with hidden overflow.
      width: "40px",
      overflow: "hidden",
    },
  },
});
