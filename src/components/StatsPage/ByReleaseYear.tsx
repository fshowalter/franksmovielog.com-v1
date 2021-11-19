import React from "react";
import Bar from "./Bar";
import StatHeading from "./StatHeading";
import type { DecadeStat } from "./StatsPage";
import {
  Table,
  TableDataCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "./Table";

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
      <StatHeading>By Release Year</StatHeading>
      <Table>
        <TableHead>
          <tr>
            <TableHeaderCell align="left">Decade</TableHeaderCell>
            <th>&nbsp;</th>
            <TableHeaderCell align="right">Viewings</TableHeaderCell>
          </tr>
        </TableHead>
        <tbody>
          {decades.map((stat) => {
            return (
              <TableRow key={stat.decade}>
                <TableDataCell align="left">{stat.decade}</TableDataCell>
                <TableDataCell align="fill">
                  <Bar value={stat.viewingCount} maxValue={maxBar} />
                </TableDataCell>
                <TableDataCell align="right">{stat.viewingCount}</TableDataCell>
              </TableRow>
            );
          })}
        </tbody>
      </Table>
    </section>
  );
}
