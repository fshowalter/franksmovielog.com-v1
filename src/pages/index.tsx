import { graphql } from "gatsby";
import { HeadBuilder, Home } from "../components";

export interface PageContext {
  limit: number;
  skip: number;
  numberOfItems: number;
  currentPage: number;
}

export function Head(): JSX.Element {
  return (
    <HeadBuilder
      pageTitle="Frank's Movie Log: My Life at the Movies"
      description="Reviews of current, cult, classic, and forgotten films."
      article={false}
      image={null}
    />
  );
}

export default function HomeTemplate({
  data,
}: {
  pageContext: PageContext;
  data: NonNullable<Queries.HomePageQuery>;
}): JSX.Element | null {
  return <Home items={data.reviewedTitle.nodes} />;
}

export const pageQuery = graphql`
  query HomePage {
    reviewedTitle: allReviewedTitlesJson(sort: { sequence: DESC }, limit: 15) {
      nodes {
        ...HomePageItem
      }
    }
  }
`;
