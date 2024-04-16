import { backgroundColors } from "../../styles/colors.css";
import { Box } from "../Box";
import { GraphqlImage } from "../GraphqlImage";
import { Link } from "../Link";
import { ListItem } from "../ListItem";
import { ListItemCounts } from "../ListItemCounts";
import { ListInfo } from "../ListWithFiltersLayout/ListInfo";
import { Spacer } from "../Spacer";

export function List({
  entities,
  totalCount,
  visibleCount,
}: {
  entities: readonly Queries.CollectionsItemFragment[];
  totalCount: number;
  visibleCount: number;
}): JSX.Element {
  return (
    <>
      <ListInfo totalCount={totalCount} visibleCount={visibleCount} />
      <Box as="ol" data-testid="entity-list">
        {entities.map((entity) => {
          return <CollectionListItem key={entity.name} entity={entity} />;
        })}
      </Box>
      <Spacer axis="vertical" size={32} />
    </>
  );
}

function CollectionListItem({
  entity,
}: {
  entity: Queries.CollectionsItemFragment;
}): JSX.Element {
  return (
    <ListItem alignItems="center">
      <Avatar entity={entity} />
      <CollectionName entity={entity} />
      <ListItemCounts current={entity.reviewCount} total={entity.titleCount} />
    </ListItem>
  );
}

function Avatar({ entity }: { entity: Queries.CollectionsItemFragment }) {
  let avatarImage;

  if (entity.avatar) {
    avatarImage = (
      <GraphqlImage image={entity.avatar} alt={`An image of ${entity.name}`} />
    );
  } else {
    avatarImage = (
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
    );
  }

  return (
    <Link
      to={`/collections/${entity.slug}/`}
      transform="safariBorderRadiusFix"
      overflow="hidden"
      boxShadow="borderAll"
      borderRadius="half"
      maxWidth={48}
      width={48}
    >
      {avatarImage}
    </Link>
  );
}

function CollectionName({
  entity,
}: {
  entity: Queries.CollectionsItemFragment;
}) {
  return (
    <Link to={`/collections/${entity.slug}/`} fontSize="medium">
      <Box lineHeight="default">{entity.name}</Box>
    </Link>
  );
}
