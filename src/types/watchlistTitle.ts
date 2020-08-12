import PropTypes from "prop-types";

export const WatchlistTitlePropTypes = PropTypes.shape({
  directors: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
    })
  ).isRequired,
  performers: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
    })
  ).isRequired,
  writers: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
    })
  ).isRequired,
  collections: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
    })
  ).isRequired,
});

export type WatchlistItem = {
  name: string;
  slug: string;
};

export type WatchlistTitle = {
  directors: WatchlistItem[];
  performers: WatchlistItem[];
  writers: WatchlistItem[];
  collections: WatchlistItem[];
};
