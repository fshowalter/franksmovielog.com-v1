import { DebouncedInput } from "../DebouncedInput";
import { SelectField } from "../SelectField";
import { Action, ActionType, SortValue } from "./Collections.reducer";

export function Filters({
  dispatch,
  sortValue,
}: {
  dispatch: React.Dispatch<Action>;
  sortValue: SortValue;
}): JSX.Element {
  return (
    <>
      <DebouncedInput
        label="Name"
        placeholder="Enter all or part of a name"
        onInputChange={(value) =>
          dispatch({ type: ActionType.FILTER_NAME, value })
        }
      />
      <SelectField
        value={sortValue}
        label="Order By"
        onChange={(e) =>
          dispatch({
            type: ActionType.SORT,
            value: e.target.value as SortValue,
          })
        }
      >
        <option value="name-asc">Name (A &rarr; Z)</option>
        <option value="name-desc">Name (Z &rarr; A)</option>
        <option value="title-count-desc">Title Count (Most First)</option>
        <option value="title-count-asc">Title Count (Fewest First)</option>
        <option value="review-count-desc">Review Count (Most First)</option>
        <option value="review-count-asc">Review Count (Fewest First)</option>
      </SelectField>
    </>
  );
}
