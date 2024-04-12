import { backgroundColors } from "../../styles/colors.css";
import { Box } from "../Box";
import { GraphqlImage } from "../GraphqlImage";
import { Link } from "../Link";
import { ListItem } from "../ListItem";
import { ListInfo } from "../ListWithFiltersLayout/ListInfo";
import { Spacer } from "../Spacer";

export function List({
  entities,
  totalCount,
  visibleCount,
}: {
  entities: readonly Queries.CastAndCrewItemFragment[];
  totalCount: number;
  visibleCount: number;
}): JSX.Element {
  return (
    <>
      <ListInfo totalCount={totalCount} visibleCount={visibleCount} />
      <Box as="ol" data-testid="entity-list">
        {entities.map((entity) => {
          return <EntityListItem key={entity.slug} entity={entity} />;
        })}
      </Box>
      <Spacer axis="vertical" size={32} />
    </>
  );
}

function EntityListItem({
  entity,
}: {
  entity: Queries.CastAndCrewItemFragment;
}): JSX.Element {
  return (
    <ListItem alignItems="center">
      <Avatar entity={entity} />
      <EntityName entity={entity} />
    </ListItem>
  );
}

function Avatar({ entity }: { entity: Queries.CastAndCrewItemFragment }) {
  if (entity.avatar && entity.slug) {
    return (
      <Link
        to={`/cast-and-crew/${entity.slug}/`}
        transform="safariBorderRadiusFix"
        overflow="hidden"
        boxShadow="borderAll"
        borderRadius="half"
        maxWidth={64}
        width={64}
      >
        <GraphqlImage
          image={entity.avatar}
          alt={`An image of ${entity.name}`}
        />
      </Link>
    );
  }

  return (
    <Box width={64} maxWidth={64}>
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

function EntityName({ entity }: { entity: Queries.CastAndCrewItemFragment }) {
  if (entity.slug) {
    return (
      <Box>
        <Link to={`/cast-and-crew/${entity.slug}/`} fontSize="medium">
          <Box lineHeight="default">{entity.name}</Box>
        </Link>
        <Spacer axis="vertical" size={4} />
        <Credits entity={entity} />
      </Box>
    );
  }

  return (
    <Box>
      <Box color="subtle" fontSize="medium">
        <Box lineHeight="default">{entity.name}</Box>
      </Box>
      <Spacer axis="vertical" size={4} />
      <Credits entity={entity} />
    </Box>
  );
}

function buildCreditsString(entity: Queries.CastAndCrewItemFragment): string {
  let prefix = "";
  let watchlistCount: number;
  let reviewCount: number;

  switch (entity.mostCreditedAs) {
    case "director": {
      prefix = "Director of";
      reviewCount = entity.director.reviewCount;
      watchlistCount = entity.director.watchlistCount;
      break;
    }
    case "performer": {
      prefix = "Performer in";
      reviewCount = entity.performer.reviewCount;
      watchlistCount = entity.performer.watchlistCount;
      break;
    }
    default:
      prefix = "Writer of";
      reviewCount = entity.writer.reviewCount;
      watchlistCount = entity.writer.watchlistCount;
  }

  let creditsString = "";

  if (reviewCount) {
    creditsString = `${reviewCount} reviewed`;
  }

  if (watchlistCount) {
    if (reviewCount) {
      creditsString = `${creditsString} and`;
    }

    creditsString = `${creditsString} ${watchlistCount} watchlist`;
  }

  return `${prefix} ${creditsString} titles.`;
}

function Credits({
  entity,
}: {
  entity: Queries.CastAndCrewItemFragment;
}): JSX.Element {
  return (
    <Box color="subtle" fontWeight="light" fontSize="small" letterSpacing={0.5}>
      {buildCreditsString(entity)}
    </Box>
  );
}
