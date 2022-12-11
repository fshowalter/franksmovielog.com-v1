import { graphql } from "gatsby";
import { Bar } from "./Bar";
import { StatHeading } from "./StatHeading";
import {
  Table,
  TableDataCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "./Table";

export function ByDecade({
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
  fragment ByDecade on ViewingCountsForDecadesJson {
    stats {
      decade
      viewingCount: viewing_count
    }
  }
`;
