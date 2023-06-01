import { graphql } from "gatsby";
import { HeadBuilder, Home } from "../components";

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
  return (
    <Home
      items={data.items}
      limit={pageContext.limit}
      skip={pageContext.skip}
      numberOfItems={pageContext.numberOfItems}
      currentPageNumber={pageContext.currentPage}
    />
  );
}

export const pageQuery = graphql`
  query HomeTemplate($skip: Int!, $limit: Int!) {
    items: viewingsWithReviewOrNote(
      sort: { sequence: DESC }
      limit: $limit
      skip: $skip
    ) {
      ...HomePageItem
    }
  }
`;
