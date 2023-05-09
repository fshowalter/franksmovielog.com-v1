import type { CreateSchemaCustomizationArgs } from "gatsby";
import { WatchlistEntityTypeEnum } from "./enums/WatchlistEntityTypeEnum";
import { linkReviewedMoviesExtension } from "./extensions/linkReviewedMovies";
import { proxyToReviewedMovieExtension } from "./extensions/proxyToReviewedMovie";
import { MostWatchedPeople } from "./interfaces/MostWatchedPeople";
import { MostWatchedPerson } from "./interfaces/MostWatchedPerson";
import { AllTimeStats } from "./objects/AllTimeStats";
import { GradeDistributionsJson } from "./objects/GradeDistributionsJson";
import { MarkdownRemark } from "./objects/MarkdownRemark";
import { MostWatchedDirector } from "./objects/MostWatchedDirector";
import { MostWatchedDirectorsJson } from "./objects/MostWatchedDirectorsJson";
import { MostWatchedMovie } from "./objects/MostWatchedMovie";
import { MostWatchedMoviesJson } from "./objects/MostWatchedMoviesJson";
import { MostWatchedPerformer } from "./objects/MostWatchedPerformer";
import { MostWatchedPerformersJson } from "./objects/MostWatchedPerformersJson";
import { MostWatchedWriter } from "./objects/MostWatchedWriter";
import { MostWatchedWritersJson } from "./objects/MostWatchedWritersJson";
import { OverratedDisappointmentsJson } from "./objects/OverratedDisappointmentsJson";
import { ReviewStatsJson } from "./objects/ReviewStatsJson";
import { ReviewedMovieWatchlistEntities } from "./objects/ReviewedMovieWatchlistEntities";
import { ReviewedMovieWatchlistEntity } from "./objects/ReviewedMovieWatchlistEntity";
import { ReviewedMoviesJson } from "./objects/ReviewedMoviesJson";
import { StatsForYear } from "./objects/StatsForYear";
import { TopMediaJson } from "./objects/TopMediaJson";
import { TopMedium } from "./objects/TopMedium";
import { TopVenue } from "./objects/TopVenue";
import { TopVenuesJson } from "./objects/TopVenuesJson";
import { UnderseenGemsJson } from "./objects/UnderseenGemsJson";
import { ViewingCountForDecade } from "./objects/ViewingCountForDecade";
import { ViewingCountsForDecadesJson } from "./objects/ViewingCountsForDecadesJson";
import { ViewingStatsJson } from "./objects/ViewingStatsJson";
import { ViewingWithReview } from "./objects/ViewingWithReview";
import { ViewingsJson } from "./objects/ViewingsJson";
import { WatchlistEntitiesJson } from "./objects/WatchlistEntitiesJson";
import { WatchlistMoviesJson } from "./objects/WatchlistMoviesJson";

export function createSchemaCustomization({
  actions,
  schema,
}: CreateSchemaCustomizationArgs) {
  const { createTypes, createFieldExtension } = actions;

  createFieldExtension(linkReviewedMoviesExtension);
  createFieldExtension(proxyToReviewedMovieExtension);

  const typeDefs = [
    schema.buildEnumType(WatchlistEntityTypeEnum),
    schema.buildInterfaceType(MostWatchedPerson),
    schema.buildInterfaceType(MostWatchedPeople),
    schema.buildObjectType(AllTimeStats),
    schema.buildObjectType(StatsForYear),
    schema.buildObjectType(ViewingsJson),
    schema.buildObjectType(ViewingWithReview),
    schema.buildObjectType(ViewingCountForDecade),
    schema.buildObjectType(ViewingCountsForDecadesJson),
    schema.buildObjectType(WatchlistMoviesJson),
    schema.buildObjectType(MarkdownRemark),
    schema.buildObjectType(ReviewedMovieWatchlistEntity),
    schema.buildObjectType(ReviewedMovieWatchlistEntities),
    schema.buildObjectType(ReviewedMoviesJson),
    schema.buildObjectType(WatchlistEntitiesJson),
    schema.buildObjectType(TopVenue),
    schema.buildObjectType(TopVenuesJson),
    schema.buildObjectType(TopMedium),
    schema.buildObjectType(TopMediaJson),
    schema.buildObjectType(MostWatchedMovie),
    schema.buildObjectType(MostWatchedMoviesJson),
    schema.buildObjectType(MostWatchedDirector),
    schema.buildObjectType(MostWatchedDirectorsJson),
    schema.buildObjectType(MostWatchedPerformer),
    schema.buildObjectType(MostWatchedPerformersJson),
    schema.buildObjectType(MostWatchedWriter),
    schema.buildObjectType(MostWatchedWritersJson),
    schema.buildObjectType(UnderseenGemsJson),
    schema.buildObjectType(OverratedDisappointmentsJson),
    schema.buildObjectType(GradeDistributionsJson),
    schema.buildObjectType(ReviewStatsJson),
    schema.buildObjectType(ViewingStatsJson),
  ];

  createTypes(typeDefs);
}
