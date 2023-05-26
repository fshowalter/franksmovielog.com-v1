import { graphql } from "gatsby";
import { useReducer, useRef } from "react";
import Select from "react-select";
import { Box } from "../Box";
import { Button } from "../Button";
import { DebouncedInput } from "../DebouncedInput";
import { Fieldset } from "../Fieldset";
import { GradeInput } from "../GradeInput";
import { LabelText } from "../LabelText";
import { Layout } from "../Layout";
import { SelectField } from "../SelectField";
import { Spacer } from "../Spacer";
import { YearInput } from "../YearInput";
import { ReviewList } from "./ReviewList";

import {
  backgroundColors,
  borderColors,
  foregroundColors,
} from "../../styles/colors.css";
import { stickyFiltersStyle, stickyListInfoStyle } from "./ReviewIndex.css";
import type { Sort } from "./ReviewIndex.reducer";
import { ActionType, initState, reducer } from "./ReviewIndex.reducer";

function ListInfo({
  visible,
  total,
}: {
  visible: number;
  total: number;
}): JSX.Element {
  let showingText;

  if (visible > total) {
    showingText = `Showing ${total} of ${total}`;
  } else {
    showingText = `Showing 1-${visible} of ${total.toLocaleString()}`;
  }

  return <div>{showingText}</div>;
}

export function ReviewIndex({
  items,
  children,
  distinctReleaseYears,
  distinctReviewYears,
  distinctGenres,
}: {
  items: readonly Queries.ReviewIndexItemFragment[];
  children: React.ReactNode;
  distinctReleaseYears: readonly string[];
  distinctReviewYears: readonly string[];
  distinctGenres: readonly string[];
}): JSX.Element {
  const is = initState({
    items: [...items],
    sort: "title-asc",
  });

  const [state, dispatch] = useReducer(reducer, is);

  const listHeader = useRef<HTMLDivElement>(null);

  return (
    <Layout>
      <Box
        as="main"
        display="flex"
        flexDirection={{ default: "column", desktop: "row" }}
        paddingX={{ default: 0, desktop: "pageMargin" }}
        columnGap={96}
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          paddingX={{ default: "gutter", desktop: 0 }}
          paddingTop={32}
          flexBasis={360}
        >
          <Box maxWidth="prose">{children}</Box>
          <Spacer axis="vertical" size={32} />
          <Box className={stickyFiltersStyle}>
            <Fieldset legend="Filter & Sort">
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
                value={state.sortValue}
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
                <option value="release-date-desc">
                  Release Date (Newest First)
                </option>
                <option value="release-date-asc">
                  Release Date (Oldest First)
                </option>
                <option value="review-date-desc">
                  Review Date (Newest First)
                </option>
                <option value="review-date-asc">
                  Review Date (Oldest First)
                </option>
              </SelectField>
            </Fieldset>
          </Box>
          <Spacer axis="vertical" size={32} />
        </Box>
        <Box
          name="list"
          innerRef={listHeader}
          display="flex"
          flexDirection="column"
          flexGrow={1}
        >
          <Spacer axis="vertical" size={{ default: 0, desktop: 32 }} />
          <Box
            color="subtle"
            paddingX="gutter"
            textAlign="center"
            backgroundColor="default"
            lineHeight={36}
            className={stickyListInfoStyle}
          >
            <ListInfo
              visible={state.showCount}
              total={state.filteredItems.length}
            />
          </Box>
          <ReviewList
            data-testid="poster-list"
            items={state.filteredItems.slice(0, state.showCount)}
            sortValue={state.sortValue}
          />
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            paddingX="pageMargin"
          >
            {state.filteredItems.length > state.showCount && (
              <>
                <Spacer axis="vertical" size={32} />
                <Button
                  paddingX="pageMargin"
                  onClick={() => dispatch({ type: ActionType.SHOW_MORE })}
                  display="flex"
                  columnGap={16}
                >
                  <svg
                    width="24"
                    height="24"
                    focusable="false"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill={foregroundColors.accent}
                  >
                    <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"></path>
                  </svg>
                  Show More...
                </Button>
                <Spacer axis="vertical" size={32} />
              </>
            )}
          </Box>
        </Box>
      </Box>
    </Layout>
  );
}

export const query = graphql`
  fragment ReviewIndexItem on ReviewedMoviesJson {
    year
    imdbId
    reviewDate(formatString: "YYYY-MM-DD")
    releaseDate
    reviewYear: reviewDate(formatString: "YYYY")
    reviewMonth: reviewDate(formatString: "MMMM")
    title
    year
    sortTitle
    slug
    grade
    gradeValue
    genres
    poster {
      ...ReviewListItemPoster
    }
  }
`;
