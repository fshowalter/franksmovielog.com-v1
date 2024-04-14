import { Box } from "../Box";
import { GraphqlImage } from "../GraphqlImage";
import { Link } from "../Link";
import { PageTitle } from "../PageTitle";
import { Spacer } from "../Spacer";
import { avatarStyle } from "./Collection.css";

export function Header({
  collection,
}: {
  collection: Queries.CollectionFragment;
}): JSX.Element {
  return (
    <>
      <Box textAlign="center" lineHeight={36}>
        <Link to="/collections/">Collections</Link>
      </Box>
      <Spacer axis="vertical" size={16} />
      <Box display="flex" flexDirection="column" alignItems="center">
        <GraphqlImage
          image={collection.avatar}
          alt={collection.name}
          borderRadius="half"
          transform="safariBorderRadiusFix"
          className={avatarStyle}
        />
      </Box>
      <Spacer axis="vertical" size={16} />
      <PageTitle textAlign="center">{collection.name}</PageTitle>
      <Spacer axis="vertical" size={24} />
      <Box
        color="subtle"
        textAlign="center"
      >{`Collection of ${collection.titles.length.toLocaleString()} movies. ${collection.reviewCount.toLocaleString()} reviewed.`}</Box>
    </>
  );
}
