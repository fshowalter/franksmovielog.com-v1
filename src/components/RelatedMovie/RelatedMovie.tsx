import { graphql } from "gatsby";
import { Box, IBoxProps } from "../Box";
import { Grade } from "../Grade";
import { gridAreaComponent, gridComponent } from "../Grid";
import { Link } from "../Link";
import { Still } from "../Still";
import {
  gradeStyle,
  gridAreas,
  gridStyle,
  stillStyle,
} from "./RelatedMovie.css";

const GridArea = gridAreaComponent(gridAreas);

const Grid = gridComponent(gridStyle);

interface IRelatedMovieProps extends IBoxProps {
  movie: Queries.RelatedMovieFragment;
}

export function RelatedMovie({ movie, ...rest }: IRelatedMovieProps) {
  return (
    <Grid key={movie.imdbId} paddingX={{ default: "popoutGutter" }} {...rest}>
      <GridArea name="still">
        <Link to={`/reviews/${movie.slug}/`} className={stillStyle}>
          <Still image={movie.still} title={movie.title} year={movie.year} />
        </Link>
      </GridArea>
      <GridArea name="title">
        <Link
          to={`/reviews/${movie.slug}/`}
          fontSize="relatedMovieTitle"
          textDecoration="none"
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
        <Grade
          grade={movie.grade}
          width={80}
          height={16}
          className={gradeStyle}
        />
      </GridArea>
    </Grid>
  );
}

export const query = graphql`
  fragment RelatedMovie on ReviewedMoviesJson {
    imdbId
    title
    grade
    slug
    year
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
