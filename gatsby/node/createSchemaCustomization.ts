import type { CreateSchemaCustomizationArgs } from "gatsby";
import buildLinkReviewedMoviesExtension from "./schema/extensions/linkReviewedMovies";
import buildProxyToReviewedMovieExtension from "./schema/extensions/proxyToReviewedMovie";
import buildGradeDistributionsJsonSchema from "./schema/GradeDistributionsJson";
import buildMarkdownRemarkSchema from "./schema/MarkdownRemark";
import buildMostWatchedDirectorsJsonSchema from "./schema/MostWatchedDirectorsJson";
import buildMostWatchedMoviesJsonSchema from "./schema/MostWatchedMoviesJson";
import buildMostWatchedPeopleSchema from "./schema/MostWatchedPeople";
import buildMostWatchedPerformersJsonSchema from "./schema/MostWatchedPerformersJson";
import buildMostWatchedWritersJsonSchema from "./schema/MostWatchedWritersJson";
import buildOverratedDisappointmentsJsonSchema from "./schema/OverratedDisappointmentsJson";
import buildReviewedMoviesJsonSchema from "./schema/ReviewedMoviesJson";
import buildReviewStatsJsonSchema from "./schema/ReviewStatsJson";
import buildTopMediaJsonSchema from "./schema/TopMediaJson";
import buildTopVenuesJsonSchema from "./schema/TopVenuesJson";
import { AllTimeStats } from "./schema/types/AllTimeStats";
import { StatsForYear } from "./schema/types/StatsForYear";
import buildUnderseenGemsJsonSchema from "./schema/UnderseenGemsJson";
import buildViewingCountsForDecadesJsonSchema from "./schema/ViewingCountsForDecadesJson";
import { buildViewingsJsonSchema } from "./schema/ViewingsJson";
import buildViewingStatsJsonSchema from "./schema/ViewingStatsJson";
import { buildWatchlistEntitiesJsonSchema } from "./schema/WatchlistEntitiesJson";
import buildWatchlistMoviesJsonSchema from "./schema/WatchlistMoviesJson";

export function createSchemaCustomization({
  actions,
  schema,
}: CreateSchemaCustomizationArgs) {
  const { createTypes, createFieldExtension } = actions;

  buildProxyToReviewedMovieExtension(createFieldExtension);
  buildLinkReviewedMoviesExtension(createFieldExtension);
  buildViewingsJsonSchema(schema, createTypes);

  const typeDefs = [
    schema.buildObjectType(AllTimeStats),
    schema.buildObjectType(StatsForYear),
    ...buildViewingCountsForDecadesJsonSchema(schema),
    ...buildMostWatchedPeopleSchema(schema),
    ...buildWatchlistMoviesJsonSchema(schema),
    ...buildMarkdownRemarkSchema(schema),
    ...buildReviewedMoviesJsonSchema(schema),
    ...buildWatchlistEntitiesJsonSchema(schema),
    ...buildTopVenuesJsonSchema(schema),
    ...buildTopMediaJsonSchema(schema),
    ...buildMostWatchedMoviesJsonSchema(schema),
    ...buildMostWatchedDirectorsJsonSchema(schema),
    ...buildMostWatchedPerformersJsonSchema(schema),
    ...buildMostWatchedWritersJsonSchema(schema),
    ...buildUnderseenGemsJsonSchema(schema),
    ...buildOverratedDisappointmentsJsonSchema(schema),
    ...buildGradeDistributionsJsonSchema(schema),
    ...buildReviewStatsJsonSchema(schema),
    ...buildViewingStatsJsonSchema(schema),
  ];

  createTypes(typeDefs);
}
