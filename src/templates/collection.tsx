import { graphql } from "gatsby";
import { HeadBuilder, WatchlistEntity } from "../components";

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
    <WatchlistEntity
      entity={data.collection}
      distinctReleaseYears={data.distinct.releaseYears}
      tagline="Collection of"
      breadcrumb="Collections"
    />
  );
}

export const pageQuery = graphql`
  query CollectionTemplate($id: String!) {
    distinct: allWatchlistEntitiesJson(
      filter: { id: { eq: $id }, slug: { ne: null } }
    ) {
      releaseYears: distinct(field: { watchlistMovies: { year: SELECT } })
    }
    collection: watchlistEntity(id: $id) {
      ...WatchlistEntity
    }
  }
`;
