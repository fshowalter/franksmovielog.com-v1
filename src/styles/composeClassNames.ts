export function composeClassNames(...classNames: (string | undefined)[]) {
  const classes = classNames
    .filter((className) => {
      return Boolean(className) && className !== " ";
    })
    .map((className) => {
      return className?.toString().trim();
    }) as string[];

  return classes.length === 0 ? undefined : classes.join(" ");
}
