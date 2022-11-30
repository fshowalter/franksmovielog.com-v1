import { graphql, Link } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import React from "react";
import {
  avatarCss,
  containerCss,
  linkCss,
  listCss,
} from "./WatchlistLinks.module.scss";

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
    <li>
      <Link to={to} className={linkCss}>
        {entity.avatar?.childImageSharp && (
          <GatsbyImage
            image={entity.avatar.childImageSharp.gatsbyImageData}
            alt={`More ${entity.name} reviews`}
            className={avatarCss}
          />
        )}
        {children}
      </Link>
    </li>
  );
}

export default function WatchlistLinks({
  watchlist,
  className = null,
}: {
  watchlist: Queries.WatchlistLinksFragment;
  className?: string | null;
}): JSX.Element | null {
  return (
    <div className={`${containerCss} ${className || ""}`}>
      <ul className={listCss}>
        {watchlist.collections.map((collection) => {
          return (
            <WatchlistItem
              to={`/watchlist/collections/${collection.slug!}/`}
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
      </ul>
    </div>
  );
}

type WatchlistEntity = Queries.WatchlistLinkEntityFragment & {
  slug: string;
};

type WatchlistLinks = Queries.WatchlistLinksFragment & {
  performers: WatchlistEntity[];
  directors: WatchlistEntity[];
  writers: WatchlistEntity[];
  collections: WatchlistEntity[];
};

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
