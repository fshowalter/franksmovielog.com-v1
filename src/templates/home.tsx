import { graphql } from "gatsby";
import { IGatsbyImageData } from "gatsby-plugin-image";
import React from "react";
import HomePage from "../components/HomePage";
import Seo from "../components/Seo";

/**
 * Renders the home (index) page.
 */
export default function HomeTemplate({
  pageContext,
  data,
}: {
  pageContext: {
    limit: number;
    skip: number;
    numberOfItems: number;
    currentPage: number;
  };
  data: PageQueryResult;
}): JSX.Element {
  return (
    <>
      <Seo
        pageTitle={
          pageContext.currentPage === 1
            ? "Frank's Movie Log: My Life at the Movies"
            : `Page ${pageContext.currentPage}`
        }
        description="Reviews of current, cult, classic, and forgotten films."
        article={false}
        image={null}
      />
      <HomePage pageContext={pageContext} data={data} />
    </>
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

export interface PageQueryResult {
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
                breakpoints: [355, 411, 459, 592, 710, 822, 918, 1184]
                width: 592
                placeholder: TRACED_SVG
                sizes: "(max-width: 414px) 355px, (max-width: 1023px) 592px, (max-width: 1279px) 459px, (min-width: 1280px) 411px, 592px"
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
