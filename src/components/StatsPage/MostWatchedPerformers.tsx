import { graphql, Link } from "gatsby";
import MostWatchedPeople from "./MostWatchedPeople";

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

export default function MostWatchedPerformers({
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
  fragment MostWatchedPerformers on MostWatchedPerformersJson {
    ...MostWatchedPeople
  }
`;
