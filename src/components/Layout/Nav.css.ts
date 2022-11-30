import { style } from "@vanilla-extract/css";
import { minMediaQuery } from "../../styles/breakpoints";
import { borderColors, foregroundColors } from "../../styles/colors.css";
import { spacing } from "../../styles/spacing";

export const linkStyle = style({
  textDecoration: "none",

  "@media": {
    [minMediaQuery("max")]: {
      borderBottom: `1px solid ${borderColors.default}`,
      display: "block",
      lineHeight: spacing[7],
      whiteSpace: "nowrap",
      marginBottom: "-1px",
    },
  },
});

export const activeLinkStyle = style({
  color: foregroundColors.muted,
});
