import { globalStyle, style, styleVariants } from "@vanilla-extract/css";
import { minMediaQuery } from "../../styles/breakpoints";
import { borderColors, foregroundColors } from "../../styles/colors.css";
import { SPACER, gridTemplate } from "../../styles/grid";
import { relativeSize, size } from "../../styles/sizes.css";

export const stillBorderStyle = style({
  border: `solid 12px ${borderColors.default}`,
  clipPath:
    "polygon(3% 0, 7% 1%, 11% 0%, 16% 2%, 20% 0, 23% 2%, 28% 2%, 32% 1%, 35% 1%, 39% 3%, 41% 1%, 45% 0%, 47% 2%, 50% 2%, 53% 0, 58% 2%, 60% 2%, 63% 1%, 65% 0%, 67% 2%, 69% 2%, 73% 1%, 76% 1%, 79% 0, 82% 1%, 85% 0, 87% 1%, 89% 0, 92% 1%, 96% 0, 98% 3%, 99% 3%, 99% 6%, 100% 11%, 98% 15%, 100% 21%, 99% 28%, 100% 32%, 99% 35%, 99% 40%, 100% 43%, 99% 48%, 100% 53%, 100% 57%, 99% 60%, 100% 64%, 100% 68%, 99% 72%, 100% 75%, 100% 79%, 99% 83%, 100% 86%, 100% 90%, 99% 94%, 99% 98%, 95% 99%, 92% 99%, 89% 100%, 86% 99%, 83% 100%, 77% 99%, 72% 100%, 66% 98%, 62% 100%, 59% 99%, 54% 99%, 49% 100%, 46% 98%, 43% 100%, 40% 98%, 38% 100%, 35% 99%, 31% 100%, 28% 99%, 25% 99%, 22% 100%, 19% 99%, 16% 100%, 13% 99%, 10% 99%, 7% 100%, 4% 99%, 2% 97%, 1% 97%, 0% 94%, 1% 89%, 0% 84%, 1% 81%, 0 76%, 0 71%, 1% 66%, 0% 64%, 0% 61%, 0% 59%, 1% 54%, 0% 49%, 1% 45%, 0% 40%, 1% 37%, 0% 34%, 1% 29%, 0% 23%, 2% 20%, 1% 17%, 1% 13%, 0 10%, 1% 6%, 1% 3%)",
  marginBottom: "4.57px",
  backgroundColor: borderColors.default,
});

export const excerptContinueReadingLinkStyle = style({
  color: foregroundColors.muted,
  fontSize: relativeSize[18],
  lineHeight: 1.5,
  letterSpacing: "0.3px",
});

export const dateLetterSpacingStyle = style({
  letterSpacing: "0.046875rem",
});

globalStyle(`${excerptContinueReadingLinkStyle} a[data-continue-reading]`, {
  fontSize: relativeSize[14],
  lineHeight: 1,
  textTransform: "uppercase",
  whiteSpace: "nowrap",
});

export const gridStyle = style({
  display: "grid",
  margin: "0 auto",
  ...gridTemplate<GridAreas, 1>({
    rows: [
      { [size[40]]: SPACER },
      ["date"],
      { [size[24]]: SPACER },
      ["still"],
      { [size[16]]: SPACER },
      { "1fr": ["excerpt"] },
      { [size[40]]: SPACER },
    ],
    columns: ["auto"],
  }),
  "@media": {
    [minMediaQuery("desktop")]: {
      width: "100%",
      ...gridTemplate<GridAreas, 3>({
        rows: [
          { [size[40]]: SPACER },
          ["date", SPACER, "still"],
          { "1fr": ["excerpt", SPACER, "still"] },
          { [size[40]]: SPACER },
        ],
        columns: ["auto", "minmax(64px, 1fr)", "auto"],
      }),
    },
    [minMediaQuery("max")]: {
      width: "100%",
      ...gridTemplate<GridAreas, 5>({
        rows: [
          { [size[40]]: SPACER },
          ["date", SPACER, "excerpt", SPACER, "still"],
          { "1fr": [SPACER, SPACER, "excerpt", SPACER, "still"] },
          { [size[40]]: SPACER },
        ],
        columns: [
          "auto",
          "minmax(64px, 1fr)",
          "auto",
          "minmax(64px, 1fr)",
          "auto",
        ],
      }),
    },
  },
});

const gridAreaStyles = {
  still: {
    gridArea: "still",
  },
  excerpt: {
    gridArea: "excerpt",
    maxWidth: "33rem",
  },
  date: {
    gridArea: "date",
    textAlign: "center" as const,
    "@media": {
      [minMediaQuery("desktop")]: {
        textAlign: "left" as const,
        paddingBottom: "24px",
        lineHeight: "2rem",
      },
    },
  },
};

export type GridAreas = "still" | "excerpt" | "date";

export const gridAreas = styleVariants(gridAreaStyles);
