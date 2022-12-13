import { applyFilters } from "../../utils/applyFilters";
import { sortNumberDesc, sortStringAsc } from "../../utils/sort-utils";

export enum ActionType {
  FILTER_NAME = "FILTER_NAME",
  SORT = "SORT",
}

export type SortValue = "name" | "reviews";

function sortEntities(
  entities: Queries.WatchlistEntitiesViewItemFragment[],
  sortOrder: SortValue
): Queries.WatchlistEntitiesViewItemFragment[] {
  const sortMap: Record<
    SortValue,
    (
      a: Queries.WatchlistEntitiesViewItemFragment,
      b: Queries.WatchlistEntitiesViewItemFragment
    ) => number
  > = {
    name: (a, b) => sortStringAsc(a.name, b.name),
    reviews: (a, b) => sortNumberDesc(a.reviewCount, b.reviewCount),
  };

  const comparer = sortMap[sortOrder];

  return entities.sort(comparer);
}

/**
 * The page state.
 */
interface State {
  /** All possible reviews. */
  allEntities: Queries.WatchlistEntitiesViewItemFragment[];
  /** People matching the current filters. */
  filteredEntities: Queries.WatchlistEntitiesViewItemFragment[];
  /** The active filters. */
  filters: Record<
    string,
    (entity: Queries.WatchlistEntitiesViewItemFragment) => boolean
  >;
  /** The active sort value. */
  sortValue: SortValue;
}

export function initState({
  entities,
}: {
  entities: readonly Queries.WatchlistEntitiesViewItemFragment[];
}): State {
  return {
    allEntities: [...entities],
    filteredEntities: [...entities],
    filters: {},
    sortValue: "name",
  };
}

/** Action to filter by title. */
interface FilterNameAction {
  type: ActionType.FILTER_NAME;
  /** The value to filter on. */
  value: string;
}

interface SortAction {
  type: ActionType.SORT;
  /** The sorter to apply. */
  value: SortValue;
}

export type Action = FilterNameAction | SortAction;

/**
 * Applies the given action to the given state, returning a new State object.
 * @param state The current state.
 * @param action The action to apply.
 */
export function reducer(state: State, action: Action): State {
  let filters;
  let filteredEntities;

  switch (action.type) {
    case ActionType.FILTER_NAME: {
      const regex = new RegExp(action.value, "i");
      filters = {
        ...state.filters,
        name: (person: Queries.WatchlistEntitiesViewItemFragment) => {
          return regex.test(person.name);
        },
      };
      filteredEntities = sortEntities(
        applyFilters<Queries.WatchlistEntitiesViewItemFragment>({
          collection: state.allEntities,
          filters,
        }),
        state.sortValue
      );
      return {
        ...state,
        filters,
        filteredEntities,
      };
    }
    case ActionType.SORT: {
      filteredEntities = sortEntities(state.filteredEntities, action.value);
      return {
        ...state,
        sortValue: action.value,
        filteredEntities,
      };
    }
    // no default
  }
}
