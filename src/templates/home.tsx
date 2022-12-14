import { graphql } from "gatsby";
import { useRef } from "react";
import { Box, HeadBuilder, Layout } from "../components";
import { Item } from "../components/HomePage/Item";
import { Pagination } from "../components/Pagination";

export interface PageContext {
  limit: number;
  skip: number;
  numberOfItems: number;
  currentPage: number;
}

export function Head({
  pageContext,
}: {
  pageContext: PageContext;
}): JSX.Element {
  return (
    <HeadBuilder
      pageTitle={
        pageContext.currentPage === 1
          ? "Frank's Movie Log: My Life at the Movies"
          : `Page ${pageContext.currentPage}`
      }
      description="Reviews of current, cult, classic, and forgotten films."
      article={false}
      image={null}
    />
  );
}

export default function HomeTemplate({
  pageContext,
  data,
}: {
  pageContext: PageContext;
  data: NonNullable<Queries.HomeTemplateQuery>;
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
  query HomeTemplate($skip: Int!, $limit: Int!) {
    viewings: viewingsWithReviews(
      sort: { sequence: DESC }
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
