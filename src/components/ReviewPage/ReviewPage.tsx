import { graphql, Link } from "gatsby";
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
  relatedCss,
  relatedHeaderCss,
  relatedHeadingCss,
  relatedMoreCss,
  relatedMoviesSectionCss,
  relatedNameCss,
  reviewContentCss,
  reviewDateIconCss,
  reviewGradeCss,
  reviewsWrapCss,
  slugContainerCss,
} from "./ReviewPage.module.scss";
import StructuredData from "./StructuredData";

function Related({
  watchlist,
  browseMore,
}: {
  watchlist: Queries.ReviewPageQuery["movie"]["watchlist"];
  browseMore: Queries.ReviewPageQuery["movie"]["browseMore"];
}): JSX.Element | null {
  return (
    <div className={relatedCss}>
      {watchlist.collections.map((collection) => (
        <RelatedMovies
          key={collection.name}
          movies={collection.browseMore}
          className={relatedMoviesSectionCss}
        >
          <header className={relatedHeaderCss}>
            <h3 className={relatedHeadingCss}>
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
      {watchlist.performers.map((performer) => (
        <RelatedMovies
          key={performer.slug}
          movies={performer.browseMore}
          className={relatedMoviesSectionCss}
        >
          <header className={relatedHeaderCss}>
            <h3 className={relatedHeadingCss}>
              <span>
                More with{" "}
                <Link
                  to={`/watchlist/performers/${performer.slug}/`}
                  className={relatedNameCss}
                >
                  {performer.name}
                </Link>
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
      {watchlist.directors.map((director) => (
        <RelatedMovies
          key={director.slug}
          movies={director.browseMore}
          className={relatedMoviesSectionCss}
        >
          <header className={relatedHeaderCss}>
            <h3 className={relatedHeadingCss}>
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
      {watchlist.writers.map((writer) => (
        <RelatedMovies
          key={writer.slug}
          movies={writer.browseMore}
          className={relatedMoviesSectionCss}
        >
          <header className={relatedHeaderCss}>
            <h3 className={relatedHeadingCss}>
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
      <RelatedMovies movies={browseMore} className={relatedMoviesSectionCss}>
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

const gradeMap: Record<string, string> = {
  A: "★★★★★",
  B: "★★★★",
  C: "★★★",
  D: "★★",
  F: "★",
};

function starsForGrade(grade: string) {
  if (grade in gradeMap) {
    return gradeMap[grade];
  }

  return "";
}

export function Head({
  data,
}: {
  data: NonNullable<Queries.ReviewPageQuery>;
}): JSX.Element {
  const movie = data.movie;

  return (
    <HeadBuilder
      pageTitle={`${movie.title} (${movie.year})`}
      description={`${starsForGrade(movie.grade[0])} ${
        movie.review?.excerpt || ""
      }`}
      image={movie.seoImage?.childImageSharp?.resize?.src}
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
  data: NonNullable<Queries.ReviewPageQuery>;
}): JSX.Element {
  const movie = data.movie;

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
        {movie.backdrop?.childImageSharp && (
          <HeroImage
            className={heroImageCss}
            image={movie.backdrop.childImageSharp.gatsbyImageData}
            alt={`A still from ${movie.title} (${movie.year})`}
          />
        )}
        <div className={reviewsWrapCss}>
          <article>
            <header className={slugContainerCss}>
              <DateIcon className={reviewDateIconCss} />{" "}
              <Grade grade={movie.grade} className={reviewGradeCss} />
            </header>
            <RenderedMarkdown
              className={reviewContentCss}
              // eslint-disable-next-line react/no-danger
              text={movie.review.linkedHtml}
            />
          </article>
          <div className={olderViewingsContainerCss}>
            <h3 className={olderViewingsHeadingCss}>Viewing History</h3>
            <ul className={olderViewingsListCss}>
              {movie.viewings.map((viewing) => (
                <li key={viewing.sequence} className={olderViewingsListItemCss}>
                  <DateIcon className={olderViewingsDateIconCss} />{" "}
                  <span className={olderViewingSlugCss}>
                    <span className={olderViewingsDateCss}>{viewing.date}</span>{" "}
                    <span className={olderViewingsViaCss}>via</span>{" "}
                    <span className={olderViewingsVenueCss}>
                      {viewing.medium}
                      {viewing.mediumNotes && (
                        <span>{viewing.mediumNotes}</span>
                      )}
                    </span>
                  </span>
                  <RenderedMarkdown
                    className={reviewContentCss}
                    // eslint-disable-next-line react/no-danger
                    text={viewing.viewingNotes?.linkedHtml}
                  />
                </li>
              ))}
            </ul>
          </div>
          <Credits movie={movie} className={creditsCss} />
        </div>
        <Related watchlist={movie.watchlist} browseMore={movie.browseMore} />
      </main>
      <StructuredData data={movie} />
    </Layout>
  );
}

export const pageQuery = graphql`
  query ReviewPage($imdbId: String!) {
    movie: reviewedMoviesJson(imdbId: { eq: $imdbId }) {
      ...StructuredData
      imdbId
      title
      year
      countries
      runtimeMinutes
      grade
      originalTitle
      principalCastNames
      directorNames
      review {
        linkedHtml
        excerpt
      }
      browseMore {
        ...RelatedMovies
      }
      viewings {
        date: viewingDate(formatString: "ddd MMM DD, YYYY")
        venue
        medium
        mediumNotes
        viewingNotes {
          linkedHtml
        }
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
      watchlist {
        performers {
          browseMore(movieImdbId: $imdbId) {
            ...RelatedMovies
          }
        }
        directors {
          browseMore(movieImdbId: $imdbId) {
            ...RelatedMovies
          }
        }
        writers {
          browseMore(movieImdbId: $imdbId) {
            ...RelatedMovies
          }
        }

        collections {
          browseMore(movieImdbId: $imdbId) {
            ...RelatedMovies
          }
        }
      }
      ...Credits
    }
  }
`;
