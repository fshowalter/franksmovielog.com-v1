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
  decades: Queries.DecadeDistribution[] | null;
}): JSX.Element | null {
  if (!decades) {
    return null;
  }

  const maxBar = decades.reduce((acc, stat) => {
    const value = stat.count;
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
              <TableRow key={stat.name}>
                <TableDataCell align="left">{stat.name}</TableDataCell>
                <TableDataCell align="fill">
                  <BarGradient value={stat.count} maxValue={maxBar} />
                </TableDataCell>
                <TableDataCell align="right">{stat.count}</TableDataCell>
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
