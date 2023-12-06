import { graphql } from "gatsby";
import { Box } from "../Box";
import { Layout } from "../Layout";
import { Spacer } from "../Spacer";
import { Callouts } from "./Callouts";
import { Header } from "./Header";
import { WatchlistProgressDetail } from "./WatchlistProgressDetail";

export function WatchlistProgress({
  progress,
}: {
  progress: Queries.WatchlistProgressFragment;
}): JSX.Element {
  return (
    <Layout>
      <Box as="main" display="flex" flexDirection="column" alignItems="center">
        <Header />
        <Spacer axis="vertical" size={32} />
        <Callouts
          movieCount={progress.total}
          reviewedMovieCount={progress.reviewed}
          directorMovieCount={progress.directorTotal}
          directorReviewedMovieCount={progress.directorReviewed}
          performerMovieCount={progress.performerTotal}
          performerReviewedMovieCount={progress.performerReviewed}
          writerMovieCount={progress.writerTotal}
          writerReviewedMovieCount={progress.writerReviewed}
          collectionMovieCount={progress.collectionTotal}
          collectionReviewedMovieCount={progress.collectionReviewed}
        />
        <Spacer axis="vertical" size={32} />
        <Box
          paddingX={{ default: 0, tablet: "gutter", desktop: "pageMargin" }}
          width="full"
          display="flex"
          flexDirection="column"
          alignItems="stretch"
          maxWidth={960}
        >
          <Spacer axis="vertical" size={32} />
          <WatchlistProgressDetail
            label="Director Progress"
            entityType="director"
            entities={progress.directorDetails}
          />
          <Spacer axis="vertical" size={64} />
          <WatchlistProgressDetail
            label="Performer Progress"
            entityType="performer"
            entities={progress.performerDetails}
          />
          <Spacer axis="vertical" size={64} />
          <WatchlistProgressDetail
            label="Writer Progress"
            entityType="writer"
            entities={progress.writerDetails}
          />
          <Spacer axis="vertical" size={64} />
          <WatchlistProgressDetail
            label="Collection Progress"
            entityType="collection"
            entities={progress.collectionDetails}
          />
          <Spacer axis="vertical" size={64} />
        </Box>
      </Box>
    </Layout>
  );
}

export const query = graphql`
  fragment WatchlistProgress on WatchlistProgressJson {
    reviewed
    total
    directorTotal
    directorReviewed
    directorDetails {
      ...WatchlistProgressDetail
    }
    performerTotal
    performerReviewed
    performerDetails {
      ...WatchlistProgressDetail
    }
    writerTotal
    writerReviewed
    writerDetails {
      ...WatchlistProgressDetail
    }
    collectionTotal
    collectionReviewed
    collectionDetails {
      ...WatchlistProgressDetail
    }
  }
`;
