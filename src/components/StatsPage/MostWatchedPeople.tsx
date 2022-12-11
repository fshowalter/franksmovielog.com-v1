import { graphql } from "gatsby";
import { Box } from "../Box";
import { Poster, PosterList } from "../PosterList";
import { Spacer } from "../Spacer";
import {
  detailsRowGridStyle,
  gridStyle,
  stickyHeaderStyle,
} from "./MostWatchedPeople.css";
import { StatHeading } from "./StatHeading";

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
        paddingX={24}
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
      <Box as="ol" padding={0} className={gridStyle}>
        {people.mostWatched.map((person) => {
          return (
            <Box as="li" key={person.fullName} display="contents">
              <Box
                as="span"
                lineHeight={40}
                backgroundColor="stripe"
                paddingX={24}
              >
                {nameRenderer({ person })}
              </Box>
              <Box as="span" lineHeight={40} backgroundColor="stripe">
                &nbsp;
              </Box>
              <Box
                as="span"
                lineHeight={40}
                backgroundColor="stripe"
                paddingRight={24}
                textAlign="right"
              >
                {person.viewingCount}
              </Box>
              <Box
                paddingX={24}
                lineHeight={40}
                className={detailsRowGridStyle}
              >
                <details>
                  <Box as="summary" color="subtle" letterSpacing={0.2}>
                    Details
                  </Box>
                  <PosterList>
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
                  <Spacer axis="vertical" size={32} />
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
        childImageSharp {
          gatsbyImageData(
            layout: CONSTRAINED
            formats: [JPG, AVIF]
            quality: 80
            width: 200
            placeholder: TRACED_SVG
          )
        }
      }
    }
  }

  fragment MostWatchedPeople on MostWatchedPeople {
    mostWatched {
      ...MostWatchedPerson
    }
  }
`;
