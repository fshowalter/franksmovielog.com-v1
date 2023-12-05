import { graphql } from "gatsby";
import { HeadBuilder, WatchlistEntity } from "../components";

export function Head({
  data,
}: {
  data: Queries.DirectorTemplateQuery;
}): JSX.Element {
  return (
    <HeadBuilder
      pageTitle={data.director.name}
      description={`A sortable and filterable list of reviews of movies directed by ${data.director.name}.`}
      image={null}
      article={false}
    />
  );
}

export default function DirectorTemplate({
  data,
}: {
  data: Queries.DirectorTemplateQuery;
}): JSX.Element {
  return (
    <WatchlistEntity
      entity={data.director}
      distinctReleaseYears={data.distinct.releaseYears}
      tagline="Director of"
      breadcrumb="Directors"
    />
  );
}

export const pageQuery = graphql`
  query DirectorTemplate($id: String!) {
    distinct: allWatchlistEntitiesJson(
      filter: { id: { eq: $id }, slug: { ne: null } }
    ) {
      releaseYears: distinct(field: { titles: { year: SELECT } })
    }
    director: watchlistEntity(id: $id) {
      ...WatchlistEntity
    }
  }
`;
