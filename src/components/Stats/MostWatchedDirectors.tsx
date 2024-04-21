import { graphql } from "gatsby";
import { MostWatchedPeople } from "./MostWatchedPeople";

export function MostWatchedDirectors({
  directors,
}: {
  directors: readonly Queries.MostWatchedDirectorsFragment[];
}): JSX.Element | null {
  return (
    <MostWatchedPeople people={directors} header="Most Watched Directors" />
  );
}

export const query = graphql`
  fragment MostWatchedDirectors on MostWatchedPerson {
    ...MostWatchedPerson
  }
`;
