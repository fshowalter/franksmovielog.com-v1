import { graphql, Link } from "gatsby";
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";
import React from "react";
import toSentenceArray from "../../utils/to-sentence-array";
import DateIcon from "../DateIcon";
import Grade from "../Grade";
import Layout from "../Layout";
import RenderedMarkdown from "../RenderedMarkdown";
import Seo from "../Seo";
import WatchlistLinks from "../WatchlistLinks";
import RelatedMovies from "./RelatedMovies";
import {
  backToTopArrowCss,
  backToTopContainerCss,
  backToTopInnerCss,
  containerCss,
  creditsContainerCss,
  creditsListCss,
  creditsPosterCss,
  creditsTitleCss,
  creditsWatchlistCss,
  creditTermCss,
  headerContainerCss,
  headerMetaCss,
  headerOriginalTitleCss,
  headerSeparatorCss,
  headerTitleCss,
  heroImageCss,
  hideDesktopCss,
  olderViewingsContainerCss,
  olderViewingsDateCss,
  olderViewingsDateIconCss,
  olderViewingsHeadingCss,
  olderViewingsListCss,
  olderViewingsListItemCss,
  olderViewingSlugCss,
  relatedCss,
  relatedHeaderCss,
  relatedHeadingCss,
  relatedMoreCss,
  relatedNameCss,
  reviewContentCss,
  reviewDateIconCss,
  reviewGradeCss,
  reviewsListCss,
  reviewsListItemCss,
  slugContainerCss,
  slugDateCss,
  slugFootnoteCss,
  slugOnCss,
  slugViaCss,
} from "./ReviewPage.module.scss";

function buildStructuredData(pageData: PageQueryResult) {
  const gradeMap: { [index: string]: number } = {
    A: 5,
    B: 4,
    C: 3,
    D: 2,
    F: 1,
  };

  return {
    "@context": "http://schema.org",
    "@type": "AggregateRating",
    itemReviewed: {
      "@type": "Movie",
      name: pageData.movie.title,
      sameAs: `http://www.imdb.com/title/${pageData.movie.imdbId}/`,
      image: pageData.movie.seoImage.childImageSharp.resize.src,
      dateCreated: pageData.movie.year,
      director: {
        "@type": "Person",
        name: pageData.movie.directorNames[0],
      },
    },
    reviewCount: pageData.movie.reviews.length,
    ratingValue: gradeMap[pageData.movie.lastReviewGrade[0]],
  };
}

function Related(pageData: PageQueryResult): JSX.Element | null {
  return (
    <div className={relatedCss}>
      {pageData.movie.watchlist.collections.map((collection) => (
        <RelatedMovies key={collection.name} movies={collection.browseMore}>
          <header className={relatedHeaderCss}>
            <h3 className={relatedHeadingCss}>
              More <span className={relatedNameCss}>{collection.name}</span>
            </h3>
            <Link
              to={`/watchlist/collections/${collection.slug}/`}
              className={relatedMoreCss}
            >
              See All &raquo;
            </Link>
          </header>
        </RelatedMovies>
      ))}
      {pageData.movie.watchlist.performers.map((performer) => (
        <RelatedMovies key={performer.slug} movies={performer.browseMore}>
          <header className={relatedHeaderCss}>
            <h3 className={relatedHeadingCss}>
              More with <span className={relatedNameCss}>{performer.name}</span>
            </h3>
            <Link
              to={`/watchlist/performers/${performer.slug}/`}
              className={relatedMoreCss}
            >
              See All &raquo;
            </Link>
          </header>
        </RelatedMovies>
      ))}
      {pageData.movie.watchlist.directors.map((director) => (
        <RelatedMovies key={director.slug} movies={director.browseMore}>
          <header className={relatedHeaderCss}>
            <h3 className={relatedHeadingCss}>
              More directed by{" "}
              <span className={relatedNameCss}>{director.name}</span>
            </h3>
            <Link
              to={`/watchlist/directors/${director.slug}/`}
              className={relatedMoreCss}
            >
              See All &raquo;
            </Link>
          </header>
        </RelatedMovies>
      ))}
      {pageData.movie.watchlist.writers.map((writer) => (
        <RelatedMovies key={writer.slug} movies={writer.browseMore}>
          <header className={relatedHeaderCss}>
            <h3 className={relatedHeadingCss}>
              More written by{" "}
              <span className={relatedNameCss}>{writer.name}</span>
            </h3>
            <Link
              to={`/watchlist/writers/${writer.slug}/`}
              className={relatedMoreCss}
            >
              See All &raquo;
            </Link>
          </header>
        </RelatedMovies>
      ))}
      <RelatedMovies movies={pageData.movie.browseMore}>
        <header className={relatedHeaderCss}>
          <h3 className={relatedHeadingCss}>
            More <span className={relatedNameCss}>Reviews</span>
          </h3>
          <Link to="/reviews/" className={relatedMoreCss}>
            See All &raquo;
          </Link>
        </header>
      </RelatedMovies>
    </div>
  );
}

