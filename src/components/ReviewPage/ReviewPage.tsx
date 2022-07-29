import { graphql, Link } from "gatsby";
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";
import DateIcon from "../DateIcon";
import Grade from "../Grade";
import HeadBuilder from "../HeadBuilder";
import HeroImage from "../HeroImage";
import Layout from "../Layout";
import PageTitle from "../PageTitle";
import RenderedMarkdown from "../RenderedMarkdown";
import Credits from "./Credits";
import RelatedMovies from "./RelatedMovies";
import {
  containerCss,
  creditsCss,
  headerContainerCss,
  headerMetaCss,
  headerOriginalTitleCss,
  headerSeparatorCss,
  heroImageCss,
  hideDesktopCss,
  olderViewingsContainerCss,
  olderViewingsDateCss,
  olderViewingsDateIconCss,
  olderViewingsHeadingCss,
  olderViewingsListCss,
  olderViewingsListItemCss,
  olderViewingSlugCss,
  olderViewingsVenueCss,
  olderViewingsViaCss,
  relatedAvaterCss,
  relatedCss,
  relatedHeaderCss,
  relatedHeadingCss,
  relatedMoreCss,
  relatedMoviesSectionCss,
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
        <RelatedMovies
          key={collection.name}
          movies={collection.browseMore}
          className={relatedMoviesSectionCss}
        >
          <header className={relatedHeaderCss}>
            <h3 className={relatedHeadingCss}>
              {collection.avatar && (
                <GatsbyImage
                  image={collection.avatar.childImageSharp.gatsbyImageData}
                  alt={collection.name}
                  className={relatedAvaterCss}
                />
              )}{" "}
              <span>
                More <span className={relatedNameCss}>{collection.name}</span>
              </span>
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
        <RelatedMovies
          key={performer.slug}
          movies={performer.browseMore}
          className={relatedMoviesSectionCss}
        >
          <header className={relatedHeaderCss}>
            <h3 className={relatedHeadingCss}>
              {performer.avatar && (
                <GatsbyImage
                  image={performer.avatar.childImageSharp.gatsbyImageData}
                  alt={performer.name}
                  className={relatedAvaterCss}
                />
              )}{" "}
              <span>
                More with{" "}
                <span className={relatedNameCss}>{performer.name}</span>
              </span>
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
        <RelatedMovies
          key={director.slug}
          movies={director.browseMore}
          className={relatedMoviesSectionCss}
        >
          <header className={relatedHeaderCss}>
            <h3 className={relatedHeadingCss}>
              {director.avatar && (
                <GatsbyImage
                  image={director.avatar.childImageSharp.gatsbyImageData}
                  alt={director.name}
                  className={relatedAvaterCss}
                />
              )}{" "}
              <span>
                More directed by{" "}
                <span className={relatedNameCss}>{director.name}</span>
              </span>
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
        <RelatedMovies
          key={writer.slug}
          movies={writer.browseMore}
          className={relatedMoviesSectionCss}
        >
          <header className={relatedHeaderCss}>
            <h3 className={relatedHeadingCss}>
              {writer.avatar && (
                <GatsbyImage
                  image={writer.avatar.childImageSharp.gatsbyImageData}
                  alt={writer.name}
                  className={relatedAvaterCss}
                />
              )}{" "}
              <span>
                More written by{" "}
                <span className={relatedNameCss}>{writer.name}</span>
              </span>
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
      <RelatedMovies
        movies={pageData.movie.browseMore}
        className={relatedMoviesSectionCss}
      >
        <header className={relatedHeaderCss}>
          <h3 className={relatedHeadingCss}>
            <span>
              More <span className={relatedNameCss}>Reviews</span>
            </span>
          </h3>
          <Link to="/reviews/" className={relatedMoreCss}>
            See All &raquo;
          </Link>
        </header>
      </RelatedMovies>
    </div>
  );
}

export function Head({ data }: { data: PageQueryResult }): JSX.Element {
  const { movie } = data;

  return (
    <HeadBuilder
      pageTitle={`${movie.title} (${movie.year})`}
      description={`A review of the ${movie.year} film ${movie.title}.`}
      image={movie.seoImage.childImageSharp.resize.src}
      article
    />
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
      <main id="top" className={containerCss}>
        <header className={headerContainerCss}>
          <PageTitle>{movie.title}</PageTitle>
          {movie.originalTitle && (
            <div className={headerOriginalTitleCss}>
              ({movie.originalTitle})
            </div>
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
          <HeroImage
            className={heroImageCss}
            image={movie.backdrop.childImageSharp.gatsbyImageData}
            alt={`A still from ${movie.title} (${movie.year})`}
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
                          <sup id={`fnref:${review.frontmatter.sequence}-v`}>
                            <a href={`#fn:${review.frontmatter.sequence}-v`}>
                              V
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
                    <span className={olderViewingsViaCss}>via</span>{" "}
                    <span className={olderViewingsVenueCss}>
                      {viewing.venue}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
        <Credits movie={movie} className={creditsCss} />
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
  movie: Movie;
}

export interface Movie {
  imdbId: string;
  title: string;
  year: number;
  countries: string[];
  runtimeMinutes: number;
  lastReviewGrade: string;
  originalTitle: string | null;
  principalCastNames: string[];
  directorNames: string[];
  browseMore: RelatedMovie[];
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
}

export interface RelatedMovie {
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
  browseMore: RelatedMovie[];
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
      originalTitle: original_title
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
              width: 248
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
            width: 248
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
                  width: 248
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
                  width: 248
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
                  width: 248
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
                  width: 248
                )
              }
            }
          }
        }
      }
    }
  }
`;
