import React from "react";
import Bar from "./Bar";
import StatHeading from "./StatHeading";
import type { GradeDistribution } from "./StatsPage";
import {
  Table,
  TableDataCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "./Table";

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
      <StatHeading>Grade Distribution</StatHeading>
      <Table>
        <TableHead>
          <tr>
            <TableHeaderCell align="left">Grade</TableHeaderCell>
            <th>&nbsp;</th>
            <TableHeaderCell align="right">Reviews</TableHeaderCell>
          </tr>
        </TableHead>
        <tbody>
          {distributions.map((distribution) => {
            return (
              <TableRow key={distribution.grade}>
                <TableDataCell align="left">{distribution.grade}</TableDataCell>
                <TableDataCell align="fill">
                  <Bar value={distribution.reviewCount} maxValue={maxBar} />
                </TableDataCell>
                <TableDataCell align="right">
                  {distribution.reviewCount}
                </TableDataCell>
              </TableRow>
            );
          })}
        </tbody>
      </Table>
    </section>
  );
}