/**
 * Renders a review page.
 */
export default function ReviewPage({
  data,
}: {
  data: PageQueryResult;
}): JSX.Element {
  const structuredData = buildStructuredData(data);
  const { movie } = data;

  return (
    <Layout>
      <Seo
        pageTitle={`${movie.title} (${movie.year})`}
        description={`A review of the ${movie.year} film ${movie.title}.`}
        image={movie.seoImage.childImageSharp.resize.src}
        article
      />
      <main id="top" className={containerCss}>
        <header className={headerContainerCss}>
          <h1 className={headerTitleCss}>{movie.title}</h1>
          {movie.akaTitles.length > 0 && (
            <div className={headerOriginalTitleCss}>({movie.akaTitles[0]})</div>
          )}
          <div className={headerMetaCss}>
            {movie.year} <span className={headerSeparatorCss}>|</span>{" "}
            {movie.countries.reduce<JSX.Element | null>((acc, country) => {
              if (acc === null) {
                return <>{country}</>;
              }

              return (
                <>
                  {acc}
                  <span className={headerSeparatorCss}>&ndash;</span>
                  {country}
                </>
              );
            }, null)}{" "}
            <span className={headerSeparatorCss}>|</span> {movie.runtimeMinutes}
            &#x02009;min{" "}
            <span className={hideDesktopCss}>
              <span className={headerSeparatorCss}>|</span>{" "}
              <a href="#credits">More...</a>
            </span>
          </div>
        </header>
        {movie.backdrop && (
          <GatsbyImage
            className={heroImageCss}
            image={movie.backdrop.childImageSharp.gatsbyImageData}
            alt={`A still from ${movie.title} (${movie.year})`}
            loading="eager"
          />
        )}
        <ul className={reviewsListCss}>
          {movie.reviews.map((review) => (
            <li
              className={reviewsListItemCss}
              key={review.frontmatter.sequence}
            >
              <article>
                <header
                  className={slugContainerCss}
                  id={review.frontmatter.sequence.toString()}
                >
                  <DateIcon className={reviewDateIconCss} />{" "}
                  <Grade
                    grade={review.frontmatter.grade}
                    className={reviewGradeCss}
                  />
                  <div>
                    <span className={slugOnCss}> on </span>
                    <span className={slugDateCss}>
                      {review.frontmatter.date}
                    </span>
                    <span className={slugViaCss}>
                      {" "}
                      via {review.frontmatter.venue}
                      {review.frontmatter.venueNotes && (
                        <span className={slugFootnoteCss}>
                          {" "}
                          <sup
                            id={`fnref:venue-notes-${review.frontmatter.sequence}`}
                          >
                            <a
                              href={`#fn:venue-footnotes-${review.frontmatter.sequence}`}
                            >
                              1
                            </a>
                          </sup>
                        </span>
                      )}
                    </span>
                  </div>
                </header>
                <RenderedMarkdown
                  className={reviewContentCss}
                  // eslint-disable-next-line react/no-danger
                  text={review.linkedHtml}
                />
                {review.frontmatter.venueNotes && (
                  <div className="footnotes">
                    <ol>
                      <li
                        className="footnote"
                        id={`fn:venue-footnotes-${review.frontmatter.sequence}`}
                      >
                        <p>
                          {review.frontmatter.venueNotes}
                          <a
                            href={`#fnref:venue-notes-${review.frontmatter.sequence}`}
                            title="Back to top"
                          >
                            ↩
                          </a>
                        </p>
                      </li>
                    </ol>
                  </div>
                )}
              </article>
            </li>
          ))}
        </ul>
        {movie.olderViewings.length > 0 && (
          <div className={olderViewingsContainerCss}>
            <h3 className={olderViewingsHeadingCss}>Older Viewings</h3>
            <ul className={olderViewingsListCss}>
              {movie.olderViewings.map((viewing) => (
                <li key={viewing.sequence} className={olderViewingsListItemCss}>
                  <DateIcon className={olderViewingsDateIconCss} />{" "}
                  <span className={olderViewingSlugCss}>
                    <span className={olderViewingsDateCss}>
                      {viewing.viewingDate}
                    </span>{" "}
                    via {viewing.venue}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
        <aside id="credits" className={creditsContainerCss}>
          {movie.poster && (
            <GatsbyImage
              className={creditsPosterCss}
              image={movie.poster.childImageSharp.gatsbyImageData}
              alt={`A poster from ${movie.title} (${movie.year})`}
              loading="eager"
            />
          )}
          <div className={creditsListCss}>
            <div className={hideDesktopCss}>
              <div className={creditsTitleCss}>{movie.title}</div>
            </div>
            <dl>
              <div className={hideDesktopCss}>
                <dt className={creditTermCss}>Year</dt>
                <dd>{movie.year}</dd>
                {movie.akaTitles.length > 0 && (
                  <>
                    <dt className={creditTermCss}>Original Title</dt>
                    <dd>{movie.akaTitles[0]}</dd>
                  </>
                )}
                <dt className={creditTermCss}>Financing</dt>
                <dd>{toSentenceArray(movie.countries)}</dd>
                <dt className={creditTermCss}>Running Time</dt>
                <dd>{movie.runtimeMinutes}min</dd>
              </div>
              <dt className={creditTermCss}>Directed by</dt>
              <dd>{toSentenceArray(movie.directorNames)}</dd>
              <dt className={creditTermCss}>Starring</dt>
              <dd>{toSentenceArray(movie.principalCastNames)}</dd>
            </dl>
          </div>
          <div className={creditsWatchlistCss}>
            <WatchlistLinks movie={movie} />
          </div>
          <a
            href="#top"
            className={[backToTopContainerCss, hideDesktopCss].join(" ")}
          >
            <div className={backToTopInnerCss}>
              <svg viewBox="0 0 24 24" className={backToTopArrowCss}>
                <path d="M7.997 10l3.515-3.79a.672.672 0 0 1 .89-.076l.086.075L16 10 13 10.001V18h-2v-7.999L7.997 10z"></path>
              </svg>
            </div>
          </a>
        </aside>
        <Related movie={movie} />
      </main>
      {structuredData && (
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      )}
    </Layout>
  );
}

interface PageQueryResult {
  movie: {
    imdbId: string;
    title: string;
    year: number;
    countries: string[];
    runtimeMinutes: number;
    lastReviewGrade: string;
    akaTitles: string[];
    principalCastNames: string[];
    directorNames: string[];
    browseMore: BrowseMoreMovie[];
    backdrop: {
      childImageSharp: {
        gatsbyImageData: IGatsbyImageData;
      };
    };
    seoImage: {
      childImageSharp: {
        resize: {
          src: string;
        };
      };
    };
    poster: {
      childImageSharp: {
        gatsbyImageData: IGatsbyImageData;
      };
    };
    reviews: {
      frontmatter: {
        grade: string;
        date: string;
        dateIso: string;
        venue: string;
        venueNotes: string;
        sequence: number;
      };
      linkedHtml: string;
    }[];
    olderViewings: {
      venue: string;
      viewingDate: string;
      sequence: number;
    }[];
    watchlist: {
      performers: WatchlistEntity[];
      directors: WatchlistEntity[];
      writers: WatchlistEntity[];
      collections: WatchlistEntity[];
    };
  };
}

interface BrowseMoreMovie {
  imdbId: string;
  title: string;
  lastReviewGrade: string;
  slug: string;
  year: number;
  backdrop: {
    childImageSharp: {
      gatsbyImageData: IGatsbyImageData;
    };
  };
}

interface WatchlistEntity {
  name: string;
  slug: string;
  browseMore: BrowseMoreMovie[];
  avatar: {
    childImageSharp: {
      gatsbyImageData: IGatsbyImageData;
    };
  };
}

export const pageQuery = graphql`
  query ($imdbId: String!) {
    movie: reviewedMoviesJson(imdb_id: { eq: $imdbId }) {
      imdbId: imdb_id
      title
      year
      countries
      runtimeMinutes: runtime_minutes
      lastReviewGrade
      akaTitles: aka_titles
      principalCastNames: principal_cast_names
      directorNames: director_names
      reviews {
        frontmatter {
          date(formatString: "ddd MMM D, YYYY")
          dateIso: date(formatString: "Y-MM-DD")
          grade
          sequence
          venue
          venueNotes: venue_notes
        }
        linkedHtml
      }
      browseMore {
        imdbId: imdb_id
        title
        lastReviewGrade
        slug
        year
        backdrop {
          childImageSharp {
            gatsbyImageData(
              layout: CONSTRAINED
              formats: [JPG, AVIF]
              quality: 80
              placeholder: TRACED_SVG
              width: 309
            )
          }
        }
      }
      olderViewings {
        viewingDate: viewing_date(formatString: "ddd MMM DD, YYYY")
        venue
        sequence
      }
      backdrop {
        childImageSharp {
          gatsbyImageData(
            layout: CONSTRAINED
            formats: [JPG, AVIF]
            quality: 80
            width: 1000
            placeholder: TRACED_SVG
          )
        }
      }
      seoImage: backdrop {
        childImageSharp {
          resize(toFormat: JPG, width: 1200, quality: 80) {
            src
          }
        }
      }
      poster {
        childImageSharp {
          gatsbyImageData(
            layout: CONSTRAINED
            formats: [JPG, AVIF]
            quality: 80
            width: 309
            placeholder: TRACED_SVG
          )
        }
      }
      watchlist {
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
          browseMore(movieImdbId: $imdbId) {
            imdbId: imdb_id
            title
            lastReviewGrade
            slug
            year
            backdrop {
              childImageSharp {
                gatsbyImageData(
                  layout: CONSTRAINED
                  formats: [JPG, AVIF]
                  quality: 80
                  placeholder: TRACED_SVG
                  width: 309
                )
              }
            }
          }
        }
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
          browseMore(movieImdbId: $imdbId) {
            imdbId: imdb_id
            title
            lastReviewGrade
            slug
            year
            backdrop {
              childImageSharp {
                gatsbyImageData(
                  layout: CONSTRAINED
                  formats: [JPG, AVIF]
                  quality: 80
                  placeholder: TRACED_SVG
                  width: 309
                )
              }
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
          browseMore(movieImdbId: $imdbId) {
            imdbId: imdb_id
            title
            lastReviewGrade
            slug
            year
            backdrop {
              childImageSharp {
                gatsbyImageData(
                  layout: CONSTRAINED
                  formats: [JPG, AVIF]
                  quality: 80
                  placeholder: TRACED_SVG
                  width: 309
                )
              }
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
          browseMore(movieImdbId: $imdbId) {
            imdbId: imdb_id
            title
            lastReviewGrade
            slug
            year
            backdrop {
              childImageSharp {
                gatsbyImageData(
                  layout: CONSTRAINED
                  formats: [JPG, AVIF]
                  quality: 80
                  placeholder: TRACED_SVG
                  width: 309
                )
              }
            }
          }
        }
      }
    }
  }
`;
