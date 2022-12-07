export const size = {
  px: "1px",
  full: "100%",
  half: "50%",
  0: 0,
  4: "4px",
  8: "8px",
  16: "16px",
  24: "24px",
  32: "32px",
  40: "40px",
  48: "48px",
  64: "64px",
  80: "80px",
  96: "96px",
  112: "112px",
  128: "128px",
};

export const GUTTER = "clamp(20px, 4vw, 64px)";

export const GRID = {
  GUTTER: `minmax(${GUTTER}, 1fr)`,
};

export const MAX_STILL_WIDTH = "992px";
export const MAX_POSTER_WIDTH = "248px";
export const PROSE_CONTENT_WIDTH = "max(32.5em, 60ch)";
export const PROSE_CONTENT_WIDTH_WITH_GUTTERS = `max(calc((${GUTTER} * 2) + 32.5em), calc((${GUTTER} * 2) + 60ch))`;
export const MAX_CONTENT_WIDTH_WITH_GUTTERS = `calc((${GUTTER} * 2) + ${MAX_STILL_WIDTH})`;

export const relativeSize = {
  0: 0,
  0.25: "0.25rem",
  0.5: ".5rem",
  1: "1rem",
  1.5: "1.5rem",
  2: "2rem",
  2.5: "2.5rem",
  3: "3rem",
  4: "4rem",
  5: "5rem",
  6: "6rem",
  7: "7rem",
  8: "8rem",
};
