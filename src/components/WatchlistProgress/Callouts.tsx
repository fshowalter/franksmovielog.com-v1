import { Box } from "../Box";
import { Spacer } from "../Spacer";
import { ProgressRing } from "./ProgressRing";

function Callout({
  total,
  reviewed,
  label,
  subLabel,
}: {
  total: number | null;
  reviewed: number | null;
  label: string;
  subLabel?: string;
}): JSX.Element {
  return (
    <>
      <ProgressRing
        width={144}
        height={144}
        total={total ?? 0}
        complete={reviewed ?? 0}
        label={label}
        subLabel={subLabel}
      />
      <Spacer axis="vertical" size={8} />
      <Box color="subtle" textAlign="center">
        <Box>
          {reviewed?.toLocaleString()}/{total?.toLocaleString()}
        </Box>
        <Box fontSize="small" lineHeight={16}>
          Reviewed
        </Box>
      </Box>
    </>
  );
}

export function Callouts({
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
}): JSX.Element {
  return (
    <Box
      as="section"
      display="flex"
      flexWrap="wrap"
      columnGap={32}
      justifyContent="center"
    >
      <Box
        minWidth={{ default: "full", tablet: 0 }}
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Spacer axis="vertical" size={32} />
        <Callout
          total={movieCount}
          reviewed={reviewedMovieCount}
          label="Total Progress"
        />
      </Box>
      <Box>
        <Spacer axis="vertical" size={32} />
        <Callout
          total={directorMovieCount}
          reviewed={directorReviewedMovieCount}
          label="Director"
          subLabel="Titles"
        />
      </Box>
      <Box>
        <Spacer axis="vertical" size={32} />
        <Callout
          total={performerMovieCount}
          reviewed={performerReviewedMovieCount}
          label="Performer"
          subLabel="Titles"
        />
      </Box>
      <Box>
        <Spacer axis="vertical" size={32} />
        <Callout
          total={writerMovieCount}
          reviewed={writerReviewedMovieCount}
          label="Writer"
          subLabel="Titles"
        />
      </Box>
      <Box>
        <Spacer axis="vertical" size={32} />
        <Callout
          total={collectionMovieCount}
          reviewed={collectionReviewedMovieCount}
          label="Collection"
          subLabel="Titles"
        />
      </Box>
    </Box>
  );
}
