import { graphql, Link } from "gatsby";
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";
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
  data: PageQueryResult;
}): JSX.Element {
  const listHeader = useRef<HTMLDivElement>(null);
  const {
    update: { nodes: updates },
  } = data;

  return (
    <Layout>
      <main className={containerCss} ref={listHeader}>
        <ol className={listCss}>
          {updates.map((update, index) => {
            const review = update;
            const listItemValue =
              pageContext.numberOfItems - pageContext.skip - index;
            const movie = update.reviewedMovie;

            return (
              <li
                key={review.frontmatter.sequence}
                value={listItemValue}
                className={`${listItemCss}`}
              >
                <article className={`${reviewCss}`}>
                  <Link
                    rel="canonical"
                    className={imageLinkCss}
                    to={`/reviews/${review.frontmatter.slug}/`}
                  >
                    {movie.backdrop && (
                      <GatsbyImage
                        image={movie.backdrop.childImageSharp.gatsbyImageData}
                        alt={`A still from ${movie.title} (${movie.year})`}
                        loading={index === 0 ? "eager" : "lazy"}
                      />
                    )}
                  </Link>
                  <header className={reviewHeaderCss}>
                    <h2 className={articleHeadingCss}>
                      <Link
                        to={`/reviews/${review.frontmatter.slug}/`}
                        rel="canonical"
                      >
                        {movie.title}{" "}
                        <span className={reviewYearCss}>{movie.year}</span>
                      </Link>
                    </h2>
                    <Grade
                      grade={review.frontmatter.grade}
                      className={reviewGradeCss}
                      width={140}
                      height={28}
                    />
                    <p className={reviewCreditsCss}>
                      Directed by {toSentenceArray(movie.directorNames)}.
                      Starring {toSentenceArray(movie.principalCastNames)}.
                    </p>
                  </header>
                  <RenderedMarkdown
                    className={articleBodyCss}
                    text={review.linkedExcerpt}
                    tag="main"
                  />
                  <footer className={articleFooterCss}>
                    <div className={dateCss}>
                      <DateIcon /> {review.frontmatter.date}
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

interface WatchlistEntity {
  name: string;
  slug: string;
  avatar: {
    childImageSharp: {
      gatsbyImageData: IGatsbyImageData;
    };
  };
}

interface PageQueryResult {
  update: {
    nodes: {
      frontmatter: {
        imdbId: string;
        slug: string;
        grade: string;
        date: string;
        sequence: number;
      };
      linkedExcerpt: string;
      reviewedMovie: {
        title: string;
        year: number;
        principalCastNames: string[];
        directorNames: string[];
        backdrop: {
          childImageSharp: {
            gatsbyImageData: IGatsbyImageData;
          };
        };
        watchlist: {
          performers: WatchlistEntity[];
          directors: WatchlistEntity[];
          writers: WatchlistEntity[];
          collections: WatchlistEntity[];
        };
      };
    }[];
  };
}

export const pageQuery = graphql`
  query ($skip: Int!, $limit: Int!) {
    update: allMarkdownRemark(
      sort: { fields: [frontmatter___sequence], order: DESC }
      limit: $limit
      skip: $skip
      filter: { postType: { eq: "REVIEW" } }
    ) {
      nodes {
        frontmatter {
          date(formatString: "DD MMM, YYYY")
          grade
          slug
          sequence
          imdbId: imdb_id
        }
        reviewedMovie {
          title
          year
          principalCastNames: principal_cast_names
          directorNames: director_names
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
          watchlist {
            directors {
              name
              slug
              avatar {
                childImageSharp {
                  gatsbyImageData(
                    layout: FIXED
                    formats: [JPG, AVIF]
                    quality: 80
                    width: 40
                    height: 40
                    placeholder: TRACED_SVG
                  )
                }
              }
            }
            writers {
              name
              slug
              avatar {
                childImageSharp {
                  gatsbyImageData(
                    layout: FIXED
                    formats: [JPG, AVIF]
                    quality: 80
                    width: 40
                    height: 40
                    placeholder: TRACED_SVG
                  )
                }
              }
            }
            performers {
              name
              slug
              avatar {
                childImageSharp {
                  gatsbyImageData(
                    layout: FIXED
                    formats: [JPG, AVIF]
                    quality: 80
                    width: 40
                    height: 40
                    placeholder: TRACED_SVG
                  )
                }
              }
            }
            collections {
              name
              slug
              avatar {
                childImageSharp {
                  gatsbyImageData(
                    layout: FIXED
                    formats: [JPG, AVIF]
                    quality: 80
                    width: 40
                    height: 40
                    placeholder: TRACED_SVG
                  )
                }
              }
            }
          }
        }
        linkedExcerpt
      }
    }
  }
`;
