interface MovieNode {
  id: string;
}

export function sliceMoviesForBrowseMore(
  movies: MovieNode[],
  sourceReviewId: string
) {
  const windowSize = 5;
  const arraySize = movies.length;

  if (windowSize > arraySize) {
    return [];
  }

  const movieIsNotTitle = (movie: MovieNode) => {
    return movie.id !== sourceReviewId;
  };

  if (arraySize === windowSize) {
    return movies.filter(movieIsNotTitle);
  }

  const titleIndex = movies.findIndex((movie) => movie.id === sourceReviewId);

  if (titleIndex + 3 <= arraySize && titleIndex - 2 >= 0) {
    return movies.slice(titleIndex - 2, titleIndex + 3).filter(movieIsNotTitle);
  }

  return [...movies.slice(-2), ...movies, ...movies.slice(0, 3)]
    .slice(titleIndex, titleIndex + 5)
    .filter(movieIsNotTitle);
}
