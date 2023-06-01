import { graphql } from "gatsby";
import { Box } from "../Box";
import { ListItem } from "../ListItem";
import { ListItemMediumAndVenue } from "../ListItemMediumAndVenue";
import { ListItemPoster } from "../ListItemPoster";
import { ListItemTitle } from "../ListItemTitle";
import { Spacer } from "../Spacer";
import { StatHeading } from "../StatHeading";
import {
  detailsRowGridStyle,
  stickyHeaderStyle,
  stickyRowHeaderStyle,
} from "./MostWatchedPeople.css";

export function MostWatchedPeople({
  people,
  header,
  nameRenderer,
}: {
  header: string;
  people: Queries.MostWatchedPeopleFragment | null;
  nameRenderer: ({
    person,
  }: {
    person: Queries.MostWatchedPersonFragment;
  }) => JSX.Element;
}): JSX.Element | null {
  if (!people) {
    return null;
  }

  return (
    <Box as="section" boxShadow="borderAll">
      <StatHeading>{header}</StatHeading>
      <Box
        as="header"
        backgroundColor="default"
        display="flex"
        justifyContent="space-between"
        paddingX="gutter"
        className={stickyHeaderStyle}
        fontWeight="bold"
      >
        <Box as="span" textAlign="left" lineHeight={40}>
          Name
        </Box>
        <Box as="span" textAlign="right" lineHeight={40}>
          Viewings
        </Box>
      </Box>
      <Box as="ol">
        {people.mostWatched.map((person, index) => {
          return (
            <Box as="li" key={person.fullName} display="block">
              <Box
                className={stickyRowHeaderStyle}
                style={{ zIndex: 200 + index }}
                paddingX="gutter"
                backgroundColor="stripe"
              >
                <Box as="span" lineHeight={40}>
                  {nameRenderer({ person })}
                </Box>
                <Box as="span" lineHeight={40}>
                  &nbsp;
                </Box>
                <Box
                  as="span"
                  lineHeight={40}
                  backgroundColor="stripe"
                  textAlign="right"
                >
                  {person.viewingCount}
                </Box>
              </Box>
              <Box lineHeight={40} className={detailsRowGridStyle}>
                <details>
                  <Box
                    as="summary"
                    color="subtle"
                    letterSpacing={0.25}
                    paddingX="gutter"
                  >
                    Details
                  </Box>
                  <Box as="ol" paddingX={{ default: 0, tablet: "gutter" }}>
                    {person.viewings.map((viewing) => {
                      return (
                        <MostWatchedPersonViewingListItem
                          key={viewing.sequence}
                          viewing={viewing}
                        />
                      );
                    })}
                  </Box>
                </details>
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

export function MostWatchedPersonViewingListItem({
  viewing,
}: {
  viewing: Queries.MostWatchedPersonViewingFragment;
}) {
  return (
    <ListItem alignItems="center">
      <ListItemPoster
        slug={viewing.reviewedMovie?.slug}
        image={viewing.poster}
        title={viewing.title}
        year={viewing.year}
        flexShrink={0}
        boxShadow="borderAll"
      />
      <Box flexGrow={1}>
        <Box>
          <ListItemTitle
            title={viewing.title}
            year={viewing.year}
            slug={viewing.reviewedMovie?.slug}
          />
          <Spacer axis="vertical" size={{ default: 4, tablet: 8 }} />
        </Box>
        <Box
          color="subtle"
          display="flex"
          flexDirection="column"
          fontSize="small"
          fontWeight="light"
          letterSpacing={0.5}
        >
          <Spacer axis="vertical" size={{ default: 4, tablet: 0 }} />
          <Box>
            {viewing.viewingDate}
            <Spacer axis="vertical" size={8} />
            <ListItemMediumAndVenue
              medium={viewing.medium}
              venue={viewing.venue}
            />
          </Box>
        </Box>
        <Spacer axis="vertical" size={8} />
      </Box>
    </ListItem>
  );
}

export const query = graphql`
  fragment MostWatchedPersonViewing on ViewingsJson {
    sequence
    viewingDate(formatString: "ddd MMM D, YYYY")
    venue
    medium
    title
    year
    reviewedMovie {
      slug
    }
    poster {
      ...ListItemPoster
    }
  }

  fragment MostWatchedPerson on MostWatchedPerson {
    fullName
    slug
    viewingCount
    viewings {
      ...MostWatchedPersonViewing
    }
  }

  fragment MostWatchedPeople on MostWatchedPeople {
    mostWatched {
      ...MostWatchedPerson
    }
  }
`;
