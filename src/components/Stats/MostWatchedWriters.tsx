import { graphql } from "gatsby";
import { MostWatchedPeople } from "./MostWatchedPeople";

export function MostWatchedWriters({
  writers,
}: {
  writers: readonly Queries.MostWatchedWritersFragment[];
}): JSX.Element | null {
  return <MostWatchedPeople people={writers} header="Most Watched Writers" />;
}

export const query = graphql`
  fragment MostWatchedWriters on MostWatchedPerson {
    ...MostWatchedPerson
  }
`;
