import { graphql } from "gatsby";
import { Box, IBoxProps } from "../Box";
import { GraphqlImage } from "../GraphqlImage";
import { Link } from "../Link";
import { avatarStyle, linkStyle } from "./WatchlistLinks.css";

interface IWatchlistLinksProps extends IBoxProps {
  watchlist: Queries.WatchlistLinksFragment;
}

export function WatchlistLinks({
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
                className={linkStyle}
                boxShadow="borderAll"
                borderRadius={8}
                paddingY={8}
                paddingX={16}
              >
                <GraphqlImage
                  image={entity.avatar}
                  alt={`More ${entity.name} reviews`}
                  borderRadius="half"
                  className={avatarStyle}
                  transform="safariBorderRadiusFix"
                />
                {entity.name}
              </Link>
            </Box>
          );
        })}
    </>
  );
}

export const query = graphql`
  fragment WatchlistLinkEntity on ReviewedTitleMoreEntity {
    name
    slug
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
  }

  fragment WatchlistLinks on ReviewedTitleMore {
    withPerformer {
      ...WatchlistLinkEntity
    }
    directedBy {
      ...WatchlistLinkEntity
    }
    writtenBy {
      ...WatchlistLinkEntity
    }
    inCollection {
      ...WatchlistLinkEntity
    }
  }
`;
