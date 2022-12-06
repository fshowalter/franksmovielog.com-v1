import { createVar, globalStyle } from "@vanilla-extract/css";
import { backgroundColors, foregroundColors } from "./colors.css";

globalStyle(`*, *::before, *::after`, {
  boxSizing: `border-box`,
  margin: 0,
});

globalStyle(`html, body`, {
  height: `100%`,
});

globalStyle(`body`, {
  lineHeight: 1.5,
  WebkitFontSmoothing: `antialiased`,
  fontFamily: `"Charter", "Iowan Old Style", "Georgia", "Cambria", "Times New Roman", "Times", "serif"`,
  backgroundColor: backgroundColors.canvas,
  color: foregroundColors.default,
});

globalStyle(`img, picture, video, canvas, svg`, {
  display: `block`,
  maxWidth: `100%`,
});

globalStyle(`input, button, textarea, select`, {
  font: `inherit`,
});

globalStyle(`p, h1, h2, h3, h4, h5, h6`, {
  overflowWrap: `break-word`,
  textRendering: "optimizeLegibility",
});

globalStyle(`#root`, {
  isolation: `isolate`,
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
