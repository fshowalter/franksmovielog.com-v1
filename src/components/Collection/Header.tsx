import { Box } from "../Box";
import { GraphqlImage } from "../GraphqlImage";
import { Link } from "../Link";
import { PageTitle } from "../PageTitle";
import { Spacer } from "../Spacer";
import { avatarStyle } from "./WatchlistEntity.css";

export function Header({
  entity,
  entityType,
  tagline,
  breadcrumb,
}: {
  entity: Queries.WatchlistEntityFragment;
  entityType: string;
  tagline: string;
  breadcrumb: string;
}): JSX.Element {
  return (
    <>
      <Box textAlign="center" lineHeight={36}>
        <Link to="/watchlist/">Watchlist</Link> /{" "}
        <Link to={`/watchlist/${entityType}s/`}>{breadcrumb}</Link>
      </Box>
      <Spacer axis="vertical" size={16} />
      <Box display="flex" flexDirection="column" alignItems="center">
        <GraphqlImage
          image={entity.avatar}
          alt={entity.name}
          borderRadius="half"
          transform="safariBorderRadiusFix"
          className={avatarStyle}
        />
      </Box>
      <Spacer axis="vertical" size={16} />
      <PageTitle textAlign="center">{entity.name}</PageTitle>
      <Spacer axis="vertical" size={24} />
      <Box
        color="subtle"
        textAlign="center"
      >{`${tagline} ${entity.titles.length.toLocaleString()} watchlist movies. ${entity.reviewCount.toLocaleString()} reviewed.`}</Box>
    </>
  );
}
