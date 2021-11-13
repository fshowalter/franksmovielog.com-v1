import React from "react";
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
  viewingCount,
  movieCount,
  newMovieCount,
  reviewCount,
}: {
  viewingCount: number;
  movieCount: number;
  newMovieCount: number;
  reviewCount: number | undefined;
}): JSX.Element {
  return (
    <div className={containerCss}>
      <Callout label="Viewings" stat={viewingCount} />
      <Callout label="Movies" stat={movieCount} />
      {movieCount != newMovieCount && (
        <Callout label="New Movies" stat={newMovieCount} />
      )}
      {reviewCount && <Callout label="Reviews" stat={reviewCount} />}
    </div>
  );
}
