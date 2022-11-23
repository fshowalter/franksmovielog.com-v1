import { graphql } from "gatsby";

const gradeMap: { [index: string]: number } = {
  A: 5,
  B: 4,
  C: 3,
  D: 2,
  F: 1,
};

export default function StructuredData({
  data,
}: {
  data: Queries.StructuredDataFragment;
}) {
  const structuredData = {
    "@context": "http://schema.org",
    "@type": "Review",
    itemReviewed: {
      "@type": "Movie",
      name: data.title,
      sameAs: `http://www.imdb.com/title/${data.imdbId}/`,
      image: data.seoImage?.childImageSharp?.resize?.src,
      dateCreated: data.year,
      director: {
        "@type": "Person",
        name: data.directorNames[0],
      },
    },
    reviewRating: {
      "@type": "Rating",
      ratingValue: gradeMap[data.grade[0]],
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
  fragment StructuredData on ReviewedMoviesJson {
    imdbId
    title
    year
    grade
    directorNames
    seoImage: backdrop {
      childImageSharp {
        resize(toFormat: JPG, width: 1200, quality: 80) {
          src
        }
      }
    }
  }
`;
