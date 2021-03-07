import { Link } from "gatsby";
import Img from "gatsby-image";
import React from "react";
import { Collection, Movie, Person } from "../../types";
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
  entity: Person | Collection;
  children: React.ReactNode;
}): JSX.Element | null {
  if (!entity) {
    return null;
  }

  return (
    <li>
      <Link to={to} className={linkCss}>
        {entity.avatar && (
          <Img
            fixed={entity.avatar.childImageSharp.fixed}
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
  movie,
  className,
}: {
  movie?: Movie;
  className?: string;
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
            >
              {collection.name}
            </WatchlistItem>
          );
        })}
        {watchlist.directors.map((director) => {
          return (
            <WatchlistItem
              entity={director}
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

WatchlistLinks.defaultProps = {
  movie: null,
  className: null,
};

export default WatchlistLinks;
