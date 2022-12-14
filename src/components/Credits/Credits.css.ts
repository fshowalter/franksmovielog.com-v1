import { style } from "@vanilla-extract/css";
import { foregroundColors } from "../../styles/colors.css";
import { MAX_POSTER_WIDTH, size } from "../../styles/sizes.css";

export const posterStyle = style({
  maxWidth: MAX_POSTER_WIDTH,
  borderRadius: size[8],
});

export const posterFloatStyle = style({
  float: "left" as const,
  maxWidth: "50%",
  marginRight: "24px",
});

export const creditStyle = style({
  marginBottom: size[16],
  overflow: "hidden",
});

export const backToTopContainerStyle = style({
  alignItems: "center",
  backfaceVisibility: "hidden",
  backgroundColor: "rgb(0 0 0 / 15%)",
  borderRadius: "100px 0 0",
  bottom: 0,
  color: "rgb(255 255 255)",
  cursor: "pointer",
  display: "flex",
  justifyContent: "center",
  marginBottom: 0,
  marginRight: 0,
  padding: "18.6667px 4.6667px 4.6667px 18.6667px",
  position: "absolute",
  right: 0,

  selectors: {
    "&::before": {
      backgroundColor: "rgb(255 255 255)",
      borderRadius: "inherit",
      content: " ",
      inset: 0,
      opacity: 0,
      pointerEvents: "none",
      position: "absolute",
      zIndex: 1,
    },

    "&::after": {
      borderRadius: "inherit",
      content: " ",
      inset: 0,
      pointerEvents: "none",
      position: "absolute",
      zIndex: 1,
    },
  },
});

export const backToTopInnerStyle = style({
  alignItems: "center",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
});

export const backToTopArrowStyle = style({
  alignItems: "center",
  display: "flex",
  fill: foregroundColors.default,
  height: "31.5px",
  justifyContent: "center",
  transition: "all 0.3s ease 0s",
  width: "31.5px",
  zIndex: 2,
});
