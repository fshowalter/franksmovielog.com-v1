import { graphql } from "gatsby";
import { useReducer } from "react";
import { backgroundColors, borderColors } from "../../styles/colors.css";
import { Box } from "../Box";
import { DebouncedInput } from "../DebouncedInput";
import { Fieldset } from "../Fieldset";
import { GraphqlImage } from "../GraphqlImage";
import { HeadBuilder } from "../HeadBuilder";
import { Layout } from "../Layout";
import { Link } from "../Link";
import { SelectField } from "../SelectField";
import { Spacer } from "../Spacer";
import {
  gridStyle,
  progressRingPostionStyle,
  progressRingTransformStyle,
} from "./WatchlistEntityIndexPage.css";
import {
  ActionType,
  initState,
  reducer,
  SortValue,
} from "./WatchlistEntityIndexPage.reducer";

function Progress({
  entity,
}: {
  entity: Queries.WatchlistEntityIndexItemFragment;
}): JSX.Element {
  const percent = entity.reviewCount / entity.titleCount;
  const circumference = 17.5 * 2 * Math.PI;

  return (
    <svg
      viewBox="0 0 36 36"
      className={progressRingPostionStyle}
      preserveAspectRatio="none"
    >
      <g id="circles" strokeWidth="1">
        <circle
          r="17.5"
          cx="18"
          cy="18"
          fill="none"
          strokeWidth={1}
          stroke={borderColors.default}
        />
        <circle
          r="17.5"
          cx="18"
          cy="18"
          fill="none"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={circumference - percent * circumference}
          stroke={backgroundColors.progress}
          strokeLinecap="round"
          strokeWidth={0.8}
          transform="rotate(-90)"
          className={progressRingTransformStyle}
        />
      </g>
    </svg>
  );
}

function ListItem({
  entity,
  slugPath,
}: {
  entity: Queries.WatchlistEntityIndexItemFragment;
  slugPath: string;
}): JSX.Element {
  if (entity.avatar && entity.slug) {
    return (
      <Box as="li" display="flex" flexDirection="column">
        <Link
          to={`/watchlist/${slugPath}/${entity.slug}/`}
          max-width={160}
          borderRadius="half"
          transform="safariBorderRadiusFix"
          width="full"
          overflow="hidden"
        >
          <GraphqlImage
            image={entity.avatar}
            alt={`An image of ${entity.name}`}
          />
          <Progress entity={entity} />
        </Link>
        <Spacer axis="vertical" size={8} />
        <Link
          to={`/watchlist/${slugPath}/${entity.slug}/`}
          color="accent"
          textDecoration="none"
          fontSize="normal"
          textAlign="center"
          display="block"
        >
          {entity.name}
        </Link>
        <Box color="subtle" fontSize="normal" textAlign="center">
          {entity.reviewCount} / {entity.titleCount}
        </Box>
      </Box>
    );
  }
  return (
    <Box as="li" display="flex" flexDirection="column">
      <Box
        maxWidth={160}
        borderRadius="half"
        transform="safariBorderRadiusFix"
        overflow="hidden"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill={backgroundColors.subtle}
          width="auto"
        >
          <path
            clipRule="evenodd"
            d="M16 8A8 8 0 110 8a8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zM8 9a5 5 0 00-4.546 2.916A5.986 5.986 0 008 14a5.986 5.986 0 004.546-2.084A5 5 0 008 9z"
            fillRule="evenodd"
          />
        </svg>
        <Progress entity={entity} />
      </Box>
      <Spacer axis="vertical" size={8} />
      <Box fontSize="normal" textAlign="center" display="block">
        {entity.name}
      </Box>
      <Box color="subtle" fontSize="normal" textAlign="center">
        {entity.reviewCount} / {entity.titleCount}
      </Box>
    </Box>
  );
}

export enum EntityType {
  DIRECTOR = "director",
  PERFORMER = "performer",
  WRITER = "writer",
  COLLECTION = "collection",
}

