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
  movie,
  className = null,
}: {
  movie: Queries.WatchlistLinksFragment;
  className?: string | null;
}): JSX.Element | null {
  return (
    <div className={`${containerCss} ${className || ""}`}>
      <ul className={listCss}>
        {movie.watchlist.collections.map((collection) => {
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
        {movie.watchlist.directors.map((director) => {
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
        {movie.watchlist.performers.map((performer) => {
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
        {movie.watchlist.writers.map((writer) => {
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

export const query = graphql`
  fragment WatchlistLinkEntity on WatchlistEntitiesJson {
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

  fragment WatchlistLinks on ReviewedMoviesJson {
    watchlist {
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
  }
`;
