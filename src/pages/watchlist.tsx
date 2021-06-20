import { graphql } from "gatsby";
import React from "react";
import Seo from "../components/Seo";
import WatchlistPage from "../components/WatchlistPage";

/**
 * Renders the watchlist page.
 */
export default function WatchlistPageShell({
  data,
}: {
  data: PageQueryResult;
}): JSX.Element {
  return (
    <>
      <Seo
        pageTitle="Watchlist"
        description="My movie review bucketlist."
        image={null}
        article={false}
      />
      <WatchlistPage data={data} />
    </>
  );
}

type WatchlistMovie = {
  collectionNames: string[];
  directorNames: string[];
  imdbId: string;
  performerNames: string[];
  title: string;
  writerNames: string[];
  year: number;
  releaseDate: string;
  sortTitle: string;
  reviewsSlug: string | null;
};

interface PageQueryResult {
  watchlist: {
    nodes: WatchlistMovie[];
  };
}

export const pageQuery = graphql`
  query {
    watchlist: allWatchlistMoviesJson(
      sort: { fields: [release_date], order: ASC }
    ) {
      nodes {
        imdbId: imdb_id
        title
        year
        releaseDate: release_date
        sortTitle: sort_title
        reviewedMovieSlug
        directorNames
        performerNames
        writerNames
        collectionNames: collection_names
      }
    }
  }
`;
