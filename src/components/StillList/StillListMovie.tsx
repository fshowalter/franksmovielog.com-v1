import { graphql } from "gatsby";
import { Box, IBoxProps } from "../Box";
import { Grade } from "../Grade";
import { gridAreaComponent, gridComponent } from "../Grid";
import { Link } from "../Link";
import { Still } from "../Still";
import { gridAreas, gridStyle, stillStyle } from "./StillListMovie.css";

const GridArea = gridAreaComponent(gridAreas);

const Grid = gridComponent(gridStyle);

interface IStillListMovieProps extends IBoxProps {
  movie: Queries.StillListMovieFragment;
}

export function StillListMovie({ movie, ...rest }: IStillListMovieProps) {
  return (
    <Grid key={movie.imdbId} paddingX={{ default: "gutter" }} {...rest}>
      <GridArea name="still">
        <Link to={`/reviews/${movie.slug}/`} className={stillStyle}>
          <Still image={movie.still} title={movie.title} year={movie.year} />
        </Link>
      </GridArea>
      <GridArea name="title">
        <Link
          to={`/reviews/${movie.slug}/`}
          fontSize="medium"
          color="default"
          display="block"
        >
          {movie.title}{" "}
          <Box
            as="span"
            fontSize="small"
            fontWeight="light"
            color="muted"
            lineHeight={1}
          >
            {movie.year}
          </Box>
        </Link>
      </GridArea>
      <GridArea name="grade">
        <Grade grade={movie.grade} height={16} />
      </GridArea>
      <GridArea name="genres">
        <Genres genres={movie.genres} />
      </GridArea>
    </Grid>
  );
}

function Genres({ genres }: { genres: readonly string[] }): JSX.Element | null {
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

export const query = graphql`
  fragment StillListMovie on Title {
    imdbId
    title
    grade
    slug
    year
    genres
    still {
      childImageSharp {
        gatsbyImageData(
          layout: CONSTRAINED
          formats: [JPG, AVIF]
          quality: 80
          placeholder: BLURRED
          width: 312
        )
      }
    }
  }
`;
