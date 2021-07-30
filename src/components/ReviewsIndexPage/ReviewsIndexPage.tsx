import { graphql, Link } from "gatsby";
import React, { useReducer } from "react";
import DebouncedInput from "../DebouncedInput/DebouncedInput";
import Fieldset from "../Fieldset";
import FilterPageHeader from "../FilterPageHeader";
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
  listItemDateCss,
  listItemGradeACss,
  listItemGradeBCss,
  listItemGradeCCss,
  listItemGradeDCss,
  listItemGradeFCss,
  listItemLetterGradeCss,
  listItemTitleCss,
  listItemTitleYearCss,
  pageHeaderCss,
  rightCss,
} from "./ReviewsIndexPage.module.scss";
import type { SortType } from "./ReviewsIndexPage.reducer";
import reducer, { ActionType, initState } from "./ReviewsIndexPage.reducer";

function gradeCssForReview(review: ReviewedMovie): string {
  if (review.gradeValue > 9) {
    return listItemGradeACss;
  }

  if (review.gradeValue > 6) {
    return listItemGradeBCss;
  }

  if (review.gradeValue > 3) {
    return listItemGradeCCss;
  }

  if (review.gradeValue > 0) {
    return listItemGradeDCss;
  }

  return listItemGradeFCss;
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
      reviews: [...data.review.nodes],
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
        </div>
        <div className={rightCss}>
          <ol data-testid="reviews-list" className={listCss}>
            {state.filteredReviews.map((review) => {
              return (
                <li
                  className={`${listItemCss} ${gradeCssForReview(review)}`}
                  key={review.frontmatter.sequence}
                >
                  <Link
                    to={`/reviews/${review.frontmatter.slug}/#${review.frontmatter.sequence}`}
                    className={listItemTitleCss}
                  >
                    {review.reviewedMovie.title}{" "}
                    <span className={listItemTitleYearCss}>
                      {review.reviewedMovie.year}
                    </span>
                  </Link>
                  <div className={listItemLetterGradeCss}>
                    {review.frontmatter.grade.replace("-", "\u2212")}
                  </div>
                  <div className={listItemDateCss}>
                    {review.frontmatter.date}
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
  review: {
    nodes: ReviewedMovie[];
  };
}

export interface ReviewedMovie {
  frontmatter: {
    grade: string;
    slug: string;
    sequence: number;
    date: string;
  };
  reviewedMovie: {
    releaseDate: string;
    title: string;
    year: number;
    sortTitle: string;
  };
  gradeValue: number;
}

export const query = graphql`
  query {
    review: allMarkdownRemark(
      sort: { fields: [reviewedMovie___sort_title] }
      filter: { postType: { eq: "REVIEW" } }
    ) {
      nodes {
        frontmatter {
          date(formatString: "YYYY-MM-DD")
          grade
          slug
          sequence
        }
        reviewedMovie {
          title
          year
          releaseDate: release_date
          sortTitle: sort_title
        }
        gradeValue
      }
    }
  }
`;
