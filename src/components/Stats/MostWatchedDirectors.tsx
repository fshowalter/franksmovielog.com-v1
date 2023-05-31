import { graphql } from "gatsby";
import { Link } from "../Link";
import { MostWatchedPeople } from "./MostWatchedPeople";

function DirectorName({
  person,
}: {
  person: Queries.MostWatchedPersonFragment;
}): JSX.Element {
  if (person.slug) {
    return (
      <Link to={`/watchlist/directors/${person.slug}/`}>{person.fullName}</Link>
    );
  }

  return <>{person.fullName}</>;
}

export function MostWatchedDirectors({
  directors,
}: {
  directors: Queries.MostWatchedDirectorsFragment | null;
}): JSX.Element | null {
  return (
    <MostWatchedPeople
      people={directors}
      header="Most Watched Directors"
      nameRenderer={DirectorName}
    />
  );
}

export const query = graphql`
  fragment MostWatchedDirectors on MostWatchedDirectorsJson {
    ...MostWatchedPeople
  }
`;
