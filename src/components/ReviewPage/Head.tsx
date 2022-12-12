import { graphql } from "gatsby";
import { HeadBuilder } from "../HeadBuilder";

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

export function Head({ data }: { data: Queries.ReviewPageQuery }): JSX.Element {
  const movie = data.movie;

  return (
    <HeadBuilder
      pageTitle={`${movie.title} (${movie.year})`}
      description={`${starsForGrade(movie.grade[0])} ${
        movie.review.excerpt ?? ""
      }`}
      image={movie.seoImage?.childImageSharp?.resize?.src}
      article
    />
  );
}

export const query = graphql`
  fragment ReviewHead on ReviewedMoviesJson {
    title
    year
    grade
    review {
      excerpt
    }
    seoImage: still {
      childImageSharp {
        resize(toFormat: JPG, width: 1200, quality: 80) {
          src
        }
      }
    }
  }
`;
