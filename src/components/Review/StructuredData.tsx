import { graphql } from "gatsby";

const gradeMap: Record<string, number> = {
  A: 5,
  B: 4,
  C: 3,
  D: 2,
  F: 1,
};

export function StructuredData({
  review,
}: {
  review: Queries.StructuredDataFragment;
}) {
  const structuredData = {
    "@context": "http://schema.org",
    "@type": "Review",
    itemReviewed: {
      "@type": "Movie",
      name: review.title,
      sameAs: `http://www.imdb.com/title/${review.imdbId}/`,
      image: review.seoImage?.childImageSharp?.resize?.src,
      dateCreated: review.year,
      director: {
        "@type": "Person",
        name: review.directorNames[0],
      },
    },
    reviewRating: {
      "@type": "Rating",
      ratingValue: gradeMap[review.grade[0]],
    },
    author: {
      "@type": "Person",
      name: "Frank Showalter",
    },
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

export const query = graphql`
  fragment StructuredData on ReviewedTitlesJson {
    imdbId
    title
    year
    grade
    directorNames
    seoImage: still {
      childImageSharp {
        resize(toFormat: JPG, width: 1200, quality: 80) {
          src
        }
      }
    }
  }
`;
