import { graphql } from "gatsby";
import {
  calloutContainerCss,
  containerCss,
  legendCss,
  numberCss,
} from "./Callouts.module.scss";

function Callout({
  stat,
  label,
}: {
  stat: number;
  label: string;
}): JSX.Element {
  return (
    <div className={calloutContainerCss}>
      <span className={numberCss}>{stat.toLocaleString()}</span>{" "}
      <span className={legendCss}>{label}</span>
    </div>
  );
}

export default function Callouts({
  viewingCallouts,
  reviewCallouts,
}: {
  viewingCallouts: Queries.ViewingCalloutsFragment | null;
  reviewCallouts: Queries.ReviewCalloutsFragment | null;
}): JSX.Element {
  return (
    <div className={containerCss}>
      {viewingCallouts && (
        <>
          <Callout label="Viewings" stat={viewingCallouts.viewingCount} />
          <Callout label="Movies" stat={viewingCallouts.movieCount} />
        </>
      )}
      {viewingCallouts &&
        viewingCallouts.movieCount != viewingCallouts.newMovieCount && (
          <Callout label="New Movies" stat={viewingCallouts.newMovieCount} />
        )}
      {reviewCallouts && (
        <>
          <Callout label="Reviews" stat={reviewCallouts.reviewsCreated} />
          <Callout
            label="From Watchlist"
            stat={reviewCallouts.watchlistTitlesReviewed}
          />
        </>
      )}
    </div>
  );
}

export const query = graphql`
  fragment ViewingCallouts on ViewingStatsJson {
    movieCount
    newMovieCount
    viewingCount
  }

  fragment ReviewCallouts on ReviewStatsJson {
    reviewsCreated
    watchlistTitlesReviewed
  }
`;
