import React from "react";
import {
  calloutContainerCss,
  containerCss,
  legendCss,
  numberCss,
} from "./StatCallouts.module.scss";

export interface Stat {
  number: number;
  text: string;
}

function StatCallout({ stat }: { stat: Stat }): JSX.Element {
  return (
    <div className={calloutContainerCss}>
      <span className={numberCss}>{stat.number}</span>{" "}
      <span className={legendCss}>{stat.text}</span>
    </div>
  );
}

export default function StatCallouts({
  stats,
}: {
  stats: Stat[];
}): JSX.Element {
  return (
    <div className={containerCss}>
      {stats.map((stat) => {
        return <StatCallout stat={stat} />;
      })}
    </div>
  );
}
