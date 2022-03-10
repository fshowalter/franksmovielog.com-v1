import type { CreateSchemaCustomizationArgs } from "gatsby";
import HighestRatedDirectorsJson from "./schema/HighestRatedDirectorsJson";
import HighestRatedPerformersJson from "./schema/HighestRatedPerformersJson";
import HighestRatedPerson from "./schema/HighestRatedPerson";
import HighestRatedPersonReview from "./schema/HighestRatedPersonReview";
import HighestRatedWritersJson from "./schema/HighestRatedWritersJson";
import MarkdownRemark from "./schema/MarkdownRemark";
import MostWatchedDirectorsJson from "./schema/MostWatchedDirectorsJson";
import MostWatchedMovie from "./schema/MostWatchedMovie";
import MostWatchedMoviesJson from "./schema/MostWatchedMoviesJson";
import MostWatchedMovieViewing from "./schema/MostWatchedMovieViewing";
import MostWatchedPerformersJson from "./schema/MostWatchedPerformersJson";
import MostWatchedPerson from "./schema/MostWatchedPerson";
import MostWatchedPersonViewing from "./schema/MostWatchedPersonViewing";
import MostWatchedWritersJson from "./schema/MostWatchedWritersJson";
import OverratedDisappointmentsJson from "./schema/overratedDisappointmentsJson";
import ReviewedMoviesJson from "./schema/ReviewedMoviesJson";
import ReviewedMovieWatchlistEntities from "./schema/ReviewedMoviesWatchlistEntities";
import TopVenuesJson from "./schema/TopVenuesJson";
import UnderseenGemsJson from "./schema/UnderseenGemsJson";
import VenueStat from "./schema/VenueStat";
import ViewingsJson from "./schema/ViewingsJson";
import WatchlistEntitiesJson from "./schema/WatchlistEntitiesJson";
import WatchlistMoviesJson from "./schema/WatchlistMoviesJson";

export default function createSchemaCustomization({
  actions,
  schema,
}: CreateSchemaCustomizationArgs) {
  const { createTypes } = actions;
  const typeDefs = [
    schema.buildObjectType(ReviewedMovieWatchlistEntities),
    schema.buildObjectType(ViewingsJson),
    schema.buildObjectType(WatchlistMoviesJson),
    schema.buildObjectType(MarkdownRemark),
    schema.buildObjectType(ReviewedMoviesJson),
    schema.buildObjectType(WatchlistEntitiesJson),
    schema.buildObjectType(VenueStat),
    schema.buildObjectType(TopVenuesJson),
    schema.buildObjectType(MostWatchedMovieViewing),
    schema.buildObjectType(MostWatchedMovie),
    schema.buildObjectType(MostWatchedMoviesJson),
    schema.buildObjectType(MostWatchedPersonViewing),
    schema.buildObjectType(MostWatchedPerson),
    schema.buildObjectType(MostWatchedDirectorsJson),
    schema.buildObjectType(MostWatchedPerformersJson),
    schema.buildObjectType(MostWatchedWritersJson),
    schema.buildObjectType(HighestRatedPersonReview),
    schema.buildObjectType(HighestRatedPerson),
    schema.buildObjectType(HighestRatedDirectorsJson),
    schema.buildObjectType(HighestRatedPerformersJson),
    schema.buildObjectType(HighestRatedWritersJson),
    schema.buildObjectType(UnderseenGemsJson),
    schema.buildObjectType(OverratedDisappointmentsJson),
  ];

  createTypes(typeDefs);
}
