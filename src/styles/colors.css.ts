import { createVar, globalStyle } from "@vanilla-extract/css";

const borderDefault = createVar();
const borderAccent = createVar();

const fgAccent = createVar();
const fgDefault = createVar();
const fgMuted = createVar();
const fgOnAccent = createVar();
const fgSubtle = createVar();
const fgInverse = createVar();

const bgAccent = createVar();
const bgDefault = createVar();
const bgCanvas = createVar();
const bgProgress = createVar();
const bgSubtle = createVar();

export const borderColors = {
  default: borderDefault,
  accent: borderAccent,
};

export const foregroundColors = {
  accent: fgAccent,
  default: fgDefault,
  muted: fgMuted,
  onAccent: fgOnAccent,
  subtle: fgSubtle,
  inverse: fgInverse,
  inherit: "inherit",
};

export const backgroundColors = {
  accent: bgAccent,
  canvas: bgCanvas,
  default: bgDefault,
  progress: bgProgress,
  subtle: bgSubtle,
};

globalStyle(":root", {
  vars: {
    [borderDefault]: "#e9e7e0",
    [borderAccent]: "#054a93",
    [fgAccent]: "#0056b3",
    [fgDefault]: "rgb(0 0 0 / 75%)",
    [fgMuted]: "rgb(0 0 0 / 65%)",
    [fgOnAccent]: "#fff",
    [fgSubtle]: "rgb(0 0 0 / 60%)",
    [bgAccent]: "#0056b3",
    [bgDefault]: "#fff",
    [bgCanvas]: "#e9e7e0",
    [bgProgress]: "#14bd41",
    [bgSubtle]: "#fafafa",
    [fgInverse]: "rgb(255 255 255 / 75%)",
  },
  "@media": {
    "(prefers-color-scheme: dark)": {
      vars: {
        [borderDefault]: "#484745",
        [borderAccent]: "#499ef8",
        [fgAccent]: "#499ef8",
        [fgDefault]: "rgb(255 255 255 / 75%)",
        [fgMuted]: "rgb(255 255 255 / 65%)",
        [fgOnAccent]: "#fff",
        [fgSubtle]: "rgb(255 255 255 / 60%)",
        [bgAccent]: "#0056b3",
        [bgDefault]: "#322f2f",
        [bgCanvas]: "#484745",
        [bgProgress]: "#379634",
        [bgSubtle]: "#373434",
      },
    },
  },
});
