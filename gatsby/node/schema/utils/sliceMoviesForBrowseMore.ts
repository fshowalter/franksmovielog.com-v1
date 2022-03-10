interface Movie {
  imdb_id: string;
}

export default function sliceMoviesForBrowseMore(
  movies: Movie[],
  titleImdbId: string
) {
  const windowSize = 5;
  const arraySize = movies.length;

  if (windowSize > arraySize) {
    return [];
  }

  const movieIsNotTitle = (movie: Movie) => {
    return movie.imdb_id !== titleImdbId;
  };

  if (arraySize === windowSize) {
    return movies.filter(movieIsNotTitle);
  }

  const titleIndex = movies.findIndex((movie) => movie.imdb_id === titleImdbId);

  if (titleIndex + 3 <= arraySize && titleIndex - 2 >= 0) {
    return movies.slice(titleIndex - 2, titleIndex + 3).filter(movieIsNotTitle);
  }

  return [...movies.slice(-2), ...movies, ...movies.slice(0, 3)]
    .slice(titleIndex, titleIndex + 5)
    .filter(movieIsNotTitle);
}
