import { graphql } from "gatsby";
import { Box } from "../Box";
import { Poster, PosterList } from "../PosterList";
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
        paddingX="popoutGutter"
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
                paddingX="popoutGutter"
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
                    paddingX="popoutGutter"
                  >
                    Details
                  </Box>
                  <PosterList paddingX={{ default: 0, tablet: "popoutGutter" }}>
                    {person.viewings.map((viewing) => {
                      return (
                        <Poster
                          key={viewing.sequence}
                          image={viewing.poster}
                          title={viewing.title}
                          slug={viewing.reviewedMovie?.slug}
                          year={viewing.year}
                          date={viewing.viewingDate}
                          venue={viewing.venue}
                          medium={viewing.medium}
                        />
                      );
                    })}
                  </PosterList>
                  <Spacer axis="vertical" size={{ default: 0, tablet: 32 }} />
                </details>
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

export const query = graphql`
  fragment MostWatchedPerson on MostWatchedPerson {
    fullName
    slug
    viewingCount
    viewings {
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
        ...PosterListPoster
      }
    }
  }

  fragment MostWatchedPeople on MostWatchedPeople {
    mostWatched {
      ...MostWatchedPerson
    }
  }
`;
