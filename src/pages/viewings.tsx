import { graphql } from "gatsby";
import { Box } from "../components/Box";
import { HeadBuilder } from "../components/HeadBuilder";
import { PageTitle } from "../components/PageTitle";
import { Spacer } from "../components/Spacer";
import { ViewingIndex } from "../components/ViewingIndex";

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

/**
 * Renders the viewings page.
 */
export default function ViewingsIndexPage({
  data,
}: {
  data: Queries.ViewingsIndexPageQuery;
}): JSX.Element {
  return (
    <ViewingIndex
      items={data.viewing.nodes}
      distinctGenres={data.viewing.genres}
      distinctMedia={data.viewing.media}
      distinctVenues={data.viewing.venues}
      distinctReleaseYears={data.viewing.releaseYears}
      distinctViewingYears={data.viewing.viewingYears}
      initialSort="viewing-date-desc"
    >
      <PageTitle textAlign="center">Viewing Log</PageTitle>
      <Box as="q" display="block" textAlign="center" color="subtle">
        We have such sights to show you.
      </Box>
      <Spacer axis="vertical" size={16} />

      <Box color="subtle">
        <Spacer axis="vertical" size={16} />
        <p>
          Since 2012, I&apos;ve watched{" "}
          <Box as="span" color="emphasis">
            {data.viewing.nodes.length.toLocaleString()}
          </Box>{" "}
          movies.
        </p>
      </Box>
    </ViewingIndex>
  );
}

export const pageQuery = graphql`
  query ViewingsIndexPage {
    viewing: allViewingsJson(sort: { sequence: DESC }) {
      nodes {
        sequence
        viewingYear
        viewingMonth: viewingDate(formatString: "MMM")
        viewingDay: viewingDate(formatString: "ddd")
        viewingDate(formatString: "D")
        releaseDate
        title
        medium
        venue
        year
        sortTitle
        slug
        genres
        poster {
          ...CalendarPoster
        }
      }
      media: distinct(field: { medium: SELECT })
      venues: distinct(field: { venue: SELECT })
      viewingYears: distinct(field: { viewingYear: SELECT })
      releaseYears: distinct(field: { year: SELECT })
      genres: distinct(field: { genres: SELECT })
    }
  }
`;
