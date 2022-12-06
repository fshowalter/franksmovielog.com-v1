import { graphql } from "gatsby";
import { Box } from "../Box";
import DateIcon from "../DateIcon";
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
      <GridArea name="date" color="muted">
        <Box display={{ mobile: "none", desktop: "block" }}>
          <DateIcon />
        </Box>
        <Box
          as="span"
          fontWeight="normal"
          color="subtle"
          display={{ desktop: "none" }}
        >
          on
        </Box>{" "}
        <Box as="span">{movie.viewings[0].date}</Box>
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
