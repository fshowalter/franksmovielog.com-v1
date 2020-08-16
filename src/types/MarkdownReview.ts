import { FluidObject } from "gatsby-image";

type MarkdownReview = {
  frontmatter: {
    imdbId: string;
    slug: string;
    grade: string;
    date: string;
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
  poster: {
    childImageSharp: {
      fluid: FluidObject;
    };
  };
  linkedHtml: string;
};

export default MarkdownReview;
