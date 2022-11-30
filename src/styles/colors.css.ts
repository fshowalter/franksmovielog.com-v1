import { createVar, globalStyle } from "@vanilla-extract/css";

const borderColorDefault = createVar();
const fgAccent = createVar();
const fgDefault = createVar();
const fgMuted = createVar();
const fgOnAccent = createVar();
const fgSubtle = createVar();

export const borderColors = {
  default: borderColorDefault,
};

export const foregroundColors = {
  accent: fgAccent,
  default: fgDefault,
  muted: fgMuted,
  onAccent: fgOnAccent,
  subtle: fgSubtle,
};

globalStyle(":root", {
  vars: {
    [borderColorDefault]: "#e9e7e0",
    [fgAccent]: "#0056b3",
    [fgDefault]: "rgb(0 0 0 / 75%)",
    [fgMuted]: "rgb(0 0 0 / 65%)",
    [fgOnAccent]: "#fff",
    [fgSubtle]: "rgb(0 0 0 / 60%)",
  },
  "@media": {
    "(prefers-color-scheme: dark)": {
      vars: {
        [borderColorDefault]: "#322f2f",
        [fgAccent]: "#499ef8",
        [fgDefault]: "rgb(255 255 255 / 75%)",
        [fgMuted]: "rgb(255 255 255 / 65%)",
        [fgOnAccent]: "#fff",
        [fgSubtle]: "rgb(255 255 255 / 60%)",
      },
    },
  },
});
