import { graphql } from "gatsby";
import { Collection, HeadBuilder } from "../components";

export function Head({
  data,
}: {
  data: Queries.CollectionTemplateQuery;
}): JSX.Element {
  return (
    <HeadBuilder
      pageTitle={data.collection.name}
      description={`A sortable and filterable list of reviews of movies in the ${data.collection.name} collection.`}
      image={null}
      article={false}
    />
  );
}

export default function CollectionTemplate({
  data,
}: {
  data: Queries.CollectionTemplateQuery;
}): JSX.Element {
  return (
    <Collection
      collection={data.collection}
      distinctReleaseYears={data.distinct.releaseYears}
    />
  );
}

export const pageQuery = graphql`
  query CollectionTemplate($id: String!) {
    distinct: allCollectionsJson(
      filter: { id: { eq: $id }, slug: { ne: null } }
    ) {
      releaseYears: distinct(field: { titles: { year: SELECT } })
    }
    collection: collection(id: $id) {
      ...Collection
    }
  }
`;
