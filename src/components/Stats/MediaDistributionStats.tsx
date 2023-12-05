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

export function TopMedia({
  topMedia,
}: {
  topMedia: Queries.TopMediaFragment | null;
}): JSX.Element | null {
  if (!topMedia) {
    return null;
  }

  const { stats } = topMedia;

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
  fragment MediaDistribution on StatsDistribution {
    name
    count
  }
`;
