export const collator = new Intl.Collator("en", {
  sensitivity: "base",
  ignorePunctuation: true,
  numeric: true,
});

export function sortStringAsc(a: string, b: string): number {
  if (a > b) {
    return 1;
  }

  if (a < b) {
    return -1;
  }

  return 0;
}

export function sortStringDesc(a: string, b: string): number {
  return -1 * sortStringAsc(a, b);
}