function detailsForEntityType(entityType: EntityType) {
  const details = {
    tagLine: "",
    pluralName: "",
  };

  switch (entityType) {
    case EntityType.DIRECTOR: {
      details.pluralName = "Directors";
      details.tagLine = "Drama is life with the dull bits cut out.";
      return details;
    }
    case EntityType.PERFORMER: {
      details.pluralName = "Performers";
      details.tagLine = "Talk low, talk slow, and don't talk too much.";
      return details;
    }
    case EntityType.WRITER: {
      details.pluralName = "Writers";
      details.tagLine = "It's not a lie. It's a gift for fiction.";
      return details;
    }
    case EntityType.COLLECTION: {
      details.pluralName = "Collections";
      details.tagLine = "Round up the usual suspects.";
      return details;
    }
  }
}

export function Head({
  pageContext,
}: {
  pageContext: PageContext;
}): JSX.Element {
  const entityDetails = detailsForEntityType(pageContext.entityType);

  return (
    <HeadBuilder
      pageTitle={`Watchlist ${entityDetails.pluralName}`}
      description={`A sortable and filterable list of watchlist ${entityDetails.pluralName.toLocaleLowerCase()}.`}
      image={null}
      article={false}
    />
  );
}

/**
 * Renders an index page for watchlist entities.
 */
export default function WatchlistEntityIndexPage({
  pageContext,
  data,
}: {
  pageContext: PageContext;
  data: Queries.WatchlistEntityIndexPageQuery;
}): JSX.Element {
  const [state, dispatch] = useReducer(
    reducer,
    {
      entities: [...data.entity.nodes],
    },
    initState
  );

  const entityDetails = detailsForEntityType(pageContext.entityType);

  return (
    <Layout>
      <Box
        as="main"
        display="flex"
        flexDirection={{ default: "column", desktop: "row" }}
        paddingX={{ default: 0, desktop: "gutter" }}
        columnGap={64}
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          paddingX={{ default: "gutter", desktop: 0 }}
          paddingTop={32}
          flexBasis={320}
        >
          <Box maxWidth="prose">
            <Link color="accent" textDecoration="none" to="/watchlist/">
              Watchlist
            </Link>
            <Spacer axis="vertical" size={16} />
            <Box as="h1" fontSize="pageTitle">
              {entityDetails.pluralName}
            </Box>
            <Spacer axis="vertical" size={16} />
            <Box color="subtle">
              <q>{entityDetails.tagLine}</q>
            </Box>
          </Box>
          <Spacer axis="vertical" size={32} />
          <Box>
            <Fieldset legend="Filter & Sort">
              <DebouncedInput
                label="Name"
                placeholder="Enter all or part of a name"
                onInputChange={(value) =>
                  dispatch({ type: ActionType.FILTER_NAME, value })
                }
              />
              <SelectField
                value={state.sortValue}
                label="Order By"
                onChange={(e) =>
                  dispatch({
                    type: ActionType.SORT,
                    value: e.target.value as SortValue,
                  })
                }
              >
                <option value="name">Name</option>
                <option value="reviews">Review Count</option>
              </SelectField>
            </Fieldset>
          </Box>
        </Box>
        <Box display="flex" flexDirection="column" flexGrow={1}>
          <Spacer axis="vertical" size={32} />
          <Box
            as="ol"
            data-testid="entity-list"
            padding={0}
            className={gridStyle}
          >
            {state.filteredEntities.map((entity) => {
              return (
                <ListItem
                  key={entity.slug}
                  entity={entity}
                  slugPath={entityDetails.pluralName.toLowerCase()}
                />
              );
            })}
          </Box>
          <Spacer axis="vertical" size={128} />
        </Box>
      </Box>
    </Layout>
  );
}

interface PageContext {
  entityType: EntityType;
}

export const pageQuery = graphql`
  fragment WatchlistEntityIndexItem on WatchlistEntitiesJson {
    name
    slug
    titleCount
    reviewCount
    avatar {
      childImageSharp {
        gatsbyImageData(
          layout: CONSTRAINED
          formats: [JPG, AVIF]
          quality: 80
          width: 160
          height: 160
          placeholder: TRACED_SVG
        )
      }
    }
  }

  query WatchlistEntityIndexPage($entityType: String!) {
    entity: allWatchlistEntitiesJson(
      sort: { name: ASC }
      filter: { entityType: { eq: $entityType } }
    ) {
      nodes {
        ...WatchlistEntityIndexItem
      }
    }
  }
`;
