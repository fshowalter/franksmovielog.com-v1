export const breakpoints = {
  mobile: 0,
  tablet: "48rem",
  desktop: "64rem",
  max: "85.998125rem",
};

export type Breakpoint = keyof typeof breakpoints;

export const minMediaQuery = (breakpoint: Exclude<Breakpoint, "mobile">) =>
  `screen and (min-width: ${breakpoints[breakpoint]})`;
