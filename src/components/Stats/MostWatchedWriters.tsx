import { graphql } from "gatsby";
import { Link } from "../Link";
import { MostWatchedPeople } from "./MostWatchedPeople";

function WriterName({
  person,
}: {
  person: Queries.MostWatchedPersonFragment;
}): JSX.Element {
  if (person.slug) {
    return <Link to={`/watchlist/writers/${person.slug}/`}>{person.name}</Link>;
  }

  return <>{person.name}</>;
}

export function MostWatchedWriters({
  writers,
}: {
  writers: readonly Queries.MostWatchedWritersFragment[];
}): JSX.Element | null {
  return (
    <MostWatchedPeople
      people={writers}
      header="Most Watched Writers"
      nameRenderer={WriterName}
    />
  );
}

export const query = graphql`
  fragment MostWatchedWriters on MostWatchedPerson {
    ...MostWatchedPerson
  }
`;
