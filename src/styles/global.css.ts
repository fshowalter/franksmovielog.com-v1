import { createVar, globalStyle } from "@vanilla-extract/css";
import { backgroundColors, borderColors, foregroundColors } from "./colors.css";
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
  MozOsxFontSmoothing: "grayscale",
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

globalStyle(".littlefoot__button", {
  top: "-.1em",
  position: "relative",
  minWidth: "1.5em",
  boxSizing: "border-box",
  lineHeight: 1,
});

globalStyle(".littlefoot__button svg", {
  height: ".3em",
});

globalStyle(".littlefoot__button svg circle", {
  "@media": {
    "(prefers-color-scheme: dark)": {
      fill: foregroundColors.default,
    },
  },
});

globalStyle(".littlefoot__popover", {
  "@media": {
    "(width > 768px)": {
      margin:
        "calc(var(--popover-tooltip-size) + var(--button-height) + calc(var(--button-height) / 2)) 0",
    },
  },
});

globalStyle(".littlefoot", {
  display: "inline-block",
  position: "relative",
  textIndent: 0,
  vars: {
    "--button-background-color": "hsla(0,0%,43%,.2)",
    "--button-border-radius": ".5em",
    "--button-font-size": ".9em",
    "--button-font-weight": "700",
    "--button-height": "1em",
    "--button-margin": "0 .1em 0 .2em",
    "--button-padding": ".35em .5em",
    "--popover-background-color": "#fbfbfb",
    "--popover-border-radius": "10px",
    "--popover-border": `1px solid ${borderColors.default}`,
    "--popover-font-family": "",
    "--popover-font-size": "1rem",
    "--popover-line-height": "1.5rem",
    "--popover-shadow": "0 0 40px rgba(0,0,0,.3)",
    "--popover-text-color": foregroundColors.default,
    "--popover-tooltip-size": ".65em",
    "--popover-vertical-padding": "calc(1rem - 1px)",
  },
  "@media": {
    "(prefers-color-scheme: dark)": {
      vars: {
        "--button-background-color": "rgba(0,0,0,.75)",
        "--button-text-color": foregroundColors.default,
        "--popover-shadow": "0 0 40px rgba(0, 0, 0,.7)",
        "--popover-background-color": backgroundColors.subtle,
      },
    },
  },
});
