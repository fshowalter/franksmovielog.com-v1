import { graphql } from "gatsby";
import { gridAreaComponent, gridComponent } from "../Grid/Grid";
import Layout from "../Layout";
import { Still } from "../Still";
import Credits from "./Credits";
import RelatedMovies from "./RelatedMovies";
import ReviewContent from "./ReviewContent";
import { gridAreas, gridStyle } from "./ReviewPage.css";
import StructuredData from "./StructuredData";
import Title from "./Title";
import ViewingHistory from "./ViewingHistory";

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
      <Grid as="main" id="top">
        <GridArea name="title">
          <Title movie={movie} />
        </GridArea>
        <GridArea name="still">
          <Still
            image={movie.backdrop}
            title={movie.title}
            year={movie.year}
            margin="center"
          />
        </GridArea>
        <GridArea name="content">
          <ReviewContent movie={movie} />
        </GridArea>
        <GridArea name="viewings">
          <ViewingHistory movie={movie} />
        </GridArea>
        <GridArea name="credits">
          <Credits movie={movie} />
        </GridArea>
        <GridArea name="related">
          <RelatedMovies relatedMovies={movie} />
        </GridArea>
      </Grid>
      <StructuredData data={movie} />
    </Layout>
  );
}

export const pageQuery = graphql`
  query ReviewPage($imdbId: String!) {
    movie: reviewedMovie(imdbId: $imdbId) {
      backdrop {
        childImageSharp {
          gatsbyImageData(
            layout: CONSTRAINED
            formats: [JPG, AVIF]
            quality: 80
            width: 998
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
