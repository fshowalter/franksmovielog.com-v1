import { graphql, Link } from "gatsby";
import React, { useReducer } from "react";
import Button from "../Button";
import DebouncedInput from "../DebouncedInput/DebouncedInput";
import Fieldset from "../Fieldset";
import FilterPageHeader from "../FilterPageHeader";
import Grade from "../Grade";
import Layout from "../Layout";
import RangeInput from "../RangeInput";
import SelectInput from "../SelectInput";
import Seo from "../Seo";
import StatsLink from "../StatsLink";
import {
  containerCss,
  filtersCss,
  leftCss,
  listCss,
  listItemCss,
  listItemGradeCss,
  listItemLetterGradeCss,
  listItemSlugCss,
  listItemTitleCss,
  listItemTitleYearCss,
  pageHeaderCss,
  rightCss,
  toggleGradesButtonCss,
} from "./ReviewsIndexPage.module.scss";
import type { SortType } from "./ReviewsIndexPage.reducer";
import reducer, { ActionType, initState } from "./ReviewsIndexPage.reducer";

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
      reviews: [...data.reviews.nodes],
    },
    initState
  );

  return (
    <Layout>
      <Seo
        pageTitle="All Reviews"
        description="A sortable and filterable list of all movie reviews on this site."
        image={null}
        article={false}
      />
      <main className={containerCss}>
        <div className={leftCss}>
          <FilterPageHeader
            className={pageHeaderCss}
            heading="Reviews"
            tagline={
              <>
                I&apos;ve reviewed {state.allReviews.length} movies since 2020.
                <br />
                <StatsLink to="/reviews/stats/" />
              </>
            }
          />
          <Fieldset className={filtersCss} legend="Filter & Sort">
            <DebouncedInput
              label="Title"
              placeholder="Enter all or part of a title"
              onChange={(value) =>
                dispatch({ type: ActionType.FILTER_TITLE, value })
              }
            />
            <RangeInput
              label="Release Year"
              min={state.minYear}
              max={state.maxYear}
              onChange={(values) =>
                dispatch({ type: ActionType.FILTER_RELEASE_YEAR, values })
              }
            />
            <SelectInput
              value={state.sortValue}
              label="Order By"
              onChange={(e) =>
                dispatch({
                  type: ActionType.SORT,
                  value: e.target.value as SortType,
                })
              }
            >
              <option value="title">Title</option>
              <option value="grade-desc">Grade (Best First)</option>
              <option value="grade-asc">Grade (Worst First)</option>
              <option value="release-date-desc">
                Release Date (Newest First)
              </option>
              <option value="release-date-asc">
                Release Date (Oldest First)
              </option>
            </SelectInput>
          </Fieldset>
          <div className={toggleGradesButtonCss}>
            <Button
              onClick={() => dispatch({ type: ActionType.TOGGLE_GRADES })}
            >
              {state.showGrades ? (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  Show Stars
                </>
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                    />
                  </svg>
                  Show Grades
                </>
              )}
            </Button>
          </div>
        </div>
        <div className={rightCss}>
          <ol data-testid="reviews-list" className={listCss}>
            {state.filteredReviews.map((review) => {
              return (
                <li className={listItemCss} key={review.imdbId}>
                  <Link
                    to={`/reviews/${review.slug}/`}
                    className={listItemTitleCss}
                  >
                    {review.title}{" "}
                    <span className={listItemTitleYearCss}>{review.year}</span>
                  </Link>
                  <div className={listItemSlugCss}>
                    {}
                    {state.showGrades ? (
                      <div className={listItemLetterGradeCss}>
                        {review.lastReviewGrade}
                      </div>
                    ) : (
                      <Grade
                        grade={review.lastReviewGrade}
                        className={listItemGradeCss}
                      />
                    )}
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </main>
    </Layout>
  );
}

interface PageQueryResult {
  reviews: {
    nodes: ReviewedMovie[];
  };
}

export interface ReviewedMovie {
  releaseDate: string;
  lastReviewGrade: string;
  lastReviewGradeValue: number;
  slug: string;
  imdbId: string;
  title: string;
  year: number;
  sortTitle: string;
}

export const query = graphql`
  query {
    reviews: allReviewedMoviesJson(sort: { fields: [sort_title], order: ASC }) {
      nodes {
        releaseDate: release_date
        imdbId: imdb_id
        title
        year
        lastReviewGrade
        lastReviewGradeValue
        sortTitle: sort_title
        slug
      }
    }
  }
`;
