import { graphql } from "gatsby";
import { HeadBuilder, WatchlistEntity } from "../components";

export function Head({
  data,
}: {
  data: Queries.PerformerTemplateQuery;
}): JSX.Element {
  return (
    <HeadBuilder
      pageTitle={data.performer.name}
      description={`A sortable and filterable list of reviews of movies featuring ${data.performer.name}.`}
      image={null}
      article={false}
    />
  );
}

export default function PerformerTemplate({
  data,
}: {
  data: Queries.PerformerTemplateQuery;
}): JSX.Element {
  return (
    <WatchlistEntity
      entity={data.performer}
      distinctReleaseYears={data.distinct.releaseYears}
      tagline="Performer in"
      breadcrumb="Performers"
    />
  );
}

export const pageQuery = graphql`
  query PerformerTemplate($id: String!) {
    distinct: allWatchlistPerformersJson(
      filter: { id: { eq: $id }, slug: { ne: null } }
    ) {
      releaseYears: distinct(field: { titles: { year: SELECT } })
    }
    performer: watchlistPerformer(id: $id) {
      ...WatchlistEntity
    }
  }
`;
