/**
 * Takes an array of words and returns a new array that includes (if needed) commas and a conjunction.
 * @param array The array to parse.
 */
export default function toSentenceArray(array: string[]): string[] {
  const words = array.filter(Boolean);

  if (words.length < 2) {
    return words;
  }

  const lastWords = [" and ", words.pop() as string];
  if (words.length === 1) {
    return [...words, ...lastWords];
  }

  return [
    ...words.reduce((prev, curr) => prev.concat(curr, ", "), [] as string[]),
    ...lastWords,
  ];
}
