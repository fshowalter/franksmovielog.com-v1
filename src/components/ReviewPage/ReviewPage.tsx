import { graphql } from "gatsby";
import { Box } from "../Box";
import { gridAreaComponent, gridComponent } from "../Grid/Grid";
import Layout from "../Layout";
import { Still } from "../Still";
import { Credits } from "./Credits";
import { RelatedMovies } from "./RelatedMovies";
import { ReviewContent } from "./ReviewContent";
import { gridAreas, gridStyle } from "./ReviewPage.css";
import { StructuredData } from "./StructuredData";
import { Title } from "./Title";
import { ViewingHistory } from "./ViewingHistory";

export { Head } from "./Head";

const GridArea = gridAreaComponent(gridAreas);

const Grid = gridComponent(gridStyle);

/**
 * Renders a review page.
 */
export default function ReviewPage({
  data,
}: {
  data: Queries.ReviewPageQuery;
}): JSX.Element {
  const movie = data.movie;

  return (
    <Layout>
      <Box
        as="main"
        id="top"
        display="flex"
        flexDirection="column"
        alignItems="center"
        paddingBottom={128}
      >
        <Title
          movie={movie}
          paddingX="gutter"
          paddingY={{ mobile: 24, desktop: 32 }}
          textAlign="center"
        />
        <Still image={movie.still} title={movie.title} year={movie.year} />
        <ReviewContent
          movie={movie}
          paddingX="gutter"
          paddingY={32}
          alignItems="center"
        />
        <ViewingHistory
          movie={movie}
          maxWidth="proseWithGutters"
          width="full"
          marginTop={48}
        />
        <Credits movie={movie} maxWidth="proseWithGutters" marginTop={128} />
        <RelatedMovies relatedMovies={movie} marginTop={128} />
      </Box>
      <StructuredData data={movie} />
    </Layout>
  );
}

export const pageQuery = graphql`
  query ReviewPage($imdbId: String!) {
    movie: reviewedMovie(imdbId: $imdbId) {
      still {
        childImageSharp {
          gatsbyImageData(
            layout: CONSTRAINED
            formats: [JPG, AVIF]
            quality: 80
            width: 960
            placeholder: TRACED_SVG
          )
        }
      }
      ...ReviewHead
      ...ReviewContent
      ...ReviewTitle
      ...ViewingHistory
      ...Credits
      ...RelatedMovies
      ...StructuredData
    }
  }
`;
