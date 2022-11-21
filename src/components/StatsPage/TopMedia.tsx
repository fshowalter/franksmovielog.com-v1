import { graphql } from "gatsby";
import Bar from "./Bar";
import StatHeading from "./StatHeading";
import {
  Table,
  TableDataCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "./Table";

export default function TopMedia({
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

export const query = graphql`
  fragment TopMedia on TopMediaJson {
    stats {
      name
      viewingCount: viewing_count
    }
  }
`;
