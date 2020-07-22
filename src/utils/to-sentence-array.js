export default function toSentenceArray(array) {
  let lastWords;

  if (array.length > 1) {
    lastWords = [" and ", array.pop()];
    if (array.length > 1) {
      lastWords.unshift(",");
    }
  } else {
    return array;
  }

  return [...array.reduce((prev, curr) => [prev, ", ", curr]), ...lastWords];
}
