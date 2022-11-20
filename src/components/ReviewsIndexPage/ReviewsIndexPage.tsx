import { graphql, Link } from "gatsby";
import { IGatsbyImageData } from "gatsby-plugin-image";
import { useReducer, useRef } from "react";
import Select from "react-select";
import Button from "../Button";
import DebouncedInput from "../DebouncedInput/DebouncedInput";
import Fieldset from "../Fieldset";
import FilterPageHeader from "../FilterPageHeader";
import GradeInput from "../GradeInput";
import HeadBuilder from "../HeadBuilder";
import Layout from "../Layout";
import { Poster, PosterList } from "../PosterList";
import { SelectField, SelectOptions } from "../SelectField";
import YearInput from "../YearInput";
import {
  calloutCss,
  containerCss,
  filtersCss,
  genresSelectLabelCss,
  genresWrapCss,
  leftCss,
  listHeaderGroupCss,
  listInfoCss,
  pageHeaderCss,
  quoteCss,
  rightCss,
  showMoreCss,
} from "./ReviewsIndexPage.module.scss";
import type { SortType } from "./ReviewsIndexPage.reducer";
import reducer, { ActionTypes, initState } from "./ReviewsIndexPage.reducer";

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

  return <div className={listInfoCss}>{showingText}</div>;
}

function groupForViewing(movie: Movie, sortValue: SortType): string {
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
      return movie.releaseDate.substring(0, 4);
    }
    case "viewing-date-asc":
    case "viewing-date-desc": {
      const match = movie.viewingDate.match(
        /[A-Za-z]{3} ([A-Za-z]{3}) \d{1,2}, (\d{4})/
      );
      if (!match) {
        return "Unknown";
      }

      return `${shortMonthToLong[match[1]]} ${match[2]}`;
    }
    case "grade-asc":
    case "grade-desc": {
      return movie.reviewedMovie?.grade || "Unrated";
    }
    case "title": {
      const letter = movie.sortTitle.substring(0, 1);

      if (letter.toLowerCase() == letter.toUpperCase()) {
        return "#";
      }

      return movie.sortTitle.substring(0, 1).toLocaleUpperCase();
    }
    // no default
  }
}

function groupViewings({
  viewings,
  sortValue,
}: {
  viewings: Movie[];
  sortValue: SortType;
}): Map<string, Movie[]> {
  const groupedViewings: Map<string, Movie[]> = new Map();

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
  data: PageQueryResult;
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
      <main className={containerCss}>
        <div className={leftCss}>
          <FilterPageHeader
            className={pageHeaderCss}
            heading="Reviews"
            tagline={
              <>
                <q className={quoteCss}>We have such sights to show you.</q>
                <p>
                  I&apos;ve watched{" "}
                  <span className={calloutCss}>
                    {state.allViewings.length.toLocaleString()}
                  </span>{" "}
                  movies since 2012 and published{" "}
                  <span className={calloutCss}>
                    {data.reviews.totalCount.toLocaleString()}
                  </span>{" "}
                  reviews since 2020.
                </p>
                <p>
                  <b>Looking for something new?</b>
                  <br /> Peruse my list of{" "}
                  <Link to="/reviews/underseen/">underseen gems</Link>.
                </p>

                <p>
                  <b>Feeling contrarian?</b>
                  <br />
                  Behold my list of{" "}
                  <Link to="/reviews/overrated/">
                    overrated disappointments
                  </Link>
                  .
                </p>
              </>
            }
          />
          <div className={filtersCss}>
            <Fieldset legend="Filter & Sort">
              <DebouncedInput
                label="Title"
                placeholder="Enter all or part of a title"
                onChange={(value) =>
                  dispatch({ type: ActionTypes.FILTER_TITLE, value })
                }
              />
              <YearInput
                label="Release Year"
                years={data.movie.releaseYears}
                onChange={(values) =>
                  dispatch({ type: ActionTypes.FILTER_RELEASE_YEAR, values })
                }
              />
              <YearInput
                label="Viewing Year"
                years={data.movie.viewingYears}
                onChange={(values) =>
                  dispatch({ type: ActionTypes.FILTER_VIEWING_YEAR, values })
                }
              />
              <GradeInput
                label="Grade"
                onChange={(values, includeNonReviewed) =>
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
              <div className={genresWrapCss}>
                <label htmlFor="genres" className={genresSelectLabelCss}>
                  Genres
                </label>
                <Select
                  inputId="genres"
                  theme={(theme) => ({
                    ...theme,
                    borderRadius: 4,
                    colors: {
                      ...theme.colors,
                      neutral0: "var(--color-bg-subtle)",
                      neutral20: "var(--color-border-default)",
                      neutral50: "var(--color-fg-subtle)",
                      danger: "var(--color-fg-accent)",
                      primary25: "var(--color-bg-stripe)",
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
              </div>
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
            <div className={listInfoCss}>
              <ListInfo
                visible={state.showCount}
                total={state.filteredViewings.length}
              />
            </div>
          </div>
        </div>
        <div className={rightCss} ref={listHeader}>
          <ol data-testid="viewings-list">
            {[...groupedViewings].map(([group, viewings], index) => {
              return (
                <li key={group}>
                  <div
                    className={listHeaderGroupCss}
                    style={{ zIndex: index + 100 }}
                  >
                    {group}
                  </div>
                  <PosterList>
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
                </li>
              );
            })}
          </ol>
          <div className={showMoreCss}>
            {state.filteredViewings.length > state.showCount && (
              <Button onClick={() => dispatch({ type: ActionTypes.SHOW_MORE })}>
                <svg
                  focusable="false"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"></path>
                </svg>
                Show More
              </Button>
            )}
          </div>
        </div>
      </main>
    </Layout>
  );
}

export interface Movie {
  title: string;
  year: number;
  releaseDate: string;
  viewingDate: string;
  viewingYear: number;
  sequence: number;
  venue: string;
  medium: string;
  sortTitle: string;
  genres: string[];
  reviewedMovie: {
    slug: string;
    grade: string;
    gradeValue: number;
  } | null;
  poster: {
    childImageSharp: {
      gatsbyImageData: IGatsbyImageData;
    };
  };
}

interface PageQueryResult {
  reviews: {
    totalCount: number;
  };
  movie: {
    nodes: Movie[];
    viewingYears: string[];
    releaseYears: string[];
    genres: string[];
    media: string[];
  };
}

export const pageQuery = graphql`
  query {
    reviews: reviewStatsJson(review_year: { eq: "all" }) {
      totalCount: reviews_created
    }
    movie: allViewingsJson(sort: { fields: [sequence], order: DESC }) {
      nodes {
        sequence
        viewingYear: viewing_year
        viewingDate: viewing_date(formatString: "ddd MMM D, YYYY")
        releaseDate: release_date
        title
        medium
        venue
        year
        sortTitle: sort_title
        reviewedMovie {
          slug
          grade
          gradeValue: grade_value
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
      media: distinct(field: medium)
      viewingYears: distinct(field: viewing_year)
      releaseYears: distinct(field: year)
      genres: distinct(field: genres)
    }
  }
`;
