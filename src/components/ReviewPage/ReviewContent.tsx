import { graphql } from "gatsby";
import { Box } from "../Box";
import Grade from "../Grade";
import { gridAreaComponent, gridComponent } from "../Grid";
import RenderedMarkdown from "../RenderedMarkdown";
import { gradeStyle, gridAreas, gridStyle } from "./ReviewContent.css";

const GridArea = gridAreaComponent(gridAreas);

const Grid = gridComponent(gridStyle);

export default function ReviewContent({
  movie,
}: {
  movie: Queries.ReviewContentFragment;
}) {
  return (
    <Grid>
      <GridArea name="grade">
        <Grade grade={movie.grade} className={gradeStyle} />
      </GridArea>
      <GridArea name="date" color="subtle">
        <Box as="span">on</Box>{" "}
        <Box as="span" fontWeight="bold">
          {movie.viewings[0].date}
        </Box>
      </GridArea>
      <GridArea name="text">
        <RenderedMarkdown
          // eslint-disable-next-line react/no-danger
          text={movie.review.linkedHtml}
        />
      </GridArea>
    </Grid>
  );
}

export const query = graphql`
  fragment ReviewContent on ReviewedMoviesJson {
    grade
    viewings {
      date: viewingDate(formatString: "ddd MMM DD, YYYY")
    }
    review {
      linkedHtml
    }
  }
`;
