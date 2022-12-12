import { graphql } from "gatsby";
import { Box } from "../components/Box";
import { Layout } from "../components/Layout";
import { Credits } from "../components/ReviewPage/Credits";
import { RelatedMovies } from "../components/ReviewPage/RelatedMovies";
import { ReviewContent } from "../components/ReviewPage/ReviewContent";
import { StructuredData } from "../components/ReviewPage/StructuredData";
import { Title } from "../components/ReviewPage/Title";
import { ViewingHistory } from "../components/ReviewPage/ViewingHistory";
import { Spacer } from "../components/Spacer";
import { Still } from "../components/Still";
import { titleLayoutStyle } from "./review.css";

export { Head } from "../components/ReviewPage/Head";

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
  query ReviewPage($id: String!) {
    movie: reviewedMovie(id: $id) {
      still {
        childImageSharp {
          gatsbyImageData(
            layout: CONSTRAINED
            formats: [JPG, AVIF]
            quality: 80
            width: 960
            placeholder: BLURRED
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
