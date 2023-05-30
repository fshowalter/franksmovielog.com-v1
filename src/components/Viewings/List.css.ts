import { style } from "@vanilla-extract/css";

export const subListItemBoxShadowStyle = style({
  ":last-of-type": {
    boxShadow: "none",
  },
});
