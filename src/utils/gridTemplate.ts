export const SPACER = "SPACER";

function gridAreaTemplateToString<A, C>(template: GridAreaTemplate<A, C>) {
  const templateTransformed = template.map((cell) => {
    if (cell === SPACER) {
      return ".";
    }

    return cell;
  });

  return `"${templateTransformed.join(" ")}"`;
}

type GridAreaTemplate<A, C> = ((A | typeof SPACER)[] & { length: C }) | [never];

type GridAreaTemplateWithSpace<A, C> = Record<
  string,
  typeof SPACER | GridAreaTemplate<A, C>
>;

interface GridTemplateArgs<A, C> {
  rows: (GridAreaTemplateWithSpace<A, C> | GridAreaTemplate<A, C>)[] | [never];
  columns: (readonly string[] & { readonly length: C }) | [never];
}

/**
 * @template A - The literal type comprising valid area names.
 * @template {number} C - The number of intended columns.
 * @returns
 */
export function gridTemplate<A extends string, C extends number>({
  rows,
  columns,
}: GridTemplateArgs<A, C>) {
  const rowsSizes: string[] = [];

  const templateAreas = rows
    .map((row) => {
      if (Array.isArray(row)) {
        rowsSizes.push("auto");
        return gridAreaTemplateToString(row);
      }

      rowsSizes.push(Object.keys(row)[0]);
      const templateArray = Object.values(row)[0];

      if (templateArray === SPACER) {
        return `"${". ".repeat(columns.length).trim()}"`;
      }

      return gridAreaTemplateToString(templateArray);
    })
    .join(" ");

  const templateRows = rowsSizes.join(" ");

  const templateColumns = columns.join(" ");

  return {
    gridTemplateAreas: templateAreas,
    gridTemplateRows: templateRows,
    gridTemplateColumns: templateColumns,
  };
}
