import { graphql, Link } from "gatsby";
import { IGatsbyImageData } from "gatsby-plugin-image";
import React, { useReducer, useRef } from "react";
import Select from "react-select";
import Button from "../Button";
import DebouncedInput from "../DebouncedInput/DebouncedInput";
import Fieldset from "../Fieldset";
import FilterPageHeader from "../FilterPageHeader";
import Layout from "../Layout";
import { Poster, PosterList } from "../PosterList";
import { SelectField } from "../SelectField";
import Seo from "../Seo";
import YearInput from "../YearInput";
import {
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
} from "./UnderseenGemsPage.module.scss";
import type { SortType } from "./UnderseenGemsPage.reducer";
import reducer, { ActionTypes, initState } from "./UnderseenGemsPage.reducer";

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

function groupForMovie(movie: Movie, sortValue: SortType): string {
  switch (sortValue) {
    case "release-date-asc":
    case "release-date-desc": {
      return movie.releaseDate.substring(0, 4);
    }
    case "grade-asc":
    case "grade-desc": {
      return movie.grade || "Unrated";
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

function groupMovies({
  movies,
  sortValue,
}: {
  movies: Movie[];
  sortValue: SortType;
}): Map<string, Movie[]> {
  const groupedMovies: Map<string, Movie[]> = new Map();

  movies.map((movie) => {
    const group = groupForMovie(movie, sortValue);
    let groupValue = groupedMovies.get(group);

    if (!groupValue) {
      groupValue = [];
      groupedMovies.set(group, groupValue);
    }
    groupValue.push(movie);
  });

  return groupedMovies;
}

/**
 * Renders the underseen gems page.
 */
export default function UnderseenGemsPage({
  data,
}: {
  data: PageQueryResult;
}): JSX.Element {
  const [state, dispatch] = useReducer(
    reducer,
    {
      movies: [...data.movie.nodes],
    },
    initState
  );

  const listHeader = useRef<HTMLDivElement>(null);

  const groupedMovies = groupMovies({
    movies: state.filteredMovies.slice(0, state.showCount),
    sortValue: state.sortValue,
  });

  return (
    <Layout>
      <Seo
        pageTitle="Underseen Gems"
        description="Four and five star movies with a below average number of votes on the IMDb."
        image={null}
        article={false}
      />
      <main className={containerCss}>
        <div className={leftCss}>
          <FilterPageHeader
            className={pageHeaderCss}
            heading="Underseen Gems"
            breadcrumb={
              <div>
                <Link to="/reviews/">Reviews</Link>
              </div>
            }
            tagline={
              <>
                <q className={quoteCss}>My God, it&apos;s full of stars!</q>
                <p>
                  Four and five star movies with a below average number of IMDb
                  votes.
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
                total={state.filteredMovies.length}
              />
            </div>
          </div>
        </div>
        <div className={rightCss} ref={listHeader}>
          <ol data-testid="movies-list">
            {[...groupedMovies].map(([group, movies], index) => {
              return (
                <li key={group}>
                  <div
                    className={listHeaderGroupCss}
                    style={{ zIndex: index + 100 }}
                  >
                    {group}
                  </div>
                  <PosterList>
                    {movies.map((movie) => {
                      return (
                        <Poster
                          key={movie.imdbId}
                          title={movie.title}
                          year={movie.year}
                          grade={movie.grade}
                          slug={movie.slug}
                          image={movie.poster}
                        />
                      );
                    })}
                  </PosterList>
                </li>
              );
            })}
          </ol>
          <div className={showMoreCss}>
            {state.filteredMovies.length > state.showCount && (
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
  imdbId: string;
  title: string;
  year: number;
  releaseDate: string;
  sortTitle: string;
  genres: string[];
  slug: string;
  grade: string;
  gradeValue: number;
  poster: {
    childImageSharp: {
      gatsbyImageData: IGatsbyImageData;
    };
  };
}

interface PageQueryResult {
  movie: {
    nodes: Movie[];
    releaseYears: string[];
    genres: string[];
  };
}

export const pageQuery = graphql`
  query {
    movie: allUnderseenGemsJson(sort: { fields: [release_date], order: DESC }) {
      nodes {
        imdbId: imdb_id
        releaseDate: release_date
        title
        year
        sortTitle: sort_title
        slug
        grade
        gradeValue
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
      releaseYears: distinct(field: year)
      genres: distinct(field: genres)
    }
  }
`;
