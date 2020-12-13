import { Link } from "gatsby";
import React from "react";
import { Movie } from "../../types";
import SvgIcon from "../SvgIcon";
import styles from "./WatchlistLinks.module.scss";

function WatchlistItem({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}): JSX.Element {
  return (
    <li>
      <Link to={to} className={styles.link}>
        <SvgIcon className={styles.icon}>
          <title>Watchlist entries</title>
          <path
            fillRule="evenodd"
            d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.134 13.134 0 0 0 1.66 2.043C4.12 11.332 5.88 12.5 8 12.5c2.12 0 3.879-1.168 5.168-2.457A13.134 13.134 0 0 0 14.828 8a13.133 13.133 0 0 0-1.66-2.043C11.879 4.668 10.119 3.5 8 3.5c-2.12 0-3.879 1.168-5.168 2.457A13.133 13.133 0 0 0 1.172 8z"
          />
          <path
            fillRule="evenodd"
            d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"
          />
        </SvgIcon>
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
            <WatchlistItem to={`/watchlist/collections/${collection.slug}/`}>
              {collection.name}
            </WatchlistItem>
          );
        })}
        {watchlist.directors.map((director) => {
          return (
            <WatchlistItem to={`/watchlist/directors/${director.slug}/`}>
              {director.name}
            </WatchlistItem>
          );
        })}
        {watchlist.performers.map((performer) => {
          return (
            <WatchlistItem to={`/watchlist/performers/${performer.slug}/`}>
              {performer.name}
            </WatchlistItem>
          );
        })}
        {watchlist.writers.map((writer) => {
          return (
            <WatchlistItem to={`/watchlist/writers/${writer.slug}/`}>
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
