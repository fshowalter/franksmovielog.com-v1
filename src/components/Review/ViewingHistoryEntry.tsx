import { graphql } from "gatsby";
import { Box, IBoxProps } from "../Box";
import { DateIcon } from "../DateIcon";
import { gridAreaComponent, gridComponent } from "../Grid";
import { RenderedMarkdown } from "../RenderedMarkdown";
import { gridAreas, gridStyle } from "./ViewingHistoryEntry.css";

const GridArea = gridAreaComponent(gridAreas);

const Grid = gridComponent(gridStyle);

function Date({
  viewing,
}: {
  viewing: Queries.ViewingHistoryFragment["viewings"][0];
}) {
  return (
    <>
      <Box as="span" color="default" display="inline-block">
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
    <Box as="span" fontWeight="light" color="muted">
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
    <Box
      as="span"
      fontWeight="light"
      color="subtle"
      fontSize="small"
      lineHeight={1}
    >
      (
      <RenderedMarkdown
        // eslint-disable-next-line react/no-danger
        text={viewing.mediumNotes}
        fontSize="small"
        lineHeight={1}
        as="span"
      />
      )
    </Box>
  );
}

function VenueNotes({
  viewing,
}: {
  viewing: Queries.ViewingHistoryFragment["viewings"][0];
}) {
  if (!viewing.venueNotes) {
    return null;
  }
  return (
    <Box
      as="span"
      fontWeight="light"
      color="subtle"
      fontSize="small"
      lineHeight={1}
    >
      (
      <RenderedMarkdown
        // eslint-disable-next-line react/no-danger
        text={viewing.venueNotes}
        fontSize="small"
        lineHeight={1}
        as="span"
      />
      )
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
    <Box fontWeight="light" as="span" color="subtle">
      <span>at</span> <span>{viewing.venue}</span>
    </Box>
  );
}

function ViewingNotes({
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
        fontSize="default"
        lineHeight="default"
        // eslint-disable-next-line react/no-danger
        text={viewing.viewingNote.linkedHtml}
      />
    </Box>
  );
}

interface IIViewingHistoryItemProps extends IBoxProps {
  viewing: Queries.ViewingHistoryEntryFragment;
}

export function ViewingHistoryEntry({ viewing }: IIViewingHistoryItemProps) {
  return (
    <Grid backgroundColor="zebra" display="block" paddingX="gutter">
      <GridArea name="icon">
        <DateIcon />{" "}
      </GridArea>
      <GridArea name="slug">
        <Date viewing={viewing} />
        <Medium viewing={viewing} /> <MediumNotes viewing={viewing} />
        <Venue viewing={viewing} /> <VenueNotes viewing={viewing} />
      </GridArea>
      <GridArea name="notes">
        <ViewingNotes viewing={viewing} />
      </GridArea>
    </Grid>
  );
}

export const query = graphql`
  fragment ViewingHistoryEntry on ReviewedTitleViewing {
    date(formatString: "ddd MMM DD, YYYY")
    venue
    venueNotes
    medium
    mediumNotes
    viewingNotes {
      linkedHtml
    }
    sequence
  }
`;
