import { graphql } from "gatsby";
import { Box, IBoxProps } from "../Box";
import { GraphqlImage } from "../GraphqlImage";
import { Link } from "../Link";
import { avatarStyle, linkStyle } from "./CreditsChips.css";

interface IWatchlistLinksProps extends IBoxProps {
  chips: Queries.CreditChipsFragment;
}

export function CreditsChips({
  chips,
  ...rest
}: IWatchlistLinksProps): JSX.Element {
  return (
    <Box
      as="ul"
      display="flex"
      flexWrap="wrap"
      columnGap={8}
      rowGap={8}
      {...rest}
    >
      <Chips entities={chips.inCollection} />
      <Chips entities={chips.directedBy} />
      <Chips entities={chips.withPerformer} />
      <Chips entities={chips.writtenBy} />
    </Box>
  );
}

function Chips({
  entities,
}: {
  entities: readonly Queries.CreditChipFragment[];
}) {
  return (
    <>
      {entities.map((entity) => {
        return (
          <Box as="li" display="block" key={entity.slug}>
            <Link
              to={`/cast-and-crew/${entity.slug}/`}
              backgroundColor="inverse"
              display="flex"
              alignItems="center"
              whiteSpace="nowrap"
              className={linkStyle}
              boxShadow="borderAll"
              borderRadius={8}
              paddingY={8}
              paddingX={16}
            >
              <GraphqlImage
                image={entity.avatar}
                alt={`More ${entity.name} reviews`}
                borderRadius="half"
                className={avatarStyle}
                transform="safariBorderRadiusFix"
              />
              {entity.name}
            </Link>
          </Box>
        );
      })}
    </>
  );
}

export const query = graphql`
  fragment CreditChip on ReviewedTitleMoreEntity {
    name
    slug
    avatar {
      childImageSharp {
        gatsbyImageData(
          layout: FIXED
          formats: [JPG, AVIF]
          quality: 80
          width: 40
          height: 40
          placeholder: BLURRED
        )
      }
    }
  }

  fragment CreditChips on ReviewedTitleMore {
    withPerformer {
      ...CreditChip
    }
    directedBy {
      ...CreditChip
    }
    writtenBy {
      ...CreditChip
    }
    inCollection {
      ...CreditChip
    }
  }
`;
