import { useReducer, useRef } from "react";
import Select from "react-select";
import {
  Box,
  Button,
  DebouncedInput,
  Fieldset,
  GradeInput,
  HeadBuilder,
  LabelText,
  Layout,
  Poster,
  PosterList,
  SelectField,
  SelectOptions,
  Spacer,
  YearInput,
} from "..";
import {
  backgroundColors,
  borderColors,
  foregroundColors,
} from "../../styles/colors.css";
import { HEADER_HEIGHT } from "../../styles/sizes.css";
import type { Sort } from "./PosterListWithFilters.reducer";
import {
  ActionTypes,
  initState,
  reducer,
} from "./PosterListWithFilters.reducer";

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

function groupForItem(
  item: IPosterListWithFiltersItem,
  sortValue: Sort
): string {
  const shortMonthToLong: Record<string, string> = {
    Jan: "January",
    Feb: "February",
    Mar: "March",
    Apr: "April",
    May: "May",
    Jun: "June",
    Jul: "July",
    Aug: "August",
    Sep: "September",
    Oct: "October",
    Nov: "November",
    Dec: "December",
  };

  switch (sortValue) {
    case "release-date-asc":
    case "release-date-desc": {
      return item.releaseDate.substring(0, 4);
    }
    case "viewing-date-asc":
    case "viewing-date-desc": {
      if (!item.viewingDate) {
        return "";
      }
      const match = item.viewingDate.match(
        /[A-Za-z]{3} ([A-Za-z]{3}) \d{1,2}, (\d{4})/
      );
      if (!match) {
        return "Unknown";
      }

      return `${shortMonthToLong[match[1]]} ${match[2]}`;
    }
    case "grade-asc":
    case "grade-desc": {
      return item.grade ?? "Unrated";
    }
    case "title": {
      const letter = item.sortTitle.substring(0, 1);

      if (letter.toLowerCase() == letter.toUpperCase()) {
        return "#";
      }

      return item.sortTitle.substring(0, 1).toLocaleUpperCase();
    }
    // no default
  }
}

function groupItems({
  items,
  sortValue,
}: {
  items: IPosterListWithFiltersItem[];
  sortValue: Sort;
}): Map<string, IPosterListWithFiltersItem[]> {
  const groupedItems = new Map<string, IPosterListWithFiltersItem[]>();

  items.map((item) => {
    const group = groupForItem(item, sortValue);
    let groupValue = groupedItems.get(group);

    if (!groupValue) {
      groupValue = [];
      groupedItems.set(group, groupValue);
    }
    groupValue.push(item);
  });

  return groupedItems;
}

export function Head(): JSX.Element {
  return (
    <HeadBuilder
      pageTitle="Reviews"
      description="A sortable and filterable list of every movie I've watched and reviewed since 2012."
      image={null}
      article={false}
    />
  );
}

