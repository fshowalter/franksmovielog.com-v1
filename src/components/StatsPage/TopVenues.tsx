import React from "react";
import Bar from "./Bar";
import StatHeading from "./StatHeading";
import type { VenueStat } from "./StatsPage";
import {
  Table,
  TableDataCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "./Table";

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
      <StatHeading>Top Venues</StatHeading>
      <Table>
        <TableHead>
          <tr>
            <TableHeaderCell align="left">Name</TableHeaderCell>
            <th>&nbsp;</th>
            <TableHeaderCell align="right">Viewings</TableHeaderCell>
          </tr>
        </TableHead>
        <tbody>
          {venues.map((stat) => {
            return (
              <TableRow key={stat.name}>
                <TableDataCell align="left">{stat.name}</TableDataCell>
                <TableDataCell hideOnSmallScreens align="fill">
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
