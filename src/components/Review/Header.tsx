import { graphql } from "gatsby";
import { Box, IBoxProps } from "../Box";
import { PageTitle } from "../PageTitle";

interface IHeaderProps extends IBoxProps {
  review: Queries.ReviewHeaderFragment;
}

export function Header({ review, ...rest }: IHeaderProps) {
  return (
    <Box
      as="header"
      {...rest}
      display="flex"
      flexDirection="column"
      rowGap={16}
    >
      <Box textAlign="inherit">
        <PageTitle>{review.title}</PageTitle>
        <OriginalTitle originalTitle={review.originalTitle} />
      </Box>
      <Meta review={review} />
    </Box>
  );
}

function OriginalTitle({ originalTitle }: { originalTitle: string | null }) {
  if (!originalTitle) {
    return null;
  }

  return <Box color="muted">({originalTitle})</Box>;
}

function Meta({ review }: { review: Queries.ReviewHeaderFragment }) {
  return (
    <Box color="muted">
      {review.year} <span>|</span>{" "}
      {review.countries.reduce<JSX.Element | null>((acc, country) => {
        if (acc === null) {
          return <>{country}</>;
        }

        return (
          <>
            {acc}
            <span>&ndash;</span>
            {country}
          </>
        );
      }, null)}{" "}
      <span>|</span> {review.runtimeMinutes}
      &#x02009;min{" "}
      <Box as="span">
        <span>|</span>{" "}
        <Box as="a" href="#credits">
          More...
        </Box>
      </Box>
    </Box>
  );
}

export const query = graphql`
  fragment ReviewHeader on ReviewedTitlesJson {
    title
    year
    originalTitle
    countries
    runtimeMinutes
  }
`;
