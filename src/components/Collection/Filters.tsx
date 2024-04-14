import { Box } from "../Box";
import { Button } from "../Button";
import { DebouncedInput } from "../DebouncedInput";
import { SelectField } from "../SelectField";
import { YearInput } from "../YearInput";
import { Action, ActionType, Sort } from "./Collection.reducer";

export function Filters({
  dispatch,
  distinctReleaseYears,
  hideReviewed,
  sortValue,
}: {
  dispatch: React.Dispatch<Action>;
  hideReviewed: boolean;
  distinctReleaseYears: readonly string[];
  sortValue: Sort;
}): JSX.Element {
  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="flex-end"
        flexBasis="full"
        alignItems="center"
      >
        <Button onClick={() => dispatch({ type: ActionType.TOGGLE_REVIEWED })}>
          {hideReviewed ? "Show Reviewed" : "Hide Reviewed"}
        </Button>
      </Box>
      <DebouncedInput
        label="Title"
        placeholder="Enter all or part of a title"
        onInputChange={(value) =>
          dispatch({ type: ActionType.FILTER_TITLE, value })
        }
      />

      <YearInput
        label="Release Year"
        years={distinctReleaseYears}
        onYearChange={(values) =>
          dispatch({ type: ActionType.FILTER_RELEASE_YEAR, values })
        }
      />
      <SelectField
        flexBasis="full"
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
        <option value="grade-desc">Grade (Best First)</option>
        <option value="grade-asc">Grade (Worst First)</option>
      </SelectField>
    </>
  );
}
