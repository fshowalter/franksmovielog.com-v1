import applyFilters from "../../utils/apply-filters";
import { sortNumberDesc, sortStringAsc } from "../../utils/sort-utils";
import type { WatchlistEntity } from "./WatchlistEntityIndexPage";

export enum ActionType {
  FILTER_NAME = "FILTER_NAME",
  SORT = "SORT",
}

export type SortValue = "name" | "reviews";

function sortEntities(titles: WatchlistEntity[], sortOrder: SortValue) {
  const sortMap: Record<
    SortValue,
    (a: WatchlistEntity, b: WatchlistEntity) => number
  > = {
    name: (a, b) => sortStringAsc(a.name, b.name),
    reviews: (a, b) => sortNumberDesc(a.reviewCount, b.reviewCount),
  };

  const comparer = sortMap[sortOrder];

  return titles.sort(comparer);
}

/**
 * The page state.
 */
type State = {
  /** All possible reviews. */
  allEntities: WatchlistEntity[];
  /** People matching the current filters. */
  filteredEntities: WatchlistEntity[];
  /** The active filters. */
  filters: Record<string, (entity: WatchlistEntity) => boolean>;
  /** The active sort value. */
  sortValue: SortValue;
};

export function initState({
  entities,
}: {
  entities: WatchlistEntity[];
}): State {
  return {
    allEntities: entities,
    filteredEntities: entities,
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
        name: (person: WatchlistEntity) => {
          return regex.test(person.name);
        },
      };
      filteredEntities = sortEntities(
        applyFilters<WatchlistEntity>({
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
