import { graphql, Link } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import { useRef } from "react";
import toSentenceArray from "../../utils/to-sentence-array";
import DateIcon from "../DateIcon";
import Grade from "../Grade";
import HeadBuilder from "../HeadBuilder";
import Layout from "../Layout";
import RenderedMarkdown from "../RenderedMarkdown";
import {
  articleBodyCss,
  articleFooterCss,
  articleHeadingCss,
  containerCss,
  dateCss,
  imageLinkCss,
  listCss,
  listItemCss,
  paginationCss,
  reviewCreditsCss,
  reviewCss,
  reviewGradeCss,
  reviewHeaderCss,
  reviewYearCss,
} from "./HomePage.module.scss";
import Pagination from "./Pagination";

interface PageContext {
  limit: number;
  skip: number;
  numberOfItems: number;
  currentPage: number;
}

export function Head({
  pageContext,
}: {
  pageContext: PageContext;
}): JSX.Element {
  return (
    <HeadBuilder
      pageTitle={
        pageContext.currentPage === 1
          ? "Frank's Movie Log: My Life at the Movies"
          : `Page ${pageContext.currentPage}`
      }
      description="Reviews of current, cult, classic, and forgotten films."
      article={false}
      image={null}
    />
  );
}

export default function HomePage({
  pageContext,
  data,
}: {
  pageContext: PageContext;
  data: Queries.HomePageQuery;
}): JSX.Element {
  const listHeader = useRef<HTMLDivElement>(null);
  const {
    viewing: { nodes: viewings },
  } = data;

  return (
    <Layout>
      <main className={containerCss} ref={listHeader}>
        <ol className={listCss}>
          {viewings.map((viewing, index) => {
            const listItemValue =
              pageContext.numberOfItems - pageContext.skip - index;
            const reviewedMovie = viewing.reviewedMovie;

            if (!reviewedMovie) {
              return null;
            }

            return (
              <li
                key={viewing.sequence}
                value={listItemValue}
                className={`${listItemCss}`}
              >
                <article className={`${reviewCss}`}>
                  <Link
                    rel="canonical"
                    className={imageLinkCss}
                    to={`/reviews/${reviewedMovie.slug}/`}
                  >
                    {reviewedMovie.backdrop?.childImageSharp && (
                      <GatsbyImage
                        image={
                          reviewedMovie.backdrop.childImageSharp.gatsbyImageData
                        }
                        alt={`A still from ${reviewedMovie.title} (${reviewedMovie.year})`}
                        loading={index === 0 ? "eager" : "lazy"}
                      />
                    )}
                  </Link>
                  <header className={reviewHeaderCss}>
                    <h2 className={articleHeadingCss}>
                      <Link
                        to={`/reviews/${reviewedMovie.slug}/`}
                        rel="canonical"
                      >
                        {reviewedMovie.title}{" "}
                        <span className={reviewYearCss}>
                          {reviewedMovie.year}
                        </span>
                      </Link>
                    </h2>
                    <Grade
                      grade={reviewedMovie.grade}
                      className={reviewGradeCss}
                      width={140}
                      height={28}
                    />
                    <p className={reviewCreditsCss}>
                      Directed by {toSentenceArray(reviewedMovie.directorNames)}
                      . Starring{" "}
                      {toSentenceArray(reviewedMovie.principalCastNames)}.
                    </p>
                  </header>
                  <RenderedMarkdown
                    className={articleBodyCss}
                    text={reviewedMovie.review.linkedExcerpt}
                    tag="main"
                  />
                  <footer className={articleFooterCss}>
                    <div className={dateCss}>
                      <DateIcon /> {viewing.date}
                    </div>
                  </footer>
                </article>
              </li>
            );
          })}
        </ol>
        <Pagination
          className={paginationCss}
          currentPage={pageContext.currentPage}
          urlRoot="/"
          perPage={pageContext.limit}
          numberOfItems={pageContext.numberOfItems}
          prevText="Newer"
          nextText="Older"
        />
      </main>
    </Layout>
  );
}

export const pageQuery = graphql`
  query HomePage($skip: Int!, $limit: Int!) {
    viewing: allViewingsJson(
      sort: { fields: sequence, order: DESC }
      limit: $limit
      skip: $skip
      filter: { reviewedMovie: { id: { ne: null } } }
    ) {
      nodes {
        imdbId
        sequence
        date: viewingDate(formatString: "DD MMM, YYYY")
        reviewedMovie {
          slug
          grade
          title
          year
          principalCastNames
          directorNames
          review {
            linkedExcerpt
          }
          backdrop {
            childImageSharp {
              gatsbyImageData(
                layout: CONSTRAINED
                formats: [JPG, AVIF]
                quality: 80
                width: 640
                placeholder: TRACED_SVG
              )
            }
          }
        }
      }
    }
  }
`;
