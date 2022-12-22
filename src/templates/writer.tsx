import { graphql } from "gatsby";
import { HeadBuilder } from "../components/HeadBuilder";
import { PosterListWithFiltersForWatchlistEntity } from "../components/PosterListWithFiltersForWatchlistEntity";

export function Head({
  data,
}: {
  data: Queries.WriterTemplateQuery;
}): JSX.Element {
  return (
    <HeadBuilder
      pageTitle={data.writer.name}
      description={`A sortable and filterable list of reviews of movies written (in some part) by ${data.writer.name}.`}
      image={null}
      article={false}
    />
  );
}

export default function WriterTemplate({
  data,
}: {
  data: Queries.WriterTemplateQuery;
}): JSX.Element {
  return (
    <PosterListWithFiltersForWatchlistEntity
      entity={data.writer}
      distinctReleaseYears={data.distinct.releaseYears}
      tagline="Writer on"
      breadcrumb="Writers"
    />
  );
}

export const pageQuery = graphql`
  query WriterTemplate($id: String!) {
    distinct: allWatchlistEntitiesJson(
      filter: { id: { eq: $id }, slug: { ne: null } }
    ) {
      releaseYears: distinct(field: { watchlistMovies: { year: SELECT } })
    }
    writer: watchlistEntity(id: $id) {
      ...PosterListWithFiltersForWatchlistEntity
    }
  }
`;
