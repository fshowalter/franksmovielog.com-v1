import { createVar, globalStyle } from "@vanilla-extract/css";
import { backgroundColors, foregroundColors } from "./colors.css";
import { size } from "./sizes.css";

globalStyle(`*, *::before, *::after`, {
  boxSizing: `border-box`,
  margin: 0,
});

globalStyle(`:root`, {
  WebkitTextSizeAdjust: "none",
});

globalStyle(`html, body`, {
  height: `100%`,
});

globalStyle(`body`, {
  lineHeight: 1.5,
  WebkitFontSmoothing: `antialiased`,
  fontFamily: `"Charter", "Iowan Old Style", "Georgia", "Cambria", "Times New Roman", "Times", "serif"`,
  fontFeatureSettings: `"kern","liga","clig","calt"`,
  fontKerning: "normal",
  backgroundColor: backgroundColors.canvas,
  color: foregroundColors.default,
});

globalStyle(`a`, {
  color: foregroundColors.accent,
  textDecoration: "none",
});

globalStyle(`img, picture, video, canvas, svg`, {
  display: `block`,
  maxWidth: `100%`,
});

globalStyle(`ol, ul`, {
  padding: 0,
});

globalStyle(`input, button, textarea, select`, {
  font: `inherit`,
});

globalStyle(`fieldset`, {
  border: 0,
  marginInlineEnd: 0,
  paddingBlockEnd: 0,
  paddingBlockStart: 0,
  paddingInlineEnd: 0,
  paddingInlineStart: 0,
  padding: 0,
});

globalStyle(`p, h1, h2, h3, h4, h5, h6`, {
  overflowWrap: `break-word`,
  textRendering: "optimizeLegibility",
});

globalStyle(`#root`, {
  isolation: `isolate`,
});

globalStyle(`button`, {
  border: 0,
});

const imageFilter = createVar();

globalStyle(`img`, {
  filter: imageFilter,
});

globalStyle(":root", {
  vars: {
    [imageFilter]: "initial",
  },
  "@media": {
    "(prefers-color-scheme: dark)": {
      vars: {
        [imageFilter]: "brightness(0.8) contrast(1.2)",
      },
    },
  },
});

globalStyle(".reactSelect__dropdown-indicator > svg", {
  color: "#054a93",
});

globalStyle(".reactSelect__value-container", {
  lineHeight: size[24],
  padding: "7px 31px 7px 15px !important",
});

globalStyle(".reactSelect__placeholder", {
  padding: 0,
});

globalStyle(".littlefoot-footnote__content", {
  backgroundColor: backgroundColors.default,
});
