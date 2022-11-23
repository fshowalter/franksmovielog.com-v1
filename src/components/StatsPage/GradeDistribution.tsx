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

export default function GradeDistributions({
  distributions,
}: {
  distributions?: readonly Queries.GradeDistributionFragment[] | null;
}): JSX.Element | null {
  if (!distributions) {
    return null;
  }

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

export const query = graphql`
  fragment GradeDistribution on GradeDistributionsJson {
    grade
    reviewCount
  }
`;
