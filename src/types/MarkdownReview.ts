import { FluidObject } from "gatsby-image";

type MarkdownReview = {
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
  linkedHtml: string;
  linkedExcerpt: string;
  hasExcerpt: boolean;
};

export default MarkdownReview;
