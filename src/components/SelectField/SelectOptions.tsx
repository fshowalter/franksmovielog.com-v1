import { collator } from "../../utils/sort-utils";

/**
 * Renders options for a select.
 */
export default function SelectOptions({
  options,
}: {
  options: readonly string[];
}) {
  const sortedOptions = [...options].sort((a, b) => collator.compare(a, b));

  return (
    <>
      <option key="all" value="All">
        All
      </option>
      {sortedOptions.map((name) => (
        <option key={name} value={name}>
          {name}
        </option>
      ))}
    </>
  );
}
