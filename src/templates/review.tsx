import { IGatsbyImageData } from "gatsby-plugin-image";
import React from "react";
import ReviewPage from "../components/ReviewPage";
import Seo from "../components/Seo";

/**
 * Renders a review page.
 */
export default function Review({
  data,
}: {
  data: PageQueryResult;
}): JSX.Element {
  const { movie } = data;
  return (
    <>
      <Seo
        pageTitle={`${movie.title} (${movie.year})`}
        description={`A review of the ${movie.year} film ${movie.title}.`}
        image={movie.seoImage.childImageSharp.resize.src}
        article
      />
      <ReviewPage data={data} />
    </>
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
