export const breakpoints = {
  mobile: {},
  tablet: "510px",
  desktop: "1120px",
  max: "1408px",
};

export type Breakpoint = keyof typeof breakpoints;

export const minMediaQuery = (breakpoint: Exclude<Breakpoint, "mobile">) =>
  `screen and (min-width: ${breakpoints[breakpoint]})`;

export function generateMinContainerQuery<T extends string>(
  containerBreakpoints: Record<T, string | number>,
  containerName: string
): (breakpoint: T) => string {
  return (breakpoint: T) => {
    return `${containerName} (min-width: ${containerBreakpoints[breakpoint]})`;
  };
}
