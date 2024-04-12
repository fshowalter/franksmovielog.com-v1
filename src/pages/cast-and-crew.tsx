import { graphql } from "gatsby";
import { CastAndCrew, HeadBuilder } from "../components/";

export function Head(): JSX.Element {
  return (
    <HeadBuilder
      pageTitle={`Cast and Crew`}
      description={`A sortable and filterable list of select cast and crew members of reviewed movies.`}
      image={null}
      article={false}
    />
  );
}

export default function CastAndCrewPage({
  data,
}: {
  data: Queries.CastAndCrewPageQuery;
}): JSX.Element {
  return <CastAndCrew entities={data.entity.nodes} />;
}

export const pageQuery = graphql`
  query CastAndCrewPage {
    entity: allCastAndCrewJson(sort: { name: ASC }) {
      nodes {
        ...CastAndCrewItem
      }
    }
  }
`;
