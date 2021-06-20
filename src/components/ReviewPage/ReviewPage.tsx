import { Link } from "gatsby";
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";
import React from "react";
import toSentenceArray from "../../utils/to-sentence-array";
import DateIcon from "../DateIcon";
import Grade from "../Grade";
import Layout from "../Layout";
import RelatedMovies from "../RelatedMovies";
import RenderedMarkdown from "../RenderedMarkdown";
import WatchlistLinks from "../WatchlistLinks";
import {
  akaContainerCss,
  akaListCss,
  akaListItemCss,
  bodyCss,
  castCss,
  castLabelCss,
  containerCss,
  contentCss,
  creditsCss,
  dateCss,
  dateIconCss,
  directorsCss,
  gradeCss,
  headerCss,
  headerMetaCss,
  imageCss,
  olderViewingsCss,
  olderViewingsHeadingCss,
  olderViewingsListCss,
  posterCss,
  relatedCss,
  relatedHeaderCss,
  relatedHeadingCss,
  relatedMoreCss,
  relatedNameCss,
  reviewCss,
  reviewsListCss,
  separatorCss,
  slugCss,
  titleCss,
  viewingDateIconCss,
  watchlistCss,
} from "./ReviewPage.module.scss";

function buildStructuredData(pageData: PageData) {
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
    ratingValue: gradeMap[pageData.movie.lastReviewGrade[0]],
  };
}

function Related(pageData: PageData): JSX.Element | null {
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

interface PageData {
  movie: {
    imdbId: string;
    title: string;
    year: number;
    countries: string[];
    runtimeMinutes: number;
    lastReviewGrade: string;
    lastReviewGradeValue: number;
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

/**
 * Renders a review page.
 */
export default function Review({ data }: { data: PageData }): JSX.Element {
  const structuredData = buildStructuredData(data);
  const { movie } = data;

  return (
    <Layout>
      <main className={containerCss}>
        {movie.backdrop && (
          <GatsbyImage
            className={imageCss}
            image={movie.backdrop.childImageSharp.gatsbyImageData}
            alt={`A still from ${movie.title} (${movie.year})`}
            loading="eager"
          />
        )}
        <header className={headerCss}>
          <h1 className={titleCss}>{movie.title}</h1>
          <div className={headerMetaCss}>
            {movie.year} <span className={separatorCss}>|</span>{" "}
            {movie.countries.reduce<JSX.Element | null>((acc, country) => {
              if (acc === null) {
                return <>{country}</>;
              }

              return (
                <>
                  {acc}
                  <span className={separatorCss}>&ndash;</span>
                  {country}
                </>
              );
            }, null)}{" "}
            <span className={separatorCss}>|</span> {movie.runtimeMinutes}
            &#x02009;min
          </div>
          {movie.akaTitles.length > 0 && (
            <div className={akaContainerCss}>
              aka:
              <ul className={akaListCss}>
                {movie.akaTitles.map((akaTitle) => (
                  <li key={akaTitle} className={akaListItemCss}>
                    {akaTitle}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </header>
        <aside className={creditsCss}>
          {movie.poster && (
            <GatsbyImage
              className={posterCss}
              image={movie.poster.childImageSharp.gatsbyImageData}
              alt={`A poster from ${movie.title} (${movie.year})`}
              loading="eager"
            />
          )}
          <div className={directorsCss}>
            <span className={castLabelCss}>Directed by</span>
            {toSentenceArray(movie.directorNames)}
          </div>
          <div className={castCss}>
            <span className={castLabelCss}>Starring</span>
            {toSentenceArray(movie.principalCastNames)}
          </div>
          <div className={watchlistCss}>
            <WatchlistLinks movie={movie} />
          </div>
        </aside>
        <ul className={reviewsListCss}>
          {movie.reviews.map((review) => (
            <li key={review.frontmatter.sequence}>
              <article className={reviewCss}>
                <header className={slugCss}>
                  <DateIcon className={dateIconCss} />{" "}
                  <span className={dateCss}>{review.frontmatter.date}</span> via{" "}
                  {review.frontmatter.venue}
                  {review.frontmatter.venueNotes && (
                    <> ({review.frontmatter.venueNotes})</>
                  )}
                </header>
                <div className={contentCss}>
                  <Grade
                    grade={review.frontmatter.grade}
                    className={gradeCss}
                  />
                  <RenderedMarkdown
                    className={bodyCss}
                    // eslint-disable-next-line react/no-danger
                    text={review.linkedHtml}
                  />
                </div>
              </article>
            </li>
          ))}
        </ul>
        {movie.olderViewings.length > 0 && (
          <div className={olderViewingsCss}>
            <h3 className={olderViewingsHeadingCss}>Older Viewings</h3>
            <ul className={olderViewingsListCss}>
              {movie.olderViewings.map((viewing) => (
                <li key={viewing.sequence}>
                  <div className={slugCss}>
                    <DateIcon className={viewingDateIconCss} />{" "}
                    <span className={dateCss}>{viewing.viewingDate}</span> via{" "}
                    {viewing.venue}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
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
