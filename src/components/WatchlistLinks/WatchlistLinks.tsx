import { Link } from "gatsby";
import Img from "gatsby-image";
import React from "react";
import { Collection, Movie, Person } from "../../types";
import styles from "./WatchlistLinks.module.scss";

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
      <Link to={to} className={styles.link}>
        {entity.avatar && (
          <Img
            fluid={entity.avatar.childImageSharp.fluid}
            alt={`More ${entity.name} reviews`}
            className={styles.avatar}
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
    <div className={`${styles.container} ${className || ""}`}>
      <ul className={styles.list}>
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
