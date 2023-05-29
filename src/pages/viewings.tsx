import { graphql } from "gatsby";
import { HeadBuilder } from "../components/HeadBuilder";

import Viewings from "../components/Viewings/Viewings";

export function Head(): JSX.Element {
  return (
    <HeadBuilder
      pageTitle="Viewing Log"
      description="A sortable and filterable list of every movie I've watched since 2012."
      image={null}
      article={false}
    />
  );
}

export default function ViewingsPage({
  data,
}: {
  data: Queries.ViewingsPageQuery;
}): JSX.Element {
  return (
    <Viewings
      items={data.viewing.nodes}
      distinctGenres={data.viewing.genres}
      distinctVenues={data.viewing.venues}
      distinctMedia={data.viewing.media}
      distinctReleaseYears={data.viewing.releaseYears}
      distinctViewingYears={data.viewing.viewingYears}
    />
  );
}

export const pageQuery = graphql`
  query ViewingsPage {
    viewing: allViewingsJson(sort: { sequence: DESC }) {
      nodes {
        ...ViewingsItem
      }
      media: distinct(field: { medium: SELECT })
      venues: distinct(field: { venue: SELECT })
      viewingYears: distinct(field: { viewingYear: SELECT })
      releaseYears: distinct(field: { year: SELECT })
      genres: distinct(field: { genres: SELECT })
    }
  }
`;
