export type WatchlistPerson = {
  name: string;
  slug: string;
};

export type WatchlistCollection = {
  name: string;
  slug: string;
};

type WatchlistMovie = {
  collections: WatchlistCollection[];
  directors: WatchlistPerson[];
  imdbId: string;
  performers: WatchlistPerson[];
  title: string;
  writers: WatchlistPerson[];
  year: string;
};

export default WatchlistMovie;
