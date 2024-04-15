import { graphql } from "gatsby";
import { CastAndCrewMember, HeadBuilder } from "../components";

export function Head({
  data,
}: {
  data: Queries.CastAndCrewMemberTemplateQuery;
}): JSX.Element {
  return (
    <HeadBuilder
      pageTitle={data.castAndCrewMember.name}
      description={`A sortable and filterable list of reviews of ${data.castAndCrewMember.name} movies.`}
      image={null}
      article={false}
    />
  );
}

export default function CastAndCrewMemberTemplate({
  data,
}: {
  data: Queries.CastAndCrewMemberTemplateQuery;
}): JSX.Element {
  return (
    <CastAndCrewMember
      member={data.castAndCrewMember}
      distinctReleaseYears={data.distinct.releaseYears}
    />
  );
}

export const pageQuery = graphql`
  query CastAndCrewMemberTemplate($id: String!) {
    distinct: allCastAndCrewJson(filter: { id: { eq: $id } }) {
      releaseYears: distinct(field: { titles: { year: SELECT } })
    }
    castAndCrewMember: castAndCrewMember(id: $id) {
      ...CastAndCrewMember
    }
  }
`;
