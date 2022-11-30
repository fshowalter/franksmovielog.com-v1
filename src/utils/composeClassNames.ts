export default function composeClassNames(
  ...classNames: Array<string | undefined>
) {
  const classes = classNames
    .filter((className) => {
      return Boolean(className) && className !== " ";
    })
    .map((className) => {
      return className?.toString().trim();
    }) as Array<string>;
  return classes.length === 0 ? undefined : classes.join(" ");
}
