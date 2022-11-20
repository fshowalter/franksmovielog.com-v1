import Bar from "./Bar";
import StatHeading from "./StatHeading";
import type { MediumStat } from "./StatsPage";
import {
  Table,
  TableDataCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "./Table";

export default function TopMedia({
  stats,
}: {
  stats: MediumStat[];
}): JSX.Element {
  const maxBar = stats.reduce((acc, stat) => {
    const value = stat.viewingCount;
    return acc > value ? acc : value;
  }, 0);

  return (
    <section>
      <StatHeading>Top Media</StatHeading>
      <Table>
        <TableHead>
          <tr>
            <TableHeaderCell align="left">Name</TableHeaderCell>
            <th>&nbsp;</th>
            <TableHeaderCell align="right">Viewings</TableHeaderCell>
          </tr>
        </TableHead>
        <tbody>
          {stats.map((stat) => {
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
