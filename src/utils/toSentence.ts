export function toSentence(array: readonly string[]): string {
  return new Intl.ListFormat().format(array);
}
