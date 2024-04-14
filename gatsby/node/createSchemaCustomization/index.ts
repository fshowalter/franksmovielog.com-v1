import type { CreateSchemaCustomizationArgs } from "gatsby";
import { linkReviewedMoviesExtension } from "./extensions/linkReviewedMovies";
import { Title } from "./interfaces/Title";
import { WatchlistEntity } from "./interfaces/WatchlistEntity";
import {
  AllTimeStatsGradeDistribution,
  AllTimeStatsJson,
} from "./objects/AllTimeStatsJson";
import {
  CastAndCrewJson,
  CastAndCrewMemberTitle,
} from "./objects/CastAndCrewJson";
import { MarkdownRemark } from "./objects/MarkdownRemark";
import {
  MostWatchedPerson,
  MostWatchedPersonViewing,
} from "./objects/MostWatchedPerson";
import { MostWatchedTitle } from "./objects/MostWatchedTitle";
import { OverratedDisappointmentsJson } from "./objects/OverratedDisappointmentsJson";
import {
  ReviewedTitleMore,
  ReviewedTitleMoreEntity,
  ReviewedTitleMoreTitle,
  ReviewedTitleViewing,
  ReviewedTitlesJson,
} from "./objects/ReviewedTitlesJson";
import { StatsDistribution } from "./objects/StatsDistribution";
import { UnderseenGemsJson } from "./objects/UnderseenGemsJson";
import { ViewingsJson } from "./objects/ViewingsJson";
import { WatchlistCollectionsJson } from "./objects/WatchlistCollectionsJson";
import { WatchlistDirectorsJson } from "./objects/WatchlistDirectorsJson";
import { WatchlistEntityTitle } from "./objects/WatchlistEntityTitle";
import { WatchlistPerformersJson } from "./objects/WatchlistPerformersJson";
import {
  WatchlistProgressDetail,
  WatchlistProgressJson,
} from "./objects/WatchlistProgressJson";
import { WatchlistTitlesJson } from "./objects/WatchlistTitlesJson";
import { WatchlistWritersJson } from "./objects/WatchlistWritersJson";
import { YearStatsJson } from "./objects/YearStatsJson";

export function createSchemaCustomization({
  actions,
  schema,
}: CreateSchemaCustomizationArgs) {
  const { createTypes, createFieldExtension } = actions;

  createFieldExtension(linkReviewedMoviesExtension);

  const typeDefs = [
    schema.buildInterfaceType(Title),
    schema.buildObjectType(CastAndCrewMemberTitle),
    schema.buildObjectType(CastAndCrewJson),
    schema.buildObjectType(StatsDistribution),
    schema.buildObjectType(MostWatchedPersonViewing),
    schema.buildObjectType(MostWatchedPerson),
    schema.buildObjectType(MostWatchedTitle),
    schema.buildObjectType(AllTimeStatsGradeDistribution),
    schema.buildObjectType(AllTimeStatsJson),
    schema.buildObjectType(YearStatsJson),
    schema.buildObjectType(MarkdownRemark),
    schema.buildObjectType(ViewingsJson),
    schema.buildObjectType(ReviewedTitleViewing),
    schema.buildObjectType(ReviewedTitleMoreTitle),
    schema.buildObjectType(ReviewedTitleMoreEntity),
    schema.buildObjectType(ReviewedTitleMore),
    schema.buildObjectType(ReviewedTitlesJson),
    schema.buildObjectType(WatchlistEntityTitle),
    schema.buildInterfaceType(WatchlistEntity),
    schema.buildObjectType(WatchlistCollectionsJson),
    schema.buildObjectType(WatchlistDirectorsJson),
    schema.buildObjectType(WatchlistPerformersJson),
    schema.buildObjectType(WatchlistWritersJson),
    schema.buildObjectType(UnderseenGemsJson),
    schema.buildObjectType(OverratedDisappointmentsJson),
    schema.buildObjectType(WatchlistTitlesJson),
    schema.buildObjectType(WatchlistProgressDetail),
    schema.buildObjectType(WatchlistProgressJson),
  ];

  createTypes(typeDefs);
}
