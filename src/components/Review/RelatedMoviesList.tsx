import { graphql } from "gatsby";
import { StillList, StillListHeading, StillListNav } from "../StillList";

export function RelatedMoviesList({
  linkText,
  linkTarget,
  items,
}: {
  linkText: string;
  linkTarget: string;
  items: readonly Queries.RelatedMoviesListItemFragment[];
}) {
  return (
    <>
      {items.map((item) => {
        return (
          <StillListNav key={item.slug}>
            <StillListHeading
              leadText={`More ${linkText}`}
              linkTarget={linkTarget}
              linkText={item.name}
            />
            <StillList
              movies={item.titles}
              seeAllLinkTarget={linkTarget}
              seeAllLinkText={`${linkText}`}
            />
          </StillListNav>
        );
      })}
    </>
  );
}

export const query = graphql`
  fragment RelatedMoviesListItem on ReviewedTitleMoreEntity {
    name
    slug
    titles {
      ...StillListMovie
    }
  }
`;
