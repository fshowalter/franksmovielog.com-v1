import { style, styleVariants } from "@vanilla-extract/css";
import { minMediaQuery } from "../../styles/breakpoints";

const paddingValue = "clamp(20px, 5.5%, 64px)";

const containerBaseStyle = style({
  paddingLeft: paddingValue,
  paddingRight: paddingValue,
});

const containerStyles = {
  default: {
    maxWidth: `calc(32.5rem + (${paddingValue} * 2))`,
    "@media": {
      [minMediaQuery("desktop")]: {
        // justifyContent: "flex-start",
      },
      [minMediaQuery("max")]: {
        // flexDirection: "column",
      },
    },
  },
  popout: {
    paddingLeft: 0,
    paddingRight: 0,
    maxWidth: `calc(32.5rem + (${paddingValue} * 2))`,
    "@media": {
      [minMediaQuery("desktop")]: {
        // justifyContent: "flex-start",
      },
      [minMediaQuery("max")]: {
        // flexDirection: "column",
      },
    },
  },
  fullWidth: {},
};

export type ContainerVariants = "fullWidth" | "default" | "popout";

export const containerVariants = styleVariants(containerStyles, (styles) => [
  containerBaseStyle,
  styles,
]);
