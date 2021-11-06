import { graphql, Link } from "gatsby";
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";
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
  listHeaderGroupCss,
  listInfoCss,
  listItemGradeCss,
  listItemImageLinkCss,
  listItemSlugCss,
  listItemTitleCss,
  listItemTitleYearCss,
  pageHeaderCss,
  rightCss,
  showMoreCss,
} from "./ReviewsIndexPage.module.scss";
import type { SortType } from "./ReviewsIndexPage.reducer";
import reducer, { ActionType, initState } from "./ReviewsIndexPage.reducer";

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

function groupForReview(review: Review, sortValue: SortType): string {
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
      return review.reviewedMovie.releaseDate.substring(0, 4);
    }
    case "review-date-asc":
    case "review-date-desc": {
      const match = review.frontmatter.date.match(
        /[A-Za-z]{3} ([A-Za-z]{3}) \d{1,2}, (\d{4})/
      );
      if (!match) {
        return "Unknown";
      }

      return `${shortMonthToLong[match[1]]} ${match[2]}`;
    }
    case "grade-asc":
    case "grade-desc": {
      return review.frontmatter.grade;
    }
    case "title": {
      const letter = review.reviewedMovie.sortTitle.substring(0, 1);

      if (letter.toLowerCase() == letter.toUpperCase()) {
        return "#";
      }

      return review.reviewedMovie.sortTitle.substring(0, 1).toLocaleUpperCase();
    }
    // no default
  }
}

function groupReviews({
  reviews,
  sortValue,
}: {
  reviews: Review[];
  sortValue: SortType;
}): Map<string, Review[]> {
  const groupedReviews: Map<string, Review[]> = new Map();

  reviews.map((review) => {
    const group = groupForReview(review, sortValue);
    let groupValue = groupedReviews.get(group);

    if (!groupValue) {
      groupValue = [];
      groupedReviews.set(group, groupValue);
    }
    groupValue.push(review);
  });

  return groupedReviews;
}

function ListItem({ review }: { review: Review }): JSX.Element {
  return (
    <li>
      <Link
        className={listItemImageLinkCss}
        to={`/reviews/${review.frontmatter.slug}/`}
      >
        {review.reviewedMovie.poster && (
          <GatsbyImage
            image={review.reviewedMovie.poster.childImageSharp.gatsbyImageData}
            alt={`A poster from ${review.reviewedMovie.title} (${review.reviewedMovie.year})`}
          />
        )}
      </Link>
      <div className={listItemTitleCss}>
        <Link to={`/reviews/${review.frontmatter.slug}/`}>
          {review.reviewedMovie.title}{" "}
          <span className={listItemTitleYearCss}>
            {review.reviewedMovie.year}
          </span>
        </Link>
      </div>
      <div className={listItemSlugCss}>
        <Grade grade={review.frontmatter.grade} className={listItemGradeCss} />{" "}
        <span>{review.frontmatter.date}</span>
      </div>
    </li>
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
      reviews: [...data.review.nodes],
    },
    initState
  );

  const groupedReviews = groupReviews({
    reviews: state.filteredReviews.slice(0, state.showCount),
    sortValue: state.sortValue,
  });

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
              <option value="review-date-desc">
                Review Date (Newest First)
              </option>
              <option value="review-date-asc">
                Review Date (Oldest First)
              </option>
            </SelectInput>
          </Fieldset>
          <div className={listInfoCss}>
            <ListInfo
              visible={state.showCount}
              total={state.filteredReviews.length}
            />
          </div>
        </div>
        <div className={rightCss}>
          <ol data-testid="reviews-list">
            {[...groupedReviews].map(([group, reviews], index) => {
              return (
                <li key={group}>
                  <div
                    className={listHeaderGroupCss}
                    style={{ zIndex: index + 100 }}
                  >
                    {group}
                  </div>
                  <ol className={listCss}>
                    {reviews.map((review) => {
                      return (
                        <ListItem
                          review={review}
                          key={review.frontmatter.sequence}
                        />
                      );
                    })}
                  </ol>
                </li>
              );
            })}
          </ol>
          <div className={showMoreCss}>
            {state.filteredReviews.length > state.showCount && (
              <Button onClick={() => dispatch({ type: ActionType.SHOW_MORE })}>
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

interface PageQueryResult {
  review: {
    nodes: Review[];
  };
}

export interface Review {
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
    poster: null | {
      childImageSharp: {
        gatsbyImageData: IGatsbyImageData;
      };
    };
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
          date(formatString: "ddd MMM D, YYYY")
          grade
          slug
          sequence
        }
        reviewedMovie {
          title
          year
          releaseDate: release_date
          sortTitle: sort_title
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
        gradeValue
      }
    }
  }
`;
