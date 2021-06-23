import { graphql, Link } from "gatsby";
import React, { useReducer } from "react";
import DebouncedInput from "../DebouncedInput/DebouncedInput";
import Fieldset from "../Fieldset";
import FilterPageHeader from "../FilterPageHeader";
import Grade from "../Grade";
import Label from "../Label";
import Layout from "../Layout";
import RangeInput from "../RangeInput";
import SelectInput from "../SelectInput";
import Seo from "../Seo";
import StatsLink from "../StatsLink";
import ToggleButton from "../ToggleButton";
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
          <Fieldset className={filtersCss}>
            <legend>Filter &amp; Sort</legend>
            <Label htmlFor="reviews-title-input">
              Title
              <DebouncedInput
                id="reviews-title-input"
                placeholder="Enter all or part of a title"
                onChange={(value) =>
                  dispatch({ type: ActionType.FILTER_TITLE, value })
                }
              />
            </Label>
            <RangeInput
              label="Release Year"
              id="reviews-release-year-input"
              min={state.minYear}
              max={state.maxYear}
              onChange={(values) =>
                dispatch({ type: ActionType.FILTER_RELEASE_YEAR, values })
              }
            />
            <Label htmlFor="reviews-sort-input">
              Order By
              <SelectInput
                value={state.sortValue}
                id="reviews-sort-input"
                onChange={(e) =>
                  dispatch({
                    type: ActionType.SORT,
                    value: e.target.value as
                      | "title"
                      | "release-date-desc"
                      | "release-date-asc"
                      | "grade-asc"
                      | "grade-desc",
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
            </Label>
          </Fieldset>
          <div className={toggleGradesButtonCss}>
            <ToggleButton
              id="show_grade-toggle"
              onClick={() => dispatch({ type: ActionType.TOGGLE_GRADES })}
            >
              {state.showGrades ? "Show Stars" : "Show Grades"}
            </ToggleButton>
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
    nodes: {
      releaseDate: string;
      lastReviewGrade: string;
      lastReviewGradeValue: number;
      slug: string;
      imdbId: string;
      title: string;
      year: number;
      sortTitle: string;
    }[];
  };
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
