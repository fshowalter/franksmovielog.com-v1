export interface FilterableState<T, S, G> {
  filters: Record<string, (item: T) => boolean>;
  filteredItems: T[];
  allItems: T[];
  sortValue: S;
  showCount: number;
  groupedItems: G;
}

export function filterTools<T, S, G>(
  sorter: (items: T[], sortOrder: S) => T[],
  grouper: (items: T[], sortOrder: S) => G,
) {
  const applyFilters = buildApplyFilters(sorter, grouper);

  return {
    updateFilter: <State extends FilterableState<T, S, G>>(
      currentState: State,
      key: string,
      handler: (item: T) => boolean,
    ): State => {
      const filters = {
        ...currentState.filters,
        [key]: handler,
      };

      return applyFilters(filters, currentState);
    },
    clearFilter: <State extends FilterableState<T, S, G>>(
      value: string,
      currentState: State,
      key: string,
    ): State | null => {
      if (value != "All") {
        return null;
      }

      const filters = {
        ...currentState.filters,
      };

      delete filters[key]; // eslint-disable-line @typescript-eslint/no-dynamic-delete

      return applyFilters(filters, currentState);
    },
    applyFilters,
  };
}

function buildApplyFilters<T, S, G>(
  sorter: (items: T[], sortOrder: S) => T[],
  grouper: (items: T[], sortOrder: S) => G,
) {
  return function applyFilters<State extends FilterableState<T, S, G>>(
    newFilters: Record<string, (item: T) => boolean>,
    currentState: State,
  ): State {
    const filteredItems = sorter(
      filterCollection({
        collection: currentState.allItems,
        filters: newFilters,
      }),
      currentState.sortValue,
    );

    const groupedItems = grouper(
      filteredItems.slice(0, currentState.showCount),
      currentState.sortValue,
    );

    return {
      ...currentState,
      filters: newFilters,
      filteredItems,
      groupedItems,
    };
  };
}

export function filterCollection<T>({
  collection,
  filters,
}: {
  collection: readonly T[];
  filters: Record<string, (arg0: T) => boolean>;
}): T[] {
  return collection.filter((item) => {
    return Object.values(filters).every((filter) => {
      return filter(item);
    });
  });
}
