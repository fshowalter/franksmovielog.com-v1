import { Link } from "gatsby";
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";
import React from "react";
import {
  avatarCss,
  containerCss,
  linkCss,
  listCss,
} from "./WatchlistLinks.module.scss";

interface WatchlistEntity {
  name: string;
  slug: string;
  avatar: null | {
    childImageSharp: {
      gatsbyImageData: IGatsbyImageData;
    };
  };
}

interface Movie {
  watchlist: {
    collections: WatchlistEntity[];
    directors: WatchlistEntity[];
    performers: WatchlistEntity[];
    writers: WatchlistEntity[];
  };
}

function WatchlistItem({
  to,
  entity,
  children,
}: {
  to: string;
  entity: WatchlistEntity;
  children: React.ReactNode;
}): JSX.Element | null {
  if (!entity) {
    return null;
  }

  return (
    <li>
      <Link to={to} className={linkCss}>
        {entity.avatar && (
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

function WatchlistLinks({
  movie = null,
  className = null,
}: {
  movie?: Movie | null;
  className?: string | null;
}): JSX.Element | null {
  if (!movie) {
    return null;
  }

  const { watchlist } = movie;

  return (
    <div className={`${containerCss} ${className || ""}`}>
      <ul className={listCss}>
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
      </ul>
    </div>
  );
}

export default WatchlistLinks;
