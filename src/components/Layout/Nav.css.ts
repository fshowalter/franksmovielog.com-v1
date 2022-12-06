import { style, StyleRule, styleVariants } from "@vanilla-extract/css";
import { minMediaQuery } from "../../styles/breakpoints";
import { borderColors, foregroundColors } from "../../styles/colors.css";
import { space } from "../../styles/spacing";

const linkBaseStyles = style({
  textDecoration: "none",
  color: "inherit",
});

export const linkStyles = {
  header: {
    "@media": {
      [minMediaQuery("max")]: {
        borderBottom: `1px solid ${borderColors.default}`,
        display: "block",
        lineHeight: space[48],
        whiteSpace: "nowrap",
        marginBottom: "-1px",
      },
    },
  },
  footer: {},
};

export const activeLinkStyles = {
  header: {
    color: foregroundColors.muted,
  },
  footer: {
    color: "inherit",
  },
};

const listItemBaseStyles = style({
  display: "block",
  position: "relative",
  whiteSpace: "nowrap",
  letterSpacing: ".5px",
});

const listItemStyles: Record<NavVariants, StyleRule> = {
  header: {
    color: foregroundColors.accent,
  },
  footer: {},
};

const listBaseStyles = style({
  display: "flex",
  columnGap: "16px",
  flexWrap: "wrap",
  fontSize: "1rem",
  rowGap: "8px",
  lineHeight: "1.5",
  padding: "0",
  flexDirection: "row",
  justifyContent: "center",
  "@media": {
    [minMediaQuery("tablet")]: {
      columnGap: "24px",
    },
  },
});

const listStyles = {
  header: {
    "@media": {
      [minMediaQuery("desktop")]: {
        justifyContent: "flex-start",
      },
      [minMediaQuery("max")]: {
        flexDirection: "column",
      },
    },
  },
  footer: {},
};

export type NavVariants = "header" | "footer";

export const activeLinkVariants = styleVariants(activeLinkStyles);

export const linkVariants = styleVariants(linkStyles, (styles) => [
  linkBaseStyles,
  styles,
]);

export const listVariants = styleVariants(listStyles, (styles) => [
  listBaseStyles,
  styles,
]);

export const listItemVariants = styleVariants(listItemStyles, (styles) => [
  listItemBaseStyles,
  styles,
]);
