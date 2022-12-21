import { globalStyle, style } from "@vanilla-extract/css";
import { minMediaQuery } from "../../styles/breakpoints";
import { size } from "../../styles/sizes.css";

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
