import { graphql } from "gatsby";
import { BarGradient } from "../../components/BarGradient";
import { Box } from "../../components/Box";
import { HeadBuilder } from "../../components/HeadBuilder";
import { Layout } from "../../components/Layout";
import { Link } from "../../components/Link";
import { PageTitle } from "../../components/PageTitle";
import { ProgressRing } from "../../components/ProgressRing";
import { Spacer } from "../../components/Spacer";
import { StatHeading } from "../../components/StatHeading";
import {
  Table,
  TableDataCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "../../components/StatsTable";

export function Head(): JSX.Element {
  return (
    <HeadBuilder
      pageTitle="Watchlist Progress"
      description="My progress working through my movie review bucketlist."
      article={false}
      image={null}
    />
  );
}

function ProgressCallout({
  total,
  reviewed,
  label,
  subLabel,
}: {
  total: number | null;
  reviewed: number | null;
  label: string;
  subLabel?: string;
}): JSX.Element {
  return (
    <>
      <ProgressRing
        width={144}
        height={144}
        total={total ?? 0}
        complete={reviewed ?? 0}
        label={label}
        subLabel={subLabel}
      />
      <Spacer axis="vertical" size={8} />
      <Box color="subtle" textAlign="center">
        <Box>
          {reviewed?.toLocaleString()}/{total?.toLocaleString()}
        </Box>
        <Box fontSize="small" lineHeight={16}>
          Reviewed
        </Box>
      </Box>
    </>
  );
}

function EntityName({
  entity,
}: {
  entity: Queries.WatchlistEntityProgressFragment;
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

function valueColor(reviewCount: number, totalCount: number) {
  if (reviewCount === 0) {
    return "subtle";
  }

  if (reviewCount === totalCount) {
    return "progress";
  }

  return undefined;
}

function WatchlistEntityProgressTable({
  label,
  entities,
}: {
  label: string;
  entities: readonly Queries.WatchlistEntityProgressFragment[];
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
                  color={valueColor(entity.reviewCount, entity.titleCount)}
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

export default function WatchlistProgressPage({
  data,
}: {
  data: Queries.WatchlistProgressPageQuery;
}): JSX.Element {
  return (
    <Layout>
      <Box as="main">
        <Box
          as="header"
          display="flex"
          flexDirection={{ default: "column", desktop: "row" }}
          flexWrap="wrap"
          paddingX="pageMargin"
          columnGap={32}
          justifyContent="space-between"
        >
          <Box
            display="flex"
            flexDirection="column"
            alignItems={{ default: "center", desktop: "flex-start" }}
          >
            <PageTitle
              paddingTop={{ default: 24, desktop: 32 }}
              lineHeight={40}
            >
              Watchlist Progress
            </PageTitle>
            <Box as="q" color="subtle">
              I find your lack of faith disturbing.
            </Box>
            <Spacer axis="vertical" size={16} />
            <Box color="subtle">
              <Spacer axis="vertical" size={16} />
              <p>
                My progress working through{" "}
                <Link to="/watchlist/">my movie-review bucketlist</Link>.
              </p>
            </Box>
          </Box>
          <Box
            display="flex"
            flexWrap="wrap"
            columnGap={32}
            justifyContent="center"
          >
            <Box
              minWidth={{ default: "full", tablet: 0 }}
              display="flex"
              flexDirection="column"
              alignItems="center"
            >
              <Spacer axis="vertical" size={32} />
              <ProgressCallout
                total={data.watchlistMovies.totalCount}
                reviewed={data.reviewedMovies.totalCount}
                label="Total Progress"
              />
            </Box>
            <Box>
              <Spacer axis="vertical" size={32} />
              <ProgressCallout
                total={data.directorTotal.sum}
                reviewed={data.directorReviewed.sum}
                label="Director"
                subLabel="Titles"
              />
            </Box>
            <Box>
              <Spacer axis="vertical" size={32} />
              <ProgressCallout
                total={data.performerTotal.sum}
                reviewed={data.performerReviewed.sum}
                label="Performer"
                subLabel="Titles"
              />
            </Box>
            <Box>
              <Spacer axis="vertical" size={32} />
              <ProgressCallout
                total={data.writerTotal.sum}
                reviewed={data.writerReviewed.sum}
                label="Writer"
                subLabel="Titles"
              />
            </Box>
            <Box>
              <Spacer axis="vertical" size={32} />
              <ProgressCallout
                total={data.collectionTotal.sum}
                reviewed={data.collectionReviewed.sum}
                label="Collection"
                subLabel="Titles"
              />
            </Box>
          </Box>
        </Box>
        <Box paddingX={{ default: 0, tablet: "gutter", desktop: "pageMargin" }}>
          <Spacer axis="vertical" size={32} />
          <WatchlistEntityProgressTable
            label="Director Progress"
            entities={data.director.nodes}
          />
          <Spacer axis="vertical" size={64} />
          <WatchlistEntityProgressTable
            label="Performer Progress"
            entities={data.performer.nodes}
          />
          <Spacer axis="vertical" size={64} />
          <WatchlistEntityProgressTable
            label="Writer Progress"
            entities={data.writer.nodes}
          />
          <Spacer axis="vertical" size={64} />
          <WatchlistEntityProgressTable
            label="Collection Progress"
            entities={data.collection.nodes}
          />
          <Spacer axis="vertical" size={64} />
        </Box>
      </Box>
    </Layout>
  );
}

export const pageQuery = graphql`
  fragment WatchlistEntityProgress on WatchlistEntitiesJson {
    name
    reviewCount
    titleCount
    slug
    entityType
  }

  query WatchlistProgressPage {
    reviewedMovies: allWatchlistMoviesJson(filter: { slug: { ne: null } }) {
      totalCount
    }
    watchlistMovies: allWatchlistMoviesJson {
      totalCount
    }
    director: allWatchlistEntitiesJson(
      filter: { entityType: { eq: director } }
    ) {
      nodes {
        ...WatchlistEntityProgress
      }
    }
    directorTotal: allWatchlistEntitiesJson(
      filter: { entityType: { eq: director } }
    ) {
      sum(field: { titleCount: SELECT })
    }
    directorReviewed: allWatchlistEntitiesJson(
      filter: { entityType: { eq: director } }
    ) {
      sum(field: { reviewCount: SELECT })
    }
    performer: allWatchlistEntitiesJson(
      filter: { entityType: { eq: performer } }
    ) {
      nodes {
        ...WatchlistEntityProgress
      }
    }
    performerTotal: allWatchlistEntitiesJson(
      filter: { entityType: { eq: performer } }
    ) {
      sum(field: { titleCount: SELECT })
    }
    performerReviewed: allWatchlistEntitiesJson(
      filter: { entityType: { eq: performer } }
    ) {
      sum(field: { reviewCount: SELECT })
    }
    writer: allWatchlistEntitiesJson(filter: { entityType: { eq: writer } }) {
      nodes {
        ...WatchlistEntityProgress
      }
    }
    writerTotal: allWatchlistEntitiesJson(
      filter: { entityType: { eq: writer } }
    ) {
      sum(field: { titleCount: SELECT })
    }
    writerReviewed: allWatchlistEntitiesJson(
      filter: { entityType: { eq: writer } }
    ) {
      sum(field: { reviewCount: SELECT })
    }
    collection: allWatchlistEntitiesJson(
      filter: { entityType: { eq: collection } }
    ) {
      nodes {
        ...WatchlistEntityProgress
      }
    }
    collectionTotal: allWatchlistEntitiesJson(
      filter: { entityType: { eq: collection } }
    ) {
      sum(field: { titleCount: SELECT })
    }
    collectionReviewed: allWatchlistEntitiesJson(
      filter: { entityType: { eq: collection } }
    ) {
      sum(field: { reviewCount: SELECT })
    }
  }
`;
