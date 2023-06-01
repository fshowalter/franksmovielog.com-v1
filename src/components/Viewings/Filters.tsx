import Select from "react-select";
import { Box } from "../Box";
import { DebouncedInput } from "../DebouncedInput";
import { LabelText } from "../LabelText";
import { SelectField, SelectOptions } from "../SelectField";
import { YearInput } from "../YearInput";

import {
  backgroundColors,
  borderColors,
  foregroundColors,
} from "../../styles/colors.css";
import { Action, ActionType, Sort } from "./Viewings.reducer";

export function Filters({
  dispatch,
  distinctReleaseYears,
  distinctViewingYears,
  distinctGenres,
  distinctVenues,
  distinctMedia,
  sortValue,
}: {
  dispatch: React.Dispatch<Action>;
  distinctReleaseYears: readonly string[];
  distinctViewingYears: readonly string[];
  distinctGenres: readonly string[];
  distinctVenues: readonly string[];
  distinctMedia: readonly string[];
  sortValue: Sort;
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
      <YearInput
        label="Release Year"
        years={distinctReleaseYears}
        onYearChange={(values) =>
          dispatch({ type: ActionType.FILTER_RELEASE_YEAR, values })
        }
      />
      <YearInput
        label="Viewing Year"
        years={distinctViewingYears}
        onYearChange={(values) =>
          dispatch({ type: ActionType.FILTER_VIEWING_YEAR, values })
        }
      />
      <SelectField
        label="Medium"
        onChange={(e) =>
          dispatch({
            type: ActionType.FILTER_MEDIUM,
            value: e.target.value,
          })
        }
      >
        <SelectOptions options={distinctMedia} />
      </SelectField>
      <SelectField
        label="Venue"
        onChange={(e) =>
          dispatch({
            type: ActionType.FILTER_VENUE,
            value: e.target.value,
          })
        }
      >
        <SelectOptions options={distinctVenues} />
      </SelectField>
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
        <option value="viewing-date-desc">Viewing Date (Newest First)</option>
        <option value="viewing-date-asc">Viewing Date (Oldest First)</option>
      </SelectField>
    </>
  );
}
