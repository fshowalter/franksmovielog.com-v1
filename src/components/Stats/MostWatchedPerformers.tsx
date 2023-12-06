import { graphql } from "gatsby";
import { Link } from "../Link";
import { MostWatchedPeople } from "./MostWatchedPeople";

function PerformerName({
  person,
}: {
  person: Queries.MostWatchedPersonFragment;
}): JSX.Element {
  if (person.slug) {
    return (
      <Link to={`/watchlist/performers/${person.slug}/`}>{person.name}</Link>
    );
  }

  return <>{person.name}</>;
}

export function MostWatchedPerformers({
  performers,
}: {
  performers: readonly Queries.MostWatchedPerformersFragment[];
}): JSX.Element | null {
  return (
    <MostWatchedPeople
      people={performers}
      header="Most Watched Performers"
      nameRenderer={PerformerName}
    />
  );
}

export const query = graphql`
  fragment MostWatchedPerformers on MostWatchedPerson {
    ...MostWatchedPerson
  }
`;
