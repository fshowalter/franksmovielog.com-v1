import { graphql } from "gatsby";
import { Box } from "../Box";
import { Layout } from "../Layout";
import { Spacer } from "../Spacer";
import { Still } from "../Still";
import { Credits } from "./Credits";
import { RelatedMovies } from "./RelatedMovies";
import { ReviewContent } from "./ReviewContent";
import { titleLayoutStyle } from "./ReviewPage.css";
import { StructuredData } from "./StructuredData";
import { Title } from "./Title";
import { ViewingHistory } from "./ViewingHistory";

export { Head } from "./Head";

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
      >
        <Title
          movie={movie}
          paddingX="gutter"
          textAlign="center"
          className={titleLayoutStyle}
        />
        <Still image={movie.still} title={movie.title} year={movie.year} />
        <Spacer axis="vertical" size={32} />
        <ReviewContent movie={movie} paddingX="gutter" alignItems="center" />
        <Spacer axis="vertical" size={80} />
        <ViewingHistory
          movie={movie}
          maxWidth="proseWithGutters"
          width="full"
        />
        <Spacer axis="vertical" size={128} />
        <Credits movie={movie} maxWidth="proseWithGutters" />
        <Spacer axis="vertical" size={128} />
        <RelatedMovies relatedMovies={movie} />
        <Spacer axis="vertical" size={128} />
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
