import { style } from "@vanilla-extract/css";

export const ripNotComingSoonBackgroundImageStyle = style({
  backgroundImage: `url("/assets/ripnotcomingsoon.jpg")`,
  "@media": {
    "(prefers-color-scheme: dark)": {
      filter: "brightness(0.8) contrast(1.2)",
    },
  },
});
