import { style } from "@vanilla-extract/css";
import { minMediaQuery } from "../../styles/breakpoints";
import { borderColors } from "../../styles/colors.css";
import { PROSE_CONTENT_WIDTH } from "../../styles/sizes";

export const formStyle = style({
  border: `solid 1px ${borderColors.default}`,
  borderRadius: "4px",
  width: "100%",
  maxWidth: PROSE_CONTENT_WIDTH,
  "@media": {
    [minMediaQuery("desktop")]: {
      width: "unset",
    },
  },
});

export const searchInputStyle = style({
  border: 0,
  borderRadius: 0,
  minWidth: 0,
  padding: "7px 15px",
  "@media": {
    [minMediaQuery("max")]: {
      width: "100%",
    },
  },
});

export const submitButtonStyle = style({
  border: 0,
  borderLeft: `solid 1px ${borderColors.default}`,
  fontSize: "12px",
  padding: "5px 12px",
});

export const iconStyle = style({
  height: "16px",
  width: "16px",
});
