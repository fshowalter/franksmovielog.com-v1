import React from "react";
import {
  barCellCss,
  barCss,
  decadeCellCss,
  decadeHeaderCss,
  headerCss,
  headerRowCss,
  rowCss,
  tableCss,
  viewingsCellCss,
  viewingsHeaderCss,
} from "./ByReleaseYear.module.scss";
import type { DecadeStat } from "./StatsPage";

function BarGraph({
  value,
  maxValue,
}: {
  value: number;
  maxValue: number;
}): JSX.Element {
  const barPercentProperty = {
    "--bar-percent": `${(value / maxValue) * 100}%`,
  } as React.CSSProperties;

  return (
    <div className={barCss} style={barPercentProperty}>
      &nbsp;
    </div>
  );
}

export default function ByReleaseYear({
  decades,
}: {
  decades: DecadeStat[];
}): JSX.Element {
  const maxBar = decades.reduce((acc, stat) => {
    const value = stat.viewingCount;
    return acc > value ? acc : value;
  }, 0);

  return (
    <section>
      <h3 className={headerCss}>By Release Year</h3>
      <table className={tableCss}>
        <thead className={headerRowCss}>
          <tr>
            <th className={decadeHeaderCss}>Decade</th>
            <th>&nbsp;</th>
            <th className={viewingsHeaderCss}>Viewings</th>
          </tr>
        </thead>
        <tbody>
          {decades.map((stat) => {
            return (
              <tr key={stat.decade} className={rowCss}>
                <td className={decadeCellCss}>{stat.decade}</td>
                <td className={barCellCss}>
                  <BarGraph value={stat.viewingCount} maxValue={maxBar} />
                </td>
                <td className={viewingsCellCss}>{stat.viewingCount}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}
