import { graphql } from "gatsby";
import { Box, IBoxProps } from "../Box";
import { GraphqlImage } from "../GraphqlImage";
import { Link } from "../Link";
import { avatarStyle, linkStyle } from "./ReviewWatchlistLinks.css";

function ListItemsForEntities({
  entities,
}: {
  entities: readonly Queries.WatchlistLinkEntityFragment[];
}) {
  return (
    <>
      {entities
        .filter((entity) => entity.browseMore.length < 3)
        .map((entity) => {
          return (
            <Box
              as="li"
              display="block"
              key={`${entity.entityType}s/${entity.slug}`}
            >
              <Link
                to={`/watchlist/${entity.entityType}s/${entity.slug}/`}
                backgroundColor="inverse"
                display="flex"
                alignItems="center"
                whiteSpace="nowrap"
                color="accent"
                textDecoration="none"
                className={linkStyle}
              >
                <GraphqlImage
                  image={entity.avatar}
                  alt={`More ${entity.name} reviews`}
                  className={avatarStyle}
                />
                {entity.name}
              </Link>
            </Box>
          );
        })}
    </>
  );
}

interface IWatchlistLinksProps extends IBoxProps {
  watchlist: Queries.WatchlistLinksFragment;
}

export function ReviewWatchlistLinks({
  watchlist,
  ...rest
}: IWatchlistLinksProps): JSX.Element {
  return (
    <Box
      as="ul"
      display="flex"
      flexWrap="wrap"
      columnGap={8}
      rowGap={8}
      {...rest}
    >
      <ListItemsForEntities entities={watchlist.collections} />
      <ListItemsForEntities entities={watchlist.directors} />
      <ListItemsForEntities entities={watchlist.performers} />
      <ListItemsForEntities entities={watchlist.writers} />
    </Box>
  );
}

export const query = graphql`
  fragment WatchlistLinkEntity on ReviewedMovieWatchlistEntity {
    name
    slug
    entityType
    avatar {
      childImageSharp {
        gatsbyImageData(
          layout: FIXED
          formats: [JPG, AVIF]
          quality: 80
          width: 40
          height: 40
          placeholder: BLURRED
        )
      }
    }
    browseMore(sourceReviewId: $id) {
      slug
    }
  }

  fragment WatchlistLinks on ReviewedMovieWatchlistEntities {
    performers {
      ...WatchlistLinkEntity
    }
    directors {
      ...WatchlistLinkEntity
    }
    writers {
      ...WatchlistLinkEntity
    }
    collections {
      ...WatchlistLinkEntity
    }
  }
`;
