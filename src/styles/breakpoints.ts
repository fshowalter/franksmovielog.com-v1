export const breakpoints = {
  mobile: {},
  tablet: "510px",
  desktop: "1368px",
  max: "1472px",
};

export type Breakpoint = keyof typeof breakpoints;

export const minMediaQuery = (breakpoint: Exclude<Breakpoint, "mobile">) =>
  `screen and (min-width: ${breakpoints[breakpoint]})`;
