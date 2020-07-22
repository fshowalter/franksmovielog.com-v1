export const collator = new Intl.Collator("en", {
  sensitivity: "base",
  ignorePunctuation: true,
  numeric: true,
});

export function sortStringAsc(a, b) {
  if (a > b) {
    return 1;
  }

  if (a < b) {
    return -1;
  }

  return 0;
}

export function sortStringDesc(a, b) {
  return -1 * sortStringAsc(a, b);
}
