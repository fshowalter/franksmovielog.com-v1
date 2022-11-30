import { style } from "@vanilla-extract/css";
import { minMediaQuery } from "../../styles/breakpoints";
import { spacing } from "../../styles/spacing";

export const gridContainerStyle = style({
  display: "grid",
  gridArea: "header",
  gridTemplateAreas: `". . ." ". logo ." ". tagline ." ". . ." ". search ." ". . ." ". nav ." ". . ."`,
  gridTemplateColumns:
    "minmax(var(--layout-grid-margin), 1fr) minmax(auto, 520px) minmax(var(--layout-grid-margin), 1fr)",
  gridTemplateRows:
    "layout.$spacer-4 auto auto layout.$spacer-4 auto layout.$spacer-4 auto layout.$spacer-4 - 1",
  justifyItems: "center",
  "@media": {
    [minMediaQuery("desktop")]: {
      columnGap: spacing[8],
      gridTemplateAreas: `"logo search" "tagline . " ". ." "nav nav" ". ."`,
      gridTemplateColumns: "auto",
      gridTemplateRows: `auto auto ${spacing[5]} auto ${spacing[6]}`,
      justifyItems: "start",
    },
    [minMediaQuery("max")]: {
      columnGap: "unset",
      gridTemplateAreas: `"logo logo logo" "tagline tagline tagline" ". . ." "search search search" ". . ." ". nav ."`,
      gridTemplateColumns: `${spacing[3]} auto ${spacing[2]}`,
      gridTemplateRows: `auto auto ${spacing[4]} auto ${spacing[7]}`,
      justifyItems: "start",
      position: "sticky",
      top: spacing[7],
    },
  },
});

export const gridAreaTitleStyle = style({
  gridArea: "logo",
});

export const gridAreaTaglineStyle = style({
  gridArea: "tagline",
});

export const gridAreaSearchStyle = style({
  gridArea: "search",
});

export const gridAreaNavStyle = style({
  gridArea: "nav",
  justifySelf: "stretch",
});

export const taglineStyle = style({
  fontStyle: "italic",
  "@media": {
    [minMediaQuery("desktop")]: {
      fontSize: "15px",
      paddingLeft: "1px",
    },
  },
});
