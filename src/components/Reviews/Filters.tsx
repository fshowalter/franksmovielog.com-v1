import Select from "react-select";
import {
  backgroundColors,
  borderColors,
  foregroundColors,
} from "../../styles/colors.css";
import { Box } from "../Box";
import { DebouncedInput } from "../DebouncedInput";
import { GradeInput } from "../GradeInput";
import { LabelText } from "../LabelText";
import { SelectField } from "../SelectField";
import { YearInput } from "../YearInput";
import { Action, ActionType, Sort } from "./Reviews.reducer";

export function Filters({
  dispatch,
  sortValue,
  distinctReleaseYears,
  distinctReviewYears,
  distinctGenres,
}: {
  dispatch: React.Dispatch<Action>;
  sortValue: string;
  distinctReviewYears: readonly string[];
  distinctReleaseYears: readonly string[];
  distinctGenres: readonly string[];
}) {
  return (
    <>
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
      <YearInput
        label="Review Year"
        years={distinctReviewYears}
        onYearChange={(values) =>
          dispatch({ type: ActionType.FILTER_REVIEW_YEAR, values })
        }
      />
      <GradeInput
        label="Grade"
        onGradeChange={(values) =>
          dispatch({
            type: ActionType.FILTER_GRADE,
            values,
          })
        }
      />
      <Box display="flex" flexDirection="column" textAlign="left">
        <LabelText text="Genres" as="label" htmlFor="genres" />
        <Select
          inputId="genres"
          theme={(theme) => ({
            ...theme,
            borderRadius: 4,
            colors: {
              ...theme.colors,
              neutral0: backgroundColors.subtle,
              neutral20: borderColors.default,
              neutral50: foregroundColors.subtle,
              danger: foregroundColors.accent,
              primary25: backgroundColors.stripe,
            },
          })}
          classNamePrefix="reactSelect"
          isSearchable={false}
          onChange={(e) =>
            dispatch({
              type: ActionType.FILTER_GENRES,
              values: e.map((selection) => selection.value),
            })
          }
          isMulti={true}
          options={distinctGenres.map((genre) => {
            return { value: genre, label: genre };
          })}
        />
      </Box>
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
        <option value="title-asc">Title (A &rarr; Z)</option>
        <option value="title-desc">Title (Z &rarr; A)</option>
        <option value="grade-desc">Grade (Best First)</option>
        <option value="grade-asc">Grade (Worst First)</option>
        <option value="release-date-desc">Release Date (Newest First)</option>
        <option value="release-date-asc">Release Date (Oldest First)</option>
        <option value="review-date-desc">Review Date (Newest First)</option>
        <option value="review-date-asc">Review Date (Oldest First)</option>
      </SelectField>
    </>
  );
}
