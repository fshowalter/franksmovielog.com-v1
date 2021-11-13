import React from "react";
import type { VenueStat } from "./StatsPage";
import {
  barCellCss,
  barCss,
  headerCss,
  headerRowCss,
  nameCellCss,
  nameHeaderCss,
  rowCss,
  tableCss,
  viewingsCellCss,
  viewingsHeaderCss,
} from "./TopVenues.module.scss";

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

export default function TopVenues({
  venues,
}: {
  venues: VenueStat[];
}): JSX.Element {
  const maxBar = venues.reduce((acc, stat) => {
    const value = stat.viewingCount;
    return acc > value ? acc : value;
  }, 0);

  return (
    <section>
      <h3 className={headerCss}>Top Venues</h3>
      <table className={tableCss}>
        <thead className={headerRowCss}>
          <tr>
            <th className={nameHeaderCss}>Name</th>
            <th>&nbsp;</th>
            <th className={viewingsHeaderCss}>Viewings</th>
          </tr>
        </thead>
        <tbody>
          {venues.map((stat) => {
            return (
              <tr key={stat.name} className={rowCss}>
                <td className={nameCellCss}>{stat.name}</td>
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
