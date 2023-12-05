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
      <Link to={`/watchlist/performers/${person.slug}/`}>
        {person.fullName}
      </Link>
    );
  }

  return <>{person.fullName}</>;
}

export function MostWatchedPerformers({
  performers,
}: {
  performers: Queries.MostWatchedPerformersFragment | null;
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
    ...MostWatchedPeople
  }
`;
