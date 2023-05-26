import { useReducer, useRef } from "react";
import Select from "react-select";
import { Box } from "../Box";
import { Button } from "../Button";
import { DebouncedInput } from "../DebouncedInput";
import { Fieldset } from "../Fieldset";
import { LabelText } from "../LabelText";
import { Layout } from "../Layout";
import { SelectField, SelectOptions } from "../SelectField";
import { Spacer } from "../Spacer";
import { YearInput } from "../YearInput";
import { CalendarPoster, CalendarPosterList } from "./CalendarPosterList";

import {
  backgroundColors,
  borderColors,
  foregroundColors,
} from "../../styles/colors.css";
import {
  dateFontStyle,
  dayFontStyle,
  stickyCalendarStyle,
  stickyFiltersStyle,
  stickyHeaderStyle,
  stickyListInfoStyle,
} from "./ViewingsPage.css";
import type { Sort } from "./ViewingsPage.reducer";
import { ActionType, initState, reducer } from "./ViewingsPage.reducer";

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

function groupItems({
  items,
}: {
  items: IViewing[];
  sortValue: Sort;
}): Map<string, Map<string, IViewing[]>> {
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

  const groupedItems = new Map<string, Map<string, IViewing[]>>();

  items.map((item) => {
    const monthYearGroup = `${shortMonthToLong[item.viewingMonth]} ${
      item.viewingYear
    }`;

    let groupValue = groupedItems.get(monthYearGroup);

    if (!groupValue) {
      groupValue = new Map<string, IViewing[]>();
      groupedItems.set(monthYearGroup, groupValue);
    }

    const dayGroup = `${item.viewingDay}-${item.viewingDate}`;

    let dayGroupValue = groupValue.get(dayGroup);

    if (!dayGroupValue) {
      dayGroupValue = [];
      groupValue.set(dayGroup, dayGroupValue);
    }

    dayGroupValue.push(item);
  });

  return groupedItems;
}

export function ViewingsPage({
  items,
  children,
  distinctMedia,
  distinctVenues,
  distinctReleaseYears,
  distinctViewingYears,
  distinctGenres,
  initialSort,
}: {
  items: readonly IViewing[];
  children: React.ReactNode;
  distinctMedia: readonly string[];
  distinctVenues: readonly string[];
  distinctViewingYears: readonly string[];
  distinctReleaseYears: readonly string[];
  distinctGenres: readonly string[];
  initialSort: Sort;
}): JSX.Element {
  const is = initState({
    items: [...items],
    sort: initialSort,
  });

  const [state, dispatch] = useReducer(reducer, is);

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
        paddingX={{ default: 0, desktop: "pageMargin" }}
        columnGap={64}
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
                value={state.sortValue}
                label="Order By"
                onChange={(e) =>
                  dispatch({
                    type: ActionType.SORT,
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
          <Box as="ol" data-testid="poster-list">
            {[...groupedItems].map(([monthAndYear, days], index) => {
              return (
                <Box as="li" key={monthAndYear} display="block">
                  <Box
                    fontSize="medium"
                    style={{ zIndex: index + 100 }}
                    paddingTop={{ default: 0, desktop: 16 }}
                    backgroundColor="default"
                    className={stickyHeaderStyle}
                  >
                    <Box
                      backgroundColor="canvas"
                      paddingY={8}
                      paddingX={{ default: "gutter", desktop: 24 }}
                    >
                      {monthAndYear}
                    </Box>
                  </Box>
                  <Spacer axis="vertical" size={{ default: 0, tablet: 16 }} />
                  <CalendarPosterList>
                    {[...days].map(([dayDate, items]) => {
                      const [day, date] = dayDate.split("-");
                      return (
                        <Box
                          as="li"
                          key={dayDate}
                          paddingLeft={{ default: "gutter", desktop: 16 }}
                          paddingTop={16}
                          display="flex"
                          flexDirection="row"
                          columnGap={{ default: 16, tablet: 24 }}
                          backgroundColor="zebra"
                        >
                          <Box
                            alignSelf="flex-start"
                            className={stickyCalendarStyle}
                          >
                            <Box boxShadow="borderAll" borderRadius={4}>
                              <Box
                                backgroundColor="canvas"
                                textAlign="center"
                                width={{ default: 40 }}
                                paddingY={{ default: 4 }}
                                textTransform="uppercase"
                                className={dayFontStyle}
                              >
                                {day}
                              </Box>
                              <Box textAlign="center" className={dateFontStyle}>
                                {date}
                              </Box>
                            </Box>
                          </Box>
                          <Box
                            as="ul"
                            display="flex"
                            flexDirection="column"
                            rowGap={16}
                            flexGrow={1}
                          >
                            {items.map((item) => {
                              return (
                                <CalendarPoster
                                  key={item.sequence}
                                  title={item.title}
                                  year={item.year}
                                  venue={item.venue}
                                  medium={item.medium}
                                  slug={item.slug}
                                  image={item.poster}
                                />
                              );
                            })}
                          </Box>
                        </Box>
                      );
                    })}
                  </CalendarPosterList>
                  <Spacer axis="vertical" size={{ default: 0, tablet: 32 }} />
                </Box>
              );
            })}
          </Box>
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

export interface IViewing {
  sequence: number;
  viewingYear: number;
  viewingDay: string;
  viewingDate: string;
  viewingMonth: string;
  releaseDate: string;
  title: string;
  medium: string | null;
  venue: string | null;
  year: number;
  sortTitle: string;
  genres: readonly string[];
  slug: string | null;
  poster: {
    childImageSharp: {
      gatsbyImageData: import("gatsby-plugin-image").IGatsbyImageData;
    } | null;
  };
}
