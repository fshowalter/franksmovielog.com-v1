import { backgroundColors } from "../../styles/colors.css";
import { Box } from "../Box";
import { GraphqlImage } from "../GraphqlImage";
import { Link } from "../Link";
import { ListItem } from "../ListItem";
import { ListInfo } from "../ListWithFiltersLayout/ListInfo";
import { Spacer } from "../Spacer";
import { countMarginStyle } from "./List.css";

export function List({
  entityType,
  entities,
  totalCount,
  visibleCount,
}: {
  entityType: string;
  entities: readonly Queries.WatchlistEntitiesItemFragment[];
  totalCount: number;
  visibleCount: number;
}): JSX.Element {
  return (
    <>
      <ListInfo totalCount={totalCount} visibleCount={visibleCount} />
      <Box as="ol" data-testid="entity-list">
        {entities.map((entity) => {
          return (
            <EntityListItem
              key={entity.name}
              entity={entity}
              entityType={entityType}
            />
          );
        })}
      </Box>
      <Spacer axis="vertical" size={32} />
    </>
  );
}

function EntityListItem({
  entity,
  entityType,
}: {
  entity: Queries.WatchlistEntitiesItemFragment;
  entityType: string;
}): JSX.Element {
  return (
    <ListItem alignItems="center">
      <Avatar entity={entity} entityType={entityType} />
      <EntityName entity={entity} entityType={entityType} />
      <ReviewCount entity={entity} />
    </ListItem>
  );
}

function Avatar({
  entity,
  entityType,
}: {
  entity: Queries.WatchlistEntitiesItemFragment;
  entityType: string;
}) {
  if (entity.avatar && entity.slug) {
    return (
      <Link
        to={`/watchlist/${entityType}s/${entity.slug}/`}
        transform="safariBorderRadiusFix"
        overflow="hidden"
        boxShadow="borderAll"
        borderRadius="half"
        maxWidth={48}
        width={48}
      >
        <GraphqlImage
          image={entity.avatar}
          alt={`An image of ${entity.name}`}
        />
      </Link>
    );
  }

  return (
    <Box width={48} maxWidth={48}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        fill={backgroundColors.subtle}
        width="100%"
      >
        <path
          clipRule="evenodd"
          d="M16 8A8 8 0 110 8a8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zM8 9a5 5 0 00-4.546 2.916A5.986 5.986 0 008 14a5.986 5.986 0 004.546-2.084A5 5 0 008 9z"
          fillRule="evenodd"
        />
      </svg>
    </Box>
  );
}

function EntityName({
  entity,
  entityType,
}: {
  entity: Queries.WatchlistEntitiesItemFragment;
  entityType: string;
}) {
  if (entity.slug) {
    return (
      <Link to={`/watchlist/${entityType}s/${entity.slug}/`} fontSize="medium">
        <Box lineHeight="default">{entity.name}</Box>
      </Link>
    );
  }

  return (
    <Box color="subtle" fontSize="medium">
      <Box lineHeight="default">{entity.name}</Box>
    </Box>
  );
}

function ReviewCount({
  entity,
}: {
  entity: Queries.WatchlistEntitiesItemFragment;
}): JSX.Element {
  return (
    <Box
      color={entity.reviewCount === entity.titleCount ? "progress" : "subtle"}
      className={countMarginStyle}
    >
      {entity.reviewCount} / {entity.titleCount}
    </Box>
  );
}
