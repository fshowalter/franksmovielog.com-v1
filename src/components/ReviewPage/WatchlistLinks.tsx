import { graphql } from "gatsby";
import { Box, IBoxProps } from "../Box";
import { GraphqlImage } from "../GraphqlImage";
import { Link } from "../Link";
import { avatarStyle, linkStyle } from "./WatchlistLinks.css";

function WatchlistItem({
  to,
  entity,
  children,
}: {
  to: string;
  entity: Queries.WatchlistLinkEntityFragment;
  children: React.ReactNode;
}): JSX.Element | null {
  return (
    <Box as="li" display="block">
      <Link
        to={to}
        backgroundColor="subtle"
        display="flex"
        alignItems="center"
        whiteSpace="nowrap"
        border="all"
        paddingX={16}
        paddingY={8}
        color="accent"
        textDecoration="none"
        className={linkStyle}
      >
        <GraphqlImage
          image={entity.avatar}
          alt={`More ${entity.name} reviews`}
          className={avatarStyle}
        />
        {children}
      </Link>
    </Box>
  );
}

interface IWatchlistLinksProps extends IBoxProps {
  watchlist: Queries.WatchlistLinksFragment;
}

export default function WatchlistLinks({
  watchlist,
  ...rest
}: IWatchlistLinksProps): JSX.Element {
  console.log(watchlist);
  if (!watchlist) {
    return <Box {...rest} />;
  }
  return (
    <Box as="ul" display="flex" padding={0} {...rest}>
      {watchlist.collections.map((collection) => {
        return (
          <WatchlistItem
            to={`/watchlist/collections/${collection.slug}/`}
            entity={collection}
            key={collection.slug}
          >
            {collection.name}
          </WatchlistItem>
        );
      })}
      {watchlist.directors.map((director) => {
        return (
          <WatchlistItem
            entity={director}
            key={director.slug}
            to={`/watchlist/directors/${director.slug}/`}
          >
            {director.name}
          </WatchlistItem>
        );
      })}
      {watchlist.performers.map((performer) => {
        return (
          <WatchlistItem
            entity={performer}
            key={performer.slug}
            to={`/watchlist/performers/${performer.slug}/`}
          >
            {performer.name}
          </WatchlistItem>
        );
      })}
      {watchlist.writers.map((writer) => {
        return (
          <WatchlistItem
            entity={writer}
            key={writer.slug}
            to={`/watchlist/writers/${writer.slug}/`}
          >
            {writer.name}
          </WatchlistItem>
        );
      })}
    </Box>
  );
}

export const query = graphql`
  fragment WatchlistLinkEntity on ReviewedMovieWatchlistEntity {
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
          placeholder: TRACED_SVG
        )
      }
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
