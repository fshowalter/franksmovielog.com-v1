import { Box } from "../Box";

export function ListItemGenres({
  genres,
}: {
  genres: readonly string[];
}): JSX.Element | null {
  return (
    <Box color="subtle" fontSize="small" letterSpacing={0.5} lineHeight={16}>
      {genres.map((genre, index) => {
        if (index === 0) {
          return (
            <Box key={genre} as="span">
              {genre}
            </Box>
          );
        }

        return (
          <Box as="span" key={genre}>
            {" "}
            | {genre}
          </Box>
        );
      })}
    </Box>
  );
}
