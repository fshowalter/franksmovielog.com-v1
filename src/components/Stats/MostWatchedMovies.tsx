import { graphql } from "gatsby";
import { Box, IBoxProps } from "../Box";
import { GraphqlImage } from "../GraphqlImage";
import { Link } from "../Link";
import { ListItemTitle } from "../ListItemTitle";
import { Spacer } from "../Spacer";
import { StatHeading } from "../StatHeading/StatHeading";
import {
  gridStyle,
  posterStyle,
  showTitleOnMobileOnlyStyle,
} from "./MostWatchedMovies.css";

export function MostWatchedMovies({
  titles,
}: {
  titles: readonly Queries.MostWatchedTitleFragment[];
}): JSX.Element | null {
  if (titles.length === 0) {
    return null;
  }

  return (
    <Box as="section">
      <StatHeading>Most Watched Movies</StatHeading>
      <Box>
        <Spacer axis="vertical" size={{ default: 0, tablet: 16 }} />
        <List>
          {titles.map((movie) => {
            return <ListItem movie={movie} key={movie.imdbId} />;
          })}
        </List>
        <Spacer axis="vertical" size={{ default: 0, tablet: 16 }} />
      </Box>
    </Box>
  );
}

function List({ children }: IBoxProps): JSX.Element {
  return (
    <Box as="ol" className={gridStyle} paddingX={0}>
      {children}
    </Box>
  );
}

function ListItem({
  movie,
}: {
  movie: Queries.MostWatchedTitleFragment;
}): JSX.Element {
  return (
    <Box
      as="li"
      flexDirection={{ default: "row", tablet: "column" }}
      columnGap={24}
      backgroundColor={{ default: "zebra", tablet: "zebraOff" }}
      paddingX={{ default: "gutter", tablet: 0 }}
      paddingY={{ default: 16, tablet: 0 }}
      alignItems="center"
      display="flex"
    >
      <Poster movie={movie} flexShrink={0} />
      <Box flexGrow={1} width={{ tablet: "full" }}>
        <Box className={showTitleOnMobileOnlyStyle}>
          <Spacer axis="vertical" size={{ default: 0, tablet: 4 }} />
          <ListItemTitle
            title={movie.title}
            year={movie.year}
            slug={movie.slug}
          />
          <Spacer axis="vertical" size={{ default: 4, tablet: 8 }} />
        </Box>
        <Box
          fontSize="default"
          color="subtle"
          display="flex"
          justifyContent={{ default: "flex-start", tablet: "center" }}
        >
          <div>{movie.count.toLocaleString()} times</div>
        </Box>
        <Spacer axis="vertical" size={{ default: 4, tablet: 0 }} />
      </Box>
    </Box>
  );
}

interface IPosterProps extends IBoxProps {
  movie: Queries.MostWatchedTitleFragment;
}

function Poster({ movie, ...rest }: IPosterProps) {
  if (movie.slug) {
    return (
      <Link
        className={posterStyle}
        overflow="hidden"
        to={`/reviews/${movie.slug}/`}
        transform="safariBorderRadiusFix"
        boxShadow="borderAll"
        borderRadius={8}
        {...rest}
      >
        <GraphqlImage
          image={movie.poster}
          alt={`A poster from ${movie.title} (${movie.year})`}
        />
      </Link>
    );
  }

  return (
    <GraphqlImage
      image={movie.poster}
      alt="An unreviewed title."
      className={posterStyle}
      overflow="hidden"
      transform="safariBorderRadiusFix"
      boxShadow="borderAll"
      borderRadius={8}
    />
  );
}

export const query = graphql`
  fragment MostWatchedTitle on MostWatchedTitle {
    imdbId
    title
    year
    slug
    poster {
      childImageSharp {
        gatsbyImageData(
          layout: CONSTRAINED
          formats: [JPG, AVIF]
          quality: 80
          width: 200
          placeholder: NONE
        )
      }
    }
    count
  }
`;
