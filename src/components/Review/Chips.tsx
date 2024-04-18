import { graphql } from "gatsby";
import { Box, IBoxProps } from "../Box";
import { GraphqlImage, IGraphqlImage } from "../GraphqlImage";
import { Link } from "../Link";
import { avatarStyle, linkStyle } from "./Chips.css";

interface IChipsProps extends IBoxProps {
  chips: Queries.ReviewChipsFragment;
}

export function Chips({ chips, ...rest }: IChipsProps): JSX.Element {
  return (
    <Box
      as="ul"
      display="flex"
      flexWrap="wrap"
      columnGap={8}
      rowGap={8}
      {...rest}
    >
      {chips.castAndCrew.map((member) => {
        return (
          <Chip
            linkTarget={`/cast-and-crew/${member.slug}`}
            avatar={member.avatar}
            name={member.name}
            key={member.slug}
          />
        );
      })}
      {chips.collections.map((collection) => {
        return (
          <Chip
            linkTarget={`/collections/${collection.slug}`}
            avatar={collection.avatar}
            name={collection.name}
            key={collection.slug}
          />
        );
      })}
    </Box>
  );
}

function Chip({
  linkTarget,
  avatar,
  name,
}: {
  linkTarget: string;
  avatar: IGraphqlImage;
  name: string;
}) {
  return (
    <Box as="li" display="block">
      <Link
        to={linkTarget}
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
          image={avatar}
          alt={`More ${name} reviews`}
          borderRadius="half"
          className={avatarStyle}
          transform="safariBorderRadiusFix"
        />
        {name}
      </Link>
    </Box>
  );
}

export const query = graphql`
  fragment CollectionChip on ReviewedTitleMoreCollection {
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

  fragment CastAndCrewChip on ReviewedTitleMoreCastAndCrewMember {
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

  fragment ReviewChips on ReviewedTitleMore {
    castAndCrew {
      ...CastAndCrewChip
    }
    collections {
      ...CollectionChip
    }
  }
`;