export function PosterListWithFilters({
  items,
  children,
  distinctMedia,
  distinctGrades,
  distinctReleaseYears,
  distinctViewingYears,
  distinctGenres,
  initialSort,
}: {
  items: readonly IPosterListWithFiltersItem[];
  children: React.ReactNode;
  distinctMedia?: readonly string[];
  distinctViewingYears?: readonly string[];
  distinctReleaseYears: readonly string[];
  distinctGenres: readonly string[];
  distinctGrades?: readonly (string | null)[];
  initialSort: Sort;
}): JSX.Element {
  const [state, dispatch] = useReducer(
    reducer,
    {
      items: [...items],
      sort: initialSort,
    },
    initState
  );

  const listHeader = useRef<HTMLDivElement>(null);

  const groupedItems = groupItems({
    items: state.filteredItems.slice(0, state.showCount),
    sortValue: state.sortValue,
  });

  return (
    <Layout>
      <Box
        as="main"
        display="flex"
        flexDirection={{ default: "column", desktop: "row" }}
        paddingX={{ default: 0, desktop: "gutter" }}
        columnGap={64}
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          paddingX={{ default: "gutter", desktop: 0 }}
          paddingTop={32}
          flexBasis={320}
        >
          <Box maxWidth="prose">{children}</Box>
          <Spacer axis="vertical" size={32} />
          <Box>
            <Fieldset legend="Filter & Sort">
              <DebouncedInput
                label="Title"
                placeholder="Enter all or part of a title"
                onInputChange={(value) =>
                  dispatch({ type: ActionTypes.FILTER_TITLE, value })
                }
              />
              <YearInput
                label="Release Year"
                years={distinctReleaseYears}
                onYearChange={(values) =>
                  dispatch({ type: ActionTypes.FILTER_RELEASE_YEAR, values })
                }
              />
              {distinctViewingYears && (
                <YearInput
                  label="Viewing Year"
                  years={distinctViewingYears}
                  onYearChange={(values) =>
                    dispatch({ type: ActionTypes.FILTER_VIEWING_YEAR, values })
                  }
                />
              )}
              {distinctGrades && (
                <GradeInput
                  label="Grade"
                  onGradeChange={(values, includeNonReviewed) =>
                    dispatch({
                      type: ActionTypes.FILTER_GRADE,
                      values,
                      includeNonReviewed,
                    })
                  }
                />
              )}
              {distinctMedia && (
                <SelectField
                  label="Medium"
                  onChange={(e) =>
                    dispatch({
                      type: ActionTypes.FILTER_VENUE,
                      value: e.target.value,
                    })
                  }
                >
                  <SelectOptions options={distinctMedia} />
                </SelectField>
              )}
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
                      type: ActionTypes.FILTER_GENRES,
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
                    type: ActionTypes.SORT,
                    value: e.target.value as Sort,
                  })
                }
              >
                <option value="viewing-date-desc">
                  Viewing Date (Newest First)
                </option>
                <option value="viewing-date-asc">
                  Viewing Date (Oldest First)
                </option>
                <option value="release-date-desc">
                  Release Date (Newest First)
                </option>
                <option value="release-date-asc">
                  Release Date (Oldest First)
                </option>
                <option value="title">Title</option>
                <option value="grade-desc">Grade (Best First)</option>
                <option value="grade-asc">Grade (Worst First)</option>
              </SelectField>
            </Fieldset>
            <Box color="subtle" paddingX="gutter" textAlign="center">
              <Spacer axis="vertical" size={32} />
              <ListInfo
                visible={state.showCount}
                total={state.filteredItems.length}
              />
              <Spacer axis="vertical" size={32} />
            </Box>
          </Box>
        </Box>
        <Box
          name="list"
          innerRef={listHeader}
          display="flex"
          flexDirection="column"
          flexGrow={1}
        >
          <Box as="ol" data-testid="poster-list" padding={0}>
            {[...groupedItems].map(([group, items], index) => {
              return (
                <Box as="li" key={group} display="block">
                  <Box
                    fontSize="groupHeading"
                    style={{ zIndex: index + 100 }}
                    paddingTop={{ default: 0, desktop: 16 }}
                    position="sticky"
                    backgroundColor="default"
                    top={{ default: 0, desktop: HEADER_HEIGHT }}
                  >
                    <Box
                      backgroundColor="canvas"
                      paddingY={8}
                      paddingX={{ default: "gutter", desktop: 24 }}
                    >
                      {group}
                    </Box>
                  </Box>
                  <Spacer axis="vertical" size={16} />
                  <PosterList
                    paddingLeft={{ default: "gutter", desktop: 24 }}
                    paddingRight={{ default: "gutter", desktop: 0 }}
                  >
                    {items.map((item) => {
                      return (
                        <Poster
                          key={item.sequence ?? item.imdbId}
                          title={item.title}
                          year={item.year}
                          grade={item.grade}
                          date={item.viewingDate}
                          venue={item.venue}
                          medium={item.medium}
                          slug={item.slug}
                          image={item.poster}
                        />
                      );
                    })}
                  </PosterList>
                </Box>
              );
            })}
          </Box>
          <Box display="flex" flexDirection="column" alignItems="center">
            {state.filteredItems.length > state.showCount && (
              <>
                <Spacer axis="vertical" size={32} />
                <Button
                  paddingX="gutter"
                  onClick={() => dispatch({ type: ActionTypes.SHOW_MORE })}
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

export interface IPosterListWithFiltersItem {
  sequence?: number;
  imdbId?: string;
  viewingYear?: number;
  viewingDate?: string;
  releaseDate: string;
  title: string;
  medium?: string | null;
  venue?: string | null;
  year: number;
  sortTitle: string;
  genres: readonly string[];
  slug: string | null;
  grade: string | null;
  gradeValue: number | null;
  poster: {
    childImageSharp: {
      gatsbyImageData: import("gatsby-plugin-image").IGatsbyImageData;
    } | null;
  };
}
