import { graphql } from "gatsby";
import { Box, IBoxProps } from "../Box";
import DateIcon from "../DateIcon";
import { gridAreaComponent, gridComponent } from "../Grid";
import RenderedMarkdown from "../RenderedMarkdown";
import {
  gridAreas,
  gridStyle,
  listItemGridAreas,
  listItemGridStyle,
} from "./ViewingHistory.css";

const GridArea = gridAreaComponent(gridAreas);

const Grid = gridComponent(gridStyle);

const ListItemGridArea = gridAreaComponent(listItemGridAreas);

const ListItemGrid = gridComponent(listItemGridStyle);

function Date({
  viewing,
}: {
  viewing: Queries.ViewingHistoryFragment["viewings"][0];
}) {
  return (
    <>
      <Box as="span" fontWeight="bold">
        {viewing.date}
      </Box>{" "}
    </>
  );
}

function Medium({
  viewing,
}: {
  viewing: Queries.ViewingHistoryFragment["viewings"][0];
}) {
  if (!viewing.medium) {
    return null;
  }
  return (
    <Box fontWeight="light" color="muted">
      <span>via</span> <span>{viewing.medium}</span>
    </Box>
  );
}

function MediumNotes({
  viewing,
}: {
  viewing: Queries.ViewingHistoryFragment["viewings"][0];
}) {
  if (!viewing.mediumNotes) {
    return null;
  }
  return (
    <Box fontWeight="light" color="subtle">
      {viewing.mediumNotes}
    </Box>
  );
}

function Venue({
  viewing,
}: {
  viewing: Queries.ViewingHistoryFragment["viewings"][0];
}) {
  if (!viewing.venue) {
    return null;
  }
  return (
    <Box fontWeight="light" color="subtle">
      <span>at</span> <span>{viewing.venue}</span>
    </Box>
  );
}

function ViewingNote({
  viewing,
}: {
  viewing: Queries.ViewingHistoryFragment["viewings"][0];
}) {
  if (!viewing.viewingNote) {
    return null;
  }
  return (
    <Box paddingBottom={24}>
      <RenderedMarkdown
        // eslint-disable-next-line react/no-danger
        text={viewing.viewingNote.linkedHtml}
      />
    </Box>
  );
}
function ListItem({
  viewing,
}: {
  viewing: Queries.ViewingHistoryFragment["viewings"][0];
}) {
  return (
    <ListItemGrid as="li" background="zebra" display="block">
      <ListItemGridArea name="icon">
        <DateIcon />{" "}
      </ListItemGridArea>
      <ListItemGridArea name="date">
        <Date viewing={viewing} />
      </ListItemGridArea>
      <ListItemGridArea name="medium" color="subtle">
        <Medium viewing={viewing} />
      </ListItemGridArea>
      <ListItemGridArea name="mediumNotes">
        <MediumNotes viewing={viewing} />
      </ListItemGridArea>
      <ListItemGridArea name="venue">
        <Venue viewing={viewing} />
      </ListItemGridArea>
      <ListItemGridArea name="viewingNote">
        <ViewingNote viewing={viewing} />
      </ListItemGridArea>
    </ListItemGrid>
  );
}

function Heading() {
  return (
    <Box
      as="h3"
      color="subtle"
      fontSize="normal"
      fontWeight="semiBold"
      letterSpacing={0.2}
      lineHeight={2}
      boxShadow="borderBottom"
    >
      Viewing History
    </Box>
  );
}

interface IIViewingHistoryProps extends IBoxProps {
  movie: Queries.ViewingHistoryFragment;
}
export default function ViewingHistory({
  movie,
  ...rest
}: IIViewingHistoryProps) {
  return (
    <Grid {...rest}>
      <GridArea name="heading">
        <Heading />
      </GridArea>
      <GridArea name="list">
        <Box as="ul" padding={0}>
          {movie.viewings.map((viewing) => (
            <ListItem key={viewing.sequence} viewing={viewing} />
          ))}
        </Box>
      </GridArea>
    </Grid>
  );
}

export const query = graphql`
  fragment ViewingHistory on ReviewedMoviesJson {
    viewings {
      date: viewingDate(formatString: "ddd MMM DD, YYYY")
      venue
      medium
      mediumNotes
      viewingNote {
        linkedHtml
      }
      sequence
    }
  }
`;
