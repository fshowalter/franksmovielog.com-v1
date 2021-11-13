import React from "react";
import {
  barCellCss,
  barCss,
  gradeCellCss,
  gradeHeaderCss,
  headerCss,
  headerRowCss,
  reviewsCellCss,
  reviewsHeaderCss,
  rowCss,
  tableCss,
} from "./GradeDistribution.module.scss";
import type { GradeDistribution } from "./StatsPage";

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

export default function GradeDistributions({
  distributions,
}: {
  distributions: GradeDistribution[];
}): JSX.Element {
  const maxBar = distributions.reduce((acc, stat) => {
    const value = stat.reviewCount;
    return acc > value ? acc : value;
  }, 0);

  return (
    <section>
      <h3 className={headerCss}>Grade Distribution</h3>
      <table className={tableCss}>
        <thead className={headerRowCss}>
          <tr>
            <th className={gradeHeaderCss}>Grade</th>
            <th>&nbsp;</th>
            <th className={reviewsHeaderCss}>Reviews</th>
          </tr>
        </thead>
        <tbody>
          {distributions.map((distribution) => {
            return (
              <tr key={distribution.grade} className={rowCss}>
                <td className={gradeCellCss}>{distribution.grade}</td>
                <td className={barCellCss}>
                  <BarGraph
                    value={distribution.reviewCount}
                    maxValue={maxBar}
                  />
                </td>
                <td className={reviewsCellCss}>{distribution.reviewCount}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}
