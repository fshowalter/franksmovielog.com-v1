import { graphql } from "gatsby";
import { BarGradient } from "../BarGradient";
import { StatHeading } from "../StatHeading/StatHeading";
import {
  Table,
  TableDataCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "../StatsTable";

export function ByReleaseYearStats({
  decades,
}: {
  decades: Queries.ByDecadeFragment | null;
}): JSX.Element | null {
  if (!decades) {
    return null;
  }

  const { stats } = decades;

  const maxBar = stats.reduce((acc, stat) => {
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
          {stats.map((stat) => {
            return (
              <TableRow key={stat.decade}>
                <TableDataCell align="left">{stat.decade}</TableDataCell>
                <TableDataCell align="fill">
                  <BarGradient value={stat.viewingCount} maxValue={maxBar} />
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

export const query = graphql`
  fragment DecadeDistribution on StatsDistribution {
    name
    count
  }
`;
