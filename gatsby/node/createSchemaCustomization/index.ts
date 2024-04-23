import type { CreateSchemaCustomizationArgs } from "gatsby";
import { linkReviewedMoviesExtension } from "./extensions/linkReviewedMovies";
import { Title } from "./interfaces/Title";
import {
  AllTimeStatsGradeDistribution,
  AllTimeStatsJson,
} from "./objects/AllTimeStatsJson";
import {
  CastAndCrewJson,
  CastAndCrewMemberTitle,
} from "./objects/CastAndCrewJson";
import { CollectionTitle, CollectionsJson } from "./objects/CollectionsJson";
import { MarkdownRemark } from "./objects/MarkdownRemark";
import {
  MostWatchedPerson,
  MostWatchedPersonViewing,
} from "./objects/MostWatchedPerson";
import { MostWatchedTitle } from "./objects/MostWatchedTitle";
import { OverratedDisappointmentsJson } from "./objects/OverratedDisappointmentsJson";
import {
  ReviewedTitleCastAndCrewMember,
  ReviewedTitleCollection,
  ReviewedTitleMoreCastAndCrewMember,
  ReviewedTitleMoreCollection,
  ReviewedTitleMoreTitle,
  ReviewedTitleViewing,
  ReviewedTitlesJson,
} from "./objects/ReviewedTitlesJson";
import { StatsDistribution } from "./objects/StatsDistribution";
import { UnderseenGemsJson } from "./objects/UnderseenGemsJson";
import { ViewingsJson } from "./objects/ViewingsJson";
import {
  WatchlistProgressDetail,
  WatchlistProgressJson,
} from "./objects/WatchlistProgressJson";
import { WatchlistTitlesJson } from "./objects/WatchlistTitlesJson";
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
    schema.buildObjectType(ReviewedTitleMoreCastAndCrewMember),
    schema.buildObjectType(ReviewedTitleMoreCollection),
    schema.buildObjectType(ReviewedTitleCastAndCrewMember),
    schema.buildObjectType(ReviewedTitleCollection),
    schema.buildObjectType(ReviewedTitlesJson),
    schema.buildObjectType(CollectionTitle),
    schema.buildObjectType(CollectionsJson),
    schema.buildObjectType(UnderseenGemsJson),
    schema.buildObjectType(OverratedDisappointmentsJson),
    schema.buildObjectType(WatchlistTitlesJson),
    schema.buildObjectType(WatchlistProgressDetail),
    schema.buildObjectType(WatchlistProgressJson),
  ];

  createTypes(typeDefs);
}
