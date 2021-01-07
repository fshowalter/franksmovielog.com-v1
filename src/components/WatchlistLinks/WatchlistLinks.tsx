import { Link } from "gatsby";
import Img, { FluidObject } from "gatsby-image";
import React from "react";
import { Movie } from "../../types";
import styles from "./WatchlistLinks.module.scss";

function WatchlistItem({
  to,
  avatar,
  alt,
  children,
}: {
  to: string;
  avatar: FluidObject;
  alt: string;
  children: React.ReactNode;
}): JSX.Element {
  return (
    <li>
      <Link to={to} className={styles.link}>
        <Img
          fluid={avatar}
          alt={`More ${alt} reviews`}
          className={styles.avatar}
        />
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
              avatar={collection.avatar.childImageSharp.fluid}
              alt={collection.name}
              to={`/watchlist/collections/${collection.slug}/`}
            >
              {collection.name}
            </WatchlistItem>
          );
        })}
        {watchlist.directors.map((director) => {
          return (
            <WatchlistItem
              avatar={director.avatar.childImageSharp.fluid}
              alt={director.name}
              to={`/watchlist/directors/${director.slug}/`}
            >
              {director.name}
            </WatchlistItem>
          );
        })}
        {watchlist.performers.map((performer) => {
          return (
            <WatchlistItem
              avatar={performer.avatar.childImageSharp.fluid}
              alt={performer.name}
              to={`/watchlist/performers/${performer.slug}/`}
            >
              {performer.name}
            </WatchlistItem>
          );
        })}
        {watchlist.writers.map((writer) => {
          return (
            <WatchlistItem
              avatar={writer.avatar.childImageSharp.fluid}
              alt={writer.name}
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
