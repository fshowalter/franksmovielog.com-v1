import { graphql } from "gatsby";
import { CastAndCrewMember, HeadBuilder } from "../components";

export function Head({
  data,
}: {
  data: Queries.DirectorTemplateQuery;
}): JSX.Element {
  return (
    <HeadBuilder
      pageTitle={data.castAndCrewMember.name}
      description={`A sortable and filterable list of reviews of movies directed by ${data.castAndCrewMember.name}.`}
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
