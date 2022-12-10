import { globalStyle, style } from "@vanilla-extract/css";
import { minMediaQuery } from "../../styles/breakpoints";
import { borderColors, foregroundColors } from "../../styles/colors.css";
import { size } from "../../styles/sizes";

export const fieldsetCss = style({
  border: 0,
  boxShadow: `0 0 0 1px ${borderColors.default}`,
  borderRadius: "4px",
  color: foregroundColors.subtle,
  marginInlineEnd: 0,
  paddingBlockEnd: 0,
  paddingBlockStart: 0,
  paddingInlineEnd: 0,
  paddingInlineStart: 0,
});

export const responsiveFlexStyle = style({
  gap: size[24],

  "@media": {
    [minMediaQuery("tablet")]: {
      gap: size[32],
    },
  },
});

globalStyle(`${responsiveFlexStyle} > *`, {
  flexBasis: "256px",
  flexGrow: 1,
  flexShrink: 0,
});

export const legendPaddingStyle = style({
  padding: "0 1ch",
});
