import { filterCollection } from "./filterCollection";

interface FilterableState<T, S, F> {
  filters: Record<string, (item: T) => boolean>;
  filteredItems: T[];
  allItems: T[];
  sortValue: S;
  showCount: number;
  groupedItems: F;
}

export function buildUpdateFilter<T, S, F>(
  sorter: (items: T[], sortOrder: S) => T[],
  grouper: (items: T[], sortOrder: S) => F
) {
  return function updateFilter(
    currentState: FilterableState<T, S, F>,
    key: string,
    handler: (item: T) => boolean
  ): FilterableState<T, S, F> {
    const filters = {
      ...currentState.filters,
      [key]: handler,
    };

    const filteredItems = sorter(
      filterCollection({
        collection: currentState.allItems,
        filters,
      }),
      currentState.sortValue
    );

    const groupedItems = grouper(
      filteredItems.slice(0, currentState.showCount),
      currentState.sortValue
    );

    return {
      ...currentState,
      filters,
      filteredItems,
      groupedItems,
    };
  };
}
