import { graphql } from "gatsby";
import { Link } from "../Link";
import { MostWatchedPeople } from "../MostWatchedPeople";

function WriterName({
  person,
}: {
  person: Queries.MostWatchedPersonFragment;
}): JSX.Element {
  if (person.slug) {
    return (
      <Link
        textDecoration="none"
        color="accent"
        to={`/watchlist/writers/${person.slug}/`}
      >
        {person.fullName}
      </Link>
    );
  }

  return <>{person.fullName}</>;
}

export function MostWatchedWriters({
  writers,
}: {
  writers: Queries.MostWatchedWritersFragment | null;
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
  fragment MostWatchedWriters on MostWatchedWritersJson {
    ...MostWatchedPeople
  }
`;
