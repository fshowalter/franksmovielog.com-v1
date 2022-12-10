import { graphql } from "gatsby";
import { useReducer, useRef } from "react";
import Select from "react-select";
import {
  backgroundColors,
  borderColors,
  foregroundColors,
} from "../../styles/colors.css";
import { HEADER_HEIGHT } from "../../styles/sizes";
import { Box } from "../Box";
import { Button } from "../Button";
import { DebouncedInput } from "../DebouncedInput";
import { Fieldset } from "../Fieldset";
import { GradeInput } from "../GradeInput";
import { HeadBuilder } from "../HeadBuilder";
import { LabelText } from "../LabelText";
import { Layout } from "../Layout";
import { Link } from "../Link";
import { Poster, PosterList } from "../PosterList";
import { SelectField, SelectOptions } from "../SelectField";
import { Spacer } from "../Spacer";
import { YearInput } from "../YearInput";
import type { SortType } from "./ReviewsIndexPage.reducer";
import { ActionTypes, initState, reducer } from "./ReviewsIndexPage.reducer";

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

function groupForViewing(
  viewing: Queries.ReviewsIndexViewingFragment,
  sortValue: SortType
): string {
  const shortMonthToLong: { [key: string]: string } = {
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
      return viewing.releaseDate.substring(0, 4);
    }
    case "viewing-date-asc":
    case "viewing-date-desc": {
      const match = viewing.viewingDate.match(
        /[A-Za-z]{3} ([A-Za-z]{3}) \d{1,2}, (\d{4})/
      );
      if (!match) {
        return "Unknown";
      }

      return `${shortMonthToLong[match[1]]} ${match[2]}`;
    }
    case "grade-asc":
    case "grade-desc": {
      return viewing.reviewedMovie?.grade || "Unrated";
    }
    case "title": {
      const letter = viewing.sortTitle.substring(0, 1);

      if (letter.toLowerCase() == letter.toUpperCase()) {
        return "#";
      }

      return viewing.sortTitle.substring(0, 1).toLocaleUpperCase();
    }
    // no default
  }
}

function groupViewings({
  viewings,
  sortValue,
}: {
  viewings: Queries.ReviewsIndexViewingFragment[];
  sortValue: SortType;
}): Map<string, Queries.ReviewsIndexViewingFragment[]> {
  const groupedViewings: Map<string, Queries.ReviewsIndexViewingFragment[]> =
    new Map();

  viewings.map((viewing) => {
    const group = groupForViewing(viewing, sortValue);
    let groupValue = groupedViewings.get(group);

    if (!groupValue) {
      groupValue = [];
      groupedViewings.set(group, groupValue);
    }
    groupValue.push(viewing);
  });

  return groupedViewings;
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

/**
 * Renders the reviews page.
 */
export default function ReviewsIndexPage({
  data,
}: {
  data: Queries.ReviewsIndexPageQuery;
}): JSX.Element {
  const [state, dispatch] = useReducer(
    reducer,
    {
      viewings: [...data.movie.nodes],
    },
    initState
  );

  const listHeader = useRef<HTMLDivElement>(null);

  const groupedViewings = groupViewings({
    viewings: state.filteredViewings.slice(0, state.showCount),
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
          <Box maxWidth="prose">
            <Box as="h1" fontSize="pageTitle">
              Reviews
            </Box>
            <Spacer axis="vertical" size={24} />
            <Box color="subtle">
              <Box as="q" fontWeight="semiBold">
                We have such sights to show you.
              </Box>
              <Spacer axis="vertical" size={16} />
              <p>
                I&apos;ve watched{" "}
                <Box as="span" color="emphasis">
                  {state.allViewings.length.toLocaleString()}
                </Box>{" "}
                movies since 2012 and published{" "}
                <Box as="span" color="emphasis">
                  {data.reviews?.totalCount.toLocaleString()}
                </Box>{" "}
                reviews since 2020.
              </p>
              <Spacer axis="vertical" size={16} />
              <p>
                <Box as="span" fontWeight="semiBold">
                  Looking for something new?
                </Box>
                <br /> Peruse my list of{" "}
                <Link
                  color="accent"
                  textDecoration="none"
                  to="/reviews/underseen/"
                >
                  underseen gems
                </Link>
                .
              </p>
              <Spacer axis="vertical" size={16} />
              <p>
                <Box as="span" fontWeight="semiBold">
                  Feeling contrarian?
                </Box>
                <br />
                Behold my list of{" "}
                <Link
                  color="accent"
                  textDecoration="none"
                  to="/reviews/overrated/"
                >
                  overrated disappointments
                </Link>
                .
              </p>
            </Box>
          </Box>
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
                years={data.movie.releaseYears}
                onYearChange={(values) =>
                  dispatch({ type: ActionTypes.FILTER_RELEASE_YEAR, values })
                }
              />
              <YearInput
                label="Viewing Year"
                years={data.movie.viewingYears}
                onYearChange={(values) =>
                  dispatch({ type: ActionTypes.FILTER_VIEWING_YEAR, values })
                }
              />
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
              <SelectField
                label="Media"
                onChange={(e) =>
                  dispatch({
                    type: ActionTypes.FILTER_VENUE,
                    value: e.target.value,
                  })
                }
              >
                <SelectOptions options={data.movie.media} />
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
                      type: ActionTypes.FILTER_GENRES,
                      values: e.map((selection) => selection.value),
                    })
                  }
                  isMulti={true}
                  options={data.movie.genres.map((genre) => {
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
                    value: e.target.value as SortType,
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
                total={state.filteredViewings.length}
              />
              <Spacer axis="vertical" size={32} />
            </Box>
          </Box>
        </Box>
        <Box
          name="list"
          ref={listHeader}
          display="flex"
          flexDirection="column"
          flexGrow={1}
        >
          <Box as="ol" data-testid="viewings-list" padding={0}>
            {[...groupedViewings].map(([group, viewings], index) => {
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
                    {viewings.map((viewing) => {
                      return (
                        <Poster
                          key={viewing.sequence}
                          title={viewing.title}
                          year={viewing.year}
                          grade={viewing.reviewedMovie?.grade}
                          date={viewing.viewingDate}
                          venue={viewing.venue}
                          medium={viewing.medium}
                          slug={viewing.reviewedMovie?.slug}
                          image={viewing.poster}
                        />
                      );
                    })}
                  </PosterList>
                </Box>
              );
            })}
          </Box>
          <Box display="flex" flexDirection="column" alignItems="center">
            {state.filteredViewings.length > state.showCount && (
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

export const pageQuery = graphql`
  fragment ReviewsIndexViewing on ViewingsJson {
    sequence
    viewingYear
    viewingDate(formatString: "ddd MMM D, YYYY")
    releaseDate
    title
    medium
    venue
    year
    sortTitle
    reviewedMovie {
      slug
      grade
      gradeValue
    }
    genres
    poster {
      childImageSharp {
        gatsbyImageData(
          layout: CONSTRAINED
          formats: [JPG, AVIF]
          quality: 80
          width: 200
          placeholder: TRACED_SVG
        )
      }
    }
  }

  query ReviewsIndexPage {
    reviews: reviewStatsJson(review_year: { eq: "all" }) {
      totalCount: reviewsCreated
    }
    movie: allViewingsJson(sort: { fields: [sequence], order: DESC }) {
      nodes {
        ...ReviewsIndexViewing
      }
      media: distinct(field: medium)
      viewingYears: distinct(field: viewingYear)
      releaseYears: distinct(field: year)
      genres: distinct(field: genres)
    }
  }
`;
