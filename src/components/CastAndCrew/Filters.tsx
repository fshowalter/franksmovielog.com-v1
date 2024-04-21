import { DebouncedInput } from "../DebouncedInput";
import { SelectField } from "../SelectField";
import { Action, ActionType, SortValue } from "./CastAndCrew.reducer";

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
        flexBasis="full"
        label="Credits"
        onChange={(e) =>
          dispatch({
            type: ActionType.FILTER_CREDIT_KIND,
            value: e.target.value,
          })
        }
      >
        <option value="All">All</option>
        <option value="director">Director</option>
        <option value="writer">Writer</option>
        <option value="performer">Performer</option>
      </SelectField>
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
