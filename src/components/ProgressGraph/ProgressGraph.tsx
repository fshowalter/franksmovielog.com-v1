import React from "react";
import {
  percentGraphBackgroundCss,
  percentGraphCss,
  percentGraphProgressCss,
  percentNumberCss,
} from "./ProgressGraph.module.scss";

export default function ProgressGraph({
  total,
  complete,
}: {
  total: number;
  complete: number;
}): JSX.Element | null {
  if (total === 0) {
    return null;
  }

  const percent = Math.floor((complete / total) * 100);

  return (
    <svg viewBox="0 0 36 36" className={percentGraphCss}>
      <path
        className={percentGraphBackgroundCss}
        d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
      />
      <path
        d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
        className={percentGraphProgressCss}
        strokeDasharray={`${percent}, 100`}
      />
      <text x="18" y="20.35" className={percentNumberCss}>
        {percent}%
      </text>
    </svg>
  );
}
