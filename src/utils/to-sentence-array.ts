/**
 * Takes an array of words and returns a new array that includes (if needed) commas and a conjunction.
 * @param array The array to parse.
 */
export function toSentenceArray(array: readonly string[]): string[] {
  const words = array.filter(Boolean);

  if (words.length < 2) {
    return words;
  }

  const lastWord = words.pop();

  if (!lastWord) {
    return words;
  }

  const lastWords = [" and ", lastWord];
  if (words.length === 1) {
    return [...words, ...lastWords];
  }

  return [
    ...words.reduce<string[]>((prev, curr) => prev.concat(curr, ", "), []),
    ...lastWords,
  ];
}
