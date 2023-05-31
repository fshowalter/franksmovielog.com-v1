import { graphql } from "gatsby";
import { BarGradient } from "../../components/BarGradient";
import { Box } from "../../components/Box";
import { Link } from "../../components/Link";
import { StatHeading } from "../../components/StatHeading";
import {
  Table,
  TableDataCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "../../components/StatsTable";

export function WatchlistProgressForEntities({
  label,
  entities,
}: {
  label: string;
  entities: readonly Queries.WatchlistProgressForEntitiesItemFragment[];
}) {
  return (
    <section>
      <StatHeading>{label}</StatHeading>
      <Table>
        <TableHead>
          <tr>
            <TableHeaderCell align="left">Name</TableHeaderCell>
            <th>&nbsp;</th>
            <TableHeaderCell align="right">Progress</TableHeaderCell>
          </tr>
        </TableHead>
        <tbody>
          {entities.map((entity) => {
            return (
              <TableRow key={entity.name}>
                <TableDataCell align="left">
                  <EntityName entity={entity} />
                </TableDataCell>
                <TableDataCell hideOnSmallScreens align="fill">
                  <BarGradient
                    value={entity.reviewCount}
                    maxValue={entity.titleCount}
                  />
                </TableDataCell>
                <TableDataCell
                  align="right"
                  color={
                    entity.reviewCount === entity.titleCount
                      ? "progress"
                      : "subtle"
                  }
                >
                  {entity.reviewCount}/{entity.titleCount}
                </TableDataCell>
              </TableRow>
            );
          })}
        </tbody>
      </Table>
    </section>
  );
}

function EntityName({
  entity,
}: {
  entity: Queries.WatchlistProgressForEntitiesItemFragment;
}) {
  if (entity.slug)
    return (
      <Link to={`/watchlist/${entity.entityType}s/${entity.slug}/`}>
        {entity.name}
      </Link>
    );

  return (
    <Box as="span" color="subtle">
      {entity.name}
    </Box>
  );
}

export const query = graphql`
  fragment WatchlistProgressForEntitiesItem on WatchlistEntitiesJson {
    name
    reviewCount
    titleCount
    slug
    entityType
  }
`;
