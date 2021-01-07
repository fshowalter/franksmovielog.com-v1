import { FluidObject } from "gatsby-image";

export type Person = {
  name: string;
  slug: string;
  reviewedMovies: ReviewedMovie[];
  avatar: {
    childImageSharp: {
      fluid: FluidObject;
    };
  };
};

export type Collection = {
  name: string;
  slug: string;
  reviewedMovies: ReviewedMovie[];
  avatar: {
    childImageSharp: {
      fluid: FluidObject;
    };
  };
};

export type MarkdownReview = {
  frontmatter: {
    imdbId: string;
    slug: string;
    grade: string;
    date: string;
    dateIso: string;
    title: string;
    venue: string;
    venueNotes: string;
    sequence: number;
  };
  linkedHtml: string;
  linkedExcerpt: string;
  reviewedMovie: ReviewedMovie;
};

export type Movie = {
  directors: { name: string }[];
  imdbId: string;
  principalCast: { name: string }[];
  title: string;
  year: string;
  releaseDate: string;
  akaTitles: string[];
  sortTitle: string;
  watchlist: {
    performers: Person[];
    directors: Person[];
    writers: Person[];
    collections: Collection[];
  };
};

type WatchlistMovie = {
  collections: Collection[];
  directors: Person[];
  imdbId: string;
  performers: Person[];
  title: string;
  writers: Person[];
  year: string;
  releaseDate: string;
  sortTitle: string;
  reviewedMovie: ReviewedMovie;
};

type Viewing = {
  title: string;
  year: string;
  venue: string;
  viewingDate: string;
};

export type ReviewedMovie = Movie & {
  lastReviewDate: string;
  lastReviewGrade: string;
  lastReviewGradeValue: number;
  sequence: number;
  slug: string;
  countries: string[];
  runtimeMinutes: number;
  backdrop: {
    childImageSharp: {
      fluid: FluidObject;
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
      fluid: FluidObject;
    };
  };
  reviews: MarkdownReview[];
  olderViewings: Viewing[];
  browseMore: ReviewedMovie[];
};
