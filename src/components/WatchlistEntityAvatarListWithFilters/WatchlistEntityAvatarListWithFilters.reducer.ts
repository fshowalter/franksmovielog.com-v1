import { applyFilters, sortStringAsc, sortStringDesc } from "../../utils";

export enum ActionType {
  FILTER_NAME = "FILTER_NAME",
  SORT = "SORT",
}

export type SortValue = "name-asc" | "name-desc";

function sortEntities(
  entities: Queries.WatchlistEntityAvatarListItemFragment[],
  sortOrder: SortValue
): Queries.WatchlistEntityAvatarListItemFragment[] {
  const sortMap: Record<
    SortValue,
    (
      a: Queries.WatchlistEntityAvatarListItemFragment,
      b: Queries.WatchlistEntityAvatarListItemFragment
    ) => number
  > = {
    "name-asc": (a, b) => sortStringAsc(a.name, b.name),
    "name-desc": (a, b) => sortStringDesc(a.name, b.name),
  };

  const comparer = sortMap[sortOrder];

  return entities.sort(comparer);
}

/**
 * The page state.
 */
interface State {
  /** All possible reviews. */
  allEntities: Queries.WatchlistEntityAvatarListItemFragment[];
  /** People matching the current filters. */
  filteredEntities: Queries.WatchlistEntityAvatarListItemFragment[];
  /** The active filters. */
  filters: Record<
    string,
    (entity: Queries.WatchlistEntityAvatarListItemFragment) => boolean
  >;
  /** The active sort value. */
  sortValue: SortValue;
}

export function initState({
  entities,
}: {
  entities: readonly Queries.WatchlistEntityAvatarListItemFragment[];
}): State {
  return {
    allEntities: [...entities],
    filteredEntities: [...entities],
    filters: {},
    sortValue: "name-asc",
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
        name: (person: Queries.WatchlistEntityAvatarListItemFragment) => {
          return regex.test(person.name);
        },
      };
      filteredEntities = sortEntities(
        applyFilters<Queries.WatchlistEntityAvatarListItemFragment>({
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
