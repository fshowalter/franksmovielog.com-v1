import { filterCollection, sortNumber, sortString } from "../../utils";

export enum ActionType {
  FILTER_NAME = "FILTER_NAME",
  FILTER_CREDIT_KIND = "FILTER_CREDIT_KIND",
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
  entities: Queries.CastAndCrewItemFragment[],
  sortOrder: SortValue,
): Queries.CastAndCrewItemFragment[] {
  const sortMap: Record<
    SortValue,
    (
      a: Queries.CastAndCrewItemFragment,
      b: Queries.CastAndCrewItemFragment,
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
  allEntities: Queries.CastAndCrewItemFragment[];
  filteredEntities: Queries.CastAndCrewItemFragment[];
  filters: Record<string, (entity: Queries.CastAndCrewItemFragment) => boolean>;
  sortValue: SortValue;
}

export function initState({
  entities,
}: {
  entities: readonly Queries.CastAndCrewItemFragment[];
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

interface FilterCreditKindAction {
  type: ActionType.FILTER_CREDIT_KIND;
  value: string;
}

interface SortAction {
  type: ActionType.SORT;
  value: SortValue;
}

export type Action = FilterNameAction | FilterCreditKindAction | SortAction;

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
        name: (person: Queries.CastAndCrewItemFragment) => {
          return regex.test(person.name);
        },
      };
      filteredEntities = sortEntities(
        filterCollection<Queries.CastAndCrewItemFragment>({
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
    case ActionType.FILTER_CREDIT_KIND: {
      if (action.value === "All") {
        filters = {
          ...state.filters,
        };

        delete filters.credits;
      } else {
        filters = {
          ...state.filters,
          credits: (item: Queries.CastAndCrewItemFragment) => {
            return item.creditedAs.includes(action.value);
          },
        };
      }
      filteredEntities = sortEntities(
        filterCollection<Queries.CastAndCrewItemFragment>({
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
