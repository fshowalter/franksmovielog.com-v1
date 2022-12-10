import { graphql } from "gatsby";
import { useRef } from "react";
import { Box } from "../Box";
import { Layout } from "../Layout";
import { Item } from "./Item";
import { Pagination } from "./Pagination";

export interface PageContext {
  limit: number;
  skip: number;
  numberOfItems: number;
  currentPage: number;
}

export { Head } from "./Head";

export default function HomePage({
  pageContext,
  data,
}: {
  pageContext: PageContext;
  data: NonNullable<Queries.HomePageQuery>;
}): JSX.Element {
  const listHeader = useRef<HTMLDivElement>(null);
  const { viewings } = data;

  return (
    <Layout>
      <Box as="main" innerRef={listHeader}>
        <Box as="ol" display="flex" flexDirection="column" padding={0}>
          {viewings.map((viewing, index) => {
            return (
              <Item
                key={viewing.sequence}
                viewing={viewing}
                eagerLoadImage={index === 0}
                counterValue={
                  pageContext.numberOfItems - pageContext.skip - index
                }
              />
            );
          })}
        </Box>
        <Pagination
          currentPage={pageContext.currentPage}
          urlRoot="/"
          perPage={pageContext.limit}
          numberOfItems={pageContext.numberOfItems}
          prevText="Newer"
          nextText="Older"
          paddingX="gutter"
          paddingY={40}
          justifyContent="center"
        />
      </Box>
    </Layout>
  );
}

export const pageQuery = graphql`
  query HomePage($skip: Int!, $limit: Int!) {
    viewings: viewingsWithReviews(
      sort: { fields: sequence, order: DESC }
      limit: $limit
      skip: $skip
    ) {
      imdbId
      sequence
      title
      year
      date: viewingDate(formatString: "DD MMM, YYYY")
      slug
      grade
      principalCastNames
      directorNames
      excerpt
      still {
        childImageSharp {
          gatsbyImageData(
            layout: CONSTRAINED
            formats: [JPG, AVIF]
            quality: 80
            width: 512
            placeholder: TRACED_SVG
          )
        }
      }
    }
  }
`;
