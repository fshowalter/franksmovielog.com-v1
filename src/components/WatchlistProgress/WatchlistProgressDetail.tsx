import { graphql } from "gatsby";
import { BarGradient } from "../BarGradient";
import { Box } from "../Box";
import { Link } from "../Link";
import { StatHeading } from "../StatHeading";
import {
  Table,
  TableDataCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "../StatsTable";

type EntityType = "director" | "writer" | "performer" | "collection";

export function WatchlistProgressDetail({
  label,
  entityType,
  entities,
}: {
  label: string;
  entityType: EntityType;
  entities: readonly Queries.WatchlistProgressDetailFragment[];
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
                  <EntityName entity={entity} entityType={entityType} />
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
  entityType,
}: {
  entityType: EntityType;
  entity: Queries.WatchlistProgressDetailFragment;
}) {
  let linkTarget;

  if (entityType === "collection") {
    linkTarget = `/collections/${entity.slug}`;
  } else {
    linkTarget = `/cast-and-crew/${entity.slug}`;
  }

  if (entity.slug) return <Link to={linkTarget}>{entity.name}</Link>;

  return (
    <Box as="span" color="subtle">
      {entity.name}
    </Box>
  );
}

export const query = graphql`
  fragment WatchlistProgressDetail on WatchlistProgressDetail {
    name
    reviewCount
    titleCount
    slug
  }
`;
