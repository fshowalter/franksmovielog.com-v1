import { graphql } from "gatsby";
import { MostWatchedPeople } from "./MostWatchedPeople";

export function MostWatchedPerformers({
  performers,
}: {
  performers: readonly Queries.MostWatchedPerformersFragment[];
}): JSX.Element | null {
  return (
    <MostWatchedPeople people={performers} header="Most Watched Performers" />
  );
}

export const query = graphql`
  fragment MostWatchedPerformers on MostWatchedPerson {
    ...MostWatchedPerson
  }
`;
