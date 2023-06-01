import { Box } from "../Box";
import { Layout } from "../Layout";
import { Spacer } from "../Spacer";
import { Callouts } from "./Callouts";
import { Header } from "./Header";
import { WatchlistProgressForEntities } from "./WatchlistProgressForEntities";

export function WatchlistProgress({
  movieCount,
  reviewedMovieCount,
  directorMovieCount,
  directorReviewedMovieCount,
  performerMovieCount,
  performerReviewedMovieCount,
  writerMovieCount,
  writerReviewedMovieCount,
  collectionMovieCount,
  collectionReviewedMovieCount,
  directorProgress,
  performerProgress,
  writerProgress,
  collectionProgress,
}: {
  movieCount: number;
  reviewedMovieCount: number;
  directorMovieCount: number | null;
  directorReviewedMovieCount: number | null;
  performerMovieCount: number | null;
  performerReviewedMovieCount: number | null;
  writerMovieCount: number | null;
  writerReviewedMovieCount: number | null;
  collectionMovieCount: number | null;
  collectionReviewedMovieCount: number | null;
  directorProgress: readonly Queries.WatchlistProgressForEntitiesItemFragment[];
  performerProgress: readonly Queries.WatchlistProgressForEntitiesItemFragment[];
  writerProgress: readonly Queries.WatchlistProgressForEntitiesItemFragment[];
  collectionProgress: readonly Queries.WatchlistProgressForEntitiesItemFragment[];
}): JSX.Element {
  return (
    <Layout>
      <Box as="main" display="flex" flexDirection="column" alignItems="center">
        <Header />
        <Spacer axis="vertical" size={32} />
        <Callouts
          movieCount={movieCount}
          reviewedMovieCount={reviewedMovieCount}
          directorMovieCount={directorMovieCount}
          directorReviewedMovieCount={directorReviewedMovieCount}
          performerMovieCount={performerMovieCount}
          performerReviewedMovieCount={performerReviewedMovieCount}
          writerMovieCount={writerMovieCount}
          writerReviewedMovieCount={writerReviewedMovieCount}
          collectionMovieCount={collectionMovieCount}
          collectionReviewedMovieCount={collectionReviewedMovieCount}
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
          <WatchlistProgressForEntities
            label="Director Progress"
            entities={directorProgress}
          />
          <Spacer axis="vertical" size={64} />
          <WatchlistProgressForEntities
            label="Performer Progress"
            entities={performerProgress}
          />
          <Spacer axis="vertical" size={64} />
          <WatchlistProgressForEntities
            label="Writer Progress"
            entities={writerProgress}
          />
          <Spacer axis="vertical" size={64} />
          <WatchlistProgressForEntities
            label="Collection Progress"
            entities={collectionProgress}
          />
          <Spacer axis="vertical" size={64} />
        </Box>
      </Box>
    </Layout>
  );
}
