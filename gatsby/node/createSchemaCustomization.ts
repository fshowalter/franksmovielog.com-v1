import type { CreateSchemaCustomizationArgs } from "gatsby";
import DecadeStat from "./schema/DecadeStat";
import GradeDistributionsJson from "./schema/GradeDistributionsJson";
import MarkdownRemark from "./schema/MarkdownRemark";
import MediumStat from "./schema/MediumStat";
import MostWatchedDirector from "./schema/MostWatchedDirector";
import MostWatchedDirectorsJson from "./schema/MostWatchedDirectorsJson";
import MostWatchedMovie from "./schema/MostWatchedMovie";
import MostWatchedMoviesJson from "./schema/MostWatchedMoviesJson";
import MostWatchedPeopleInterface from "./schema/MostWatchedPeopleInterface";
import MostWatchedPerformer from "./schema/MostWatchedPerformer";
import MostWatchedPerformersJson from "./schema/MostWatchedPerformersJson";
import MostWatchedPersonInterface from "./schema/MostWatchedPersonInterface";
import MostWatchedWriter from "./schema/MostWatchedWriter";
import MostWatchedWritersJson from "./schema/MostWatchedWritersJson";
import OverratedDisappointmentsJson from "./schema/OverratedDisappointmentsJson";
import ReviewedMoviesJson from "./schema/ReviewedMoviesJson";
import ReviewedMovieWatchlistEntities from "./schema/ReviewedMoviesWatchlistEntities";
import ReviewStatsJson from "./schema/ReviewStatsJson";
import TopMediaJson from "./schema/TopMediaJson";
import TopVenuesJson from "./schema/TopVenuesJson";
import UnderseenGemsJson from "./schema/UnderseenGemsJson";
import VenueStat from "./schema/VenueStat";
import ViewingCountsForDecadesJson from "./schema/ViewingCountsForDecadesJson";
import ViewingsJson from "./schema/ViewingsJson";
import ViewingStatsJson from "./schema/ViewingStatsJson";
import WatchlistEntitiesJson from "./schema/WatchlistEntitiesJson";
import WatchlistMoviesJson from "./schema/WatchlistMoviesJson";

export default function createSchemaCustomization({
  actions,
  schema,
}: CreateSchemaCustomizationArgs) {
  const { createTypes } = actions;

  const typeDefs = [
    schema.buildInterfaceType(MostWatchedPersonInterface),
    schema.buildInterfaceType(MostWatchedPeopleInterface),
    schema.buildObjectType(ReviewedMovieWatchlistEntities),
    schema.buildObjectType(ViewingsJson),
    schema.buildObjectType(WatchlistMoviesJson),
    schema.buildObjectType(MarkdownRemark),
    schema.buildObjectType(ReviewedMoviesJson),
    schema.buildObjectType(WatchlistEntitiesJson),
    schema.buildObjectType(VenueStat),
    schema.buildObjectType(MediumStat),
    schema.buildObjectType(TopVenuesJson),
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
    schema.buildObjectType(DecadeStat),
    schema.buildObjectType(ViewingCountsForDecadesJson),
    schema.buildObjectType(ReviewStatsJson),
    schema.buildObjectType(ViewingStatsJson),
  ];

  createTypes(typeDefs);
}
