import { DebouncedInput } from "../DebouncedInput";
import { SelectField, SelectOptions } from "../SelectField";
import { YearInput } from "../YearInput";
import { Action, ActionType, Sort } from "./Watchlist.reducer";

export function Filters({
  dispatch,
  sortValue,
  distinctDirectors,
  distinctPerformers,
  distinctWriters,
  distinctCollections,
  distinctReleaseYears,
}: {
  dispatch: React.Dispatch<Action>;
  sortValue: string;
  distinctDirectors: readonly string[];
  distinctPerformers: readonly string[];
  distinctWriters: readonly string[];
  distinctCollections: readonly string[];
  distinctReleaseYears: readonly string[];
}): JSX.Element {
  return (
    <>
      <DebouncedInput
        label="Title"
        placeholder="Enter all or part of a title"
        onInputChange={(value) =>
          dispatch({ type: ActionType.FILTER_TITLE, value })
        }
      />
      <CreditSelectField
        label="Director"
        dispatch={dispatch}
        actionType={ActionType.FILTER_DIRECTOR}
        options={distinctDirectors}
      />
      <CreditSelectField
        label="Performer"
        dispatch={dispatch}
        actionType={ActionType.FILTER_PERFORMER}
        options={distinctPerformers}
      />
      <CreditSelectField
        label="Writer"
        dispatch={dispatch}
        actionType={ActionType.FILTER_WRITER}
        options={distinctWriters}
      />
      <CreditSelectField
        label="Collection"
        dispatch={dispatch}
        actionType={ActionType.FILTER_COLLECTION}
        options={distinctCollections}
      />
      <YearInput
        label="Release Year"
        years={distinctReleaseYears}
        onYearChange={(values) =>
          dispatch({ type: ActionType.FILTER_RELEASE_YEAR, values })
        }
      />
      <SelectField
        value={sortValue}
        label="Order By"
        onChange={(e) =>
          dispatch({
            type: ActionType.SORT,
            value: e.target.value as Sort,
          })
        }
      >
        <option value="release-date-desc">Release Date (Newest First)</option>
        <option value="release-date-asc">Release Date (Oldest First)</option>
        <option value="title">Title</option>
      </SelectField>
    </>
  );
}

function CreditSelectField({
  label,
  dispatch,
  actionType,
  options,
}: {
  label: string;
  dispatch: React.Dispatch<Action>;
  actionType:
    | ActionType.FILTER_COLLECTION
    | ActionType.FILTER_DIRECTOR
    | ActionType.FILTER_PERFORMER
    | ActionType.FILTER_WRITER;
  options: readonly string[];
}) {
  return (
    <SelectField
      label={label}
      onChange={(e) =>
        dispatch({
          type: actionType,
          value: e.target.value,
        })
      }
    >
      <SelectOptions options={options} />
    </SelectField>
  );
}
