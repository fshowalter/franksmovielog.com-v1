import { filterCollection, sortNumber, sortString } from "../../utils";

export enum ActionType {
  FILTER_NAME = "FILTER_NAME",
  SORT = "SORT",
}

export type SortValue =
  | "name-asc"
  | "name-desc"
  | "title-count-asc"
  | "title-count-desc"
  | "review-count-asc"
  | "review-count-desc";

function sortEntities(
  entities: Queries.CollectionsItemFragment[],
  sortOrder: SortValue,
): Queries.CollectionsItemFragment[] {
  const sortMap: Record<
    SortValue,
    (
      a: Queries.CollectionsItemFragment,
      b: Queries.CollectionsItemFragment,
    ) => number
  > = {
    "name-asc": (a, b) => sortString(a.name, b.name),
    "name-desc": (a, b) => sortString(a.name, b.name) * -1,
    "title-count-asc": (a, b) => sortNumber(a.titleCount, b.titleCount),
    "title-count-desc": (a, b) => sortNumber(a.titleCount, b.titleCount) * -1,
    "review-count-asc": (a, b) => sortNumber(a.reviewCount, b.reviewCount),
    "review-count-desc": (a, b) =>
      sortNumber(a.reviewCount, b.reviewCount) * -1,
  };

  const comparer = sortMap[sortOrder];

  return entities.sort(comparer);
}

interface State {
  allEntities: Queries.CollectionsItemFragment[];
  filteredEntities: Queries.CollectionsItemFragment[];
  filters: Record<string, (entity: Queries.CollectionsItemFragment) => boolean>;
  sortValue: SortValue;
}

export function initState({
  entities,
}: {
  entities: readonly Queries.CollectionsItemFragment[];
}): State {
  return {
    allEntities: [...entities],
    filteredEntities: [...entities],
    filters: {},
    sortValue: "name-asc",
  };
}

interface FilterNameAction {
  type: ActionType.FILTER_NAME;
  value: string;
}

interface SortAction {
  type: ActionType.SORT;
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
        name: (person: Queries.CollectionsItemFragment) => {
          return regex.test(person.name);
        },
      };
      filteredEntities = sortEntities(
        filterCollection<Queries.CollectionsItemFragment>({
          collection: state.allEntities,
          filters,
        }),
        state.sortValue,
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
