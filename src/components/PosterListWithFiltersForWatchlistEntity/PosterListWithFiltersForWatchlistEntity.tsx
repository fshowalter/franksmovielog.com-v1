import { graphql } from "gatsby";
import type { IBoxProps } from "../Box";
import { Box } from "../Box";
import { GraphqlImage } from "../GraphqlImage";
import { Link } from "../Link";
import { PosterListWithFilters } from "../PosterListWithFilters";
import { Spacer } from "../Spacer";

interface IPosterListWithFiltersForWatchlistEntityProps extends IBoxProps {
  entity: Queries.PosterListWithFiltersForWatchlistEntityFragment;
  distinctReleaseYears: readonly string[];
  tagline: string;
  breadcrumb: string;
}

export function PosterListWithFiltersForWatchlistEntity({
  entity,
  distinctReleaseYears,
  tagline,
  breadcrumb,
}: IPosterListWithFiltersForWatchlistEntityProps): JSX.Element {
  return (
    <PosterListWithFilters
      items={entity.watchlistMovies}
      distinctReleaseYears={distinctReleaseYears}
      initialSort="release-date-asc"
    >
      <Box textAlign="center" lineHeight={36}>
        <Link color="accent" textDecoration="none" to="/watchlist/">
          Watchlist
        </Link>{" "}
        /{" "}
        <Link
          color="accent"
          textDecoration="none"
          to={`/watchlist/${entity.entityType}s/`}
        >
          {breadcrumb}
        </Link>
      </Box>
      <Spacer axis="vertical" size={16} />
      <Box display="flex" flexDirection="column" alignItems="center">
        <GraphqlImage
          image={entity.avatar}
          alt={entity.name}
          maxWidth={200}
          borderRadius="half"
          transform="safariBorderRadiusFix"
        />
      </Box>
      <Spacer axis="vertical" size={16} />
      <Box as="h1" fontSize="pageTitle" textAlign="center">
        {entity.name}
      </Box>
      <Spacer axis="vertical" size={24} />
      <Box
        color="subtle"
        textAlign="center"
      >{`${tagline} ${entity.watchlistMovies.length} watchlist movies.`}</Box>
    </PosterListWithFilters>
  );
}

export const query = graphql`
  fragment PosterListWithFiltersForWatchlistEntity on WatchlistEntitiesJson {
    name
    entityType
    avatar {
      childImageSharp {
        gatsbyImageData(
          layout: FIXED
          formats: [JPG, AVIF]
          quality: 80
          width: 200
          height: 200
          placeholder: BLURRED
        )
      }
    }
    watchlistMovies {
      imdbId
      title
      year
      grade
      gradeValue
      slug
      sortTitle
      releaseDate
      poster {
        childImageSharp {
          gatsbyImageData(
            layout: CONSTRAINED
            formats: [JPG, AVIF]
            quality: 80
            width: 200
            placeholder: BLURRED
          )
        }
      }
    }
  }
`;
