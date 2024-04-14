import { graphql } from "gatsby";
import { Collections, HeadBuilder } from "../components";

export function Head(): JSX.Element {
  return (
    <HeadBuilder
      pageTitle={`Collections`}
      description={`A sortable and filterable list of movie collections.`}
      image={null}
      article={false}
    />
  );
}

export default function CollectionsPage({
  data,
}: {
  data: Queries.CollectionsPageQuery;
}): JSX.Element {
  return <Collections collections={data.collection.nodes} />;
}

export const pageQuery = graphql`
  query CollectionsPage {
    collection: allCollectionsJson(sort: { name: ASC }) {
      nodes {
        ...CollectionsItem
      }
    }
  }
`;
