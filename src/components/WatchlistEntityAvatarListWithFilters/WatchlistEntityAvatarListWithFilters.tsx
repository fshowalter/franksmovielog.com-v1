import { graphql } from "gatsby";
import { useReducer } from "react";
import { backgroundColors } from "../../styles/colors.css";
import { Box } from "../Box";
import { DebouncedInput } from "../DebouncedInput";
import { Fieldset } from "../Fieldset";
import { GraphqlImage } from "../GraphqlImage";
import { Layout } from "../Layout";
import { Link } from "../Link";
import { SelectField } from "../SelectField";
import { Spacer } from "../Spacer";
import { gridStyle } from "./WatchlistEntityAvatarListWithFilters.css";
import {
  ActionType,
  initState,
  reducer,
  SortValue,
} from "./WatchlistEntityAvatarListWithFilters.reducer";

function Avatar({
  entity,
}: {
  entity: Queries.WatchlistEntityAvatarListItemFragment;
}) {
  if (entity.avatar && entity.slug) {
    return (
      <Link
        to={`/watchlist/${entity.entityType}s/${entity.slug}/`}
        maxWidth={{ default: 40, tablet: 160 }}
        borderRadius="half"
        transform="safariBorderRadiusFix"
        overflow="hidden"
        boxShadow="borderAll"
      >
        <GraphqlImage
          image={entity.avatar}
          alt={`An image of ${entity.name}`}
        />
      </Link>
    );
  }

  return (
    <Box maxWidth={{ default: 40, tablet: 160 }}>
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
}: {
  entity: Queries.WatchlistEntityAvatarListItemFragment;
}) {
  if (entity.slug) {
    return (
      <Link
        to={`/watchlist/${entity.entityType}s/${entity.slug}/`}
        fontSize="posterTitle"
        textAlign="center"
      >
        <Spacer axis="vertical" size={4} />
        <Box lineHeight="default">{entity.name}</Box>
        <Spacer axis="vertical" size={4} />
      </Link>
    );
  }

  return (
    <Box color="subtle" fontSize="posterTitle" textAlign="center">
      <Spacer axis="vertical" size={4} />
      <Box lineHeight="default">{entity.name}</Box>
      <Spacer axis="vertical" size={4} />
    </Box>
  );
}

function ListItem({
  entity,
}: {
  entity: Queries.WatchlistEntityAvatarListItemFragment;
}): JSX.Element {
  return (
    <Box
      as="li"
      display="flex"
      flexDirection={{ default: "row", tablet: "column" }}
      columnGap={32}
      backgroundColor={{ default: "zebraOdd", tablet: "zebraOff" }}
      paddingX={{ default: "popoutGutter", tablet: 0 }}
      paddingY={{ default: 16, tablet: 0 }}
      alignItems={{ default: "center" }}
    >
      <Avatar entity={entity} />
      <EntityName entity={entity} />
    </Box>
  );
}

export function WatchlistEntityAvatarListWithFilters({
  entities,
  title,
  tagline,
}: {
  entities: readonly Queries.WatchlistEntityAvatarListItemFragment[];
  title: string;
  tagline: string;
}): JSX.Element {
  const [state, dispatch] = useReducer(
    reducer,
    {
      entities,
    },
    initState
  );

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
          alignItems={{ default: "center", desktop: "flex-start" }}
          paddingX={{ default: "gutter", desktop: 0 }}
          paddingTop={32}
          flexBasis={352}
        >
          <Box
            maxWidth="prose"
            display="flex"
            flexDirection="column"
            alignItems={{ default: "center", desktop: "flex-start" }}
          >
            <Link to="/watchlist/">Watchlist</Link>
            <Spacer axis="vertical" size={16} />
            <Box as="h1" fontSize="pageTitle">
              {title}
            </Box>
            <Spacer axis="vertical" size={16} />
            <Box color="subtle">
              <q>{tagline}</q>
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
                <option value="name-asc">Name (A-&gt;Z)</option>
                <option value="name-desc">Name (Z-&gt;A)</option>
              </SelectField>
            </Fieldset>
          </Box>
        </Box>
        <Box display="flex" flexDirection="column" flexGrow={1}>
          <Spacer axis="vertical" size={{ default: 32, tablet: 64 }} />
          <Box
            as="ol"
            data-testid="entity-list"
            paddingX={{
              default: 0,
              tablet: "gutter",
              desktop: 0,
            }}
            className={gridStyle}
          >
            {state.filteredEntities.map((entity) => {
              return <ListItem key={entity.name} entity={entity} />;
            })}
          </Box>
          <Spacer axis="vertical" size={128} />
        </Box>
      </Box>
    </Layout>
  );
}

export const pageQuery = graphql`
  fragment WatchlistEntityAvatarListItem on WatchlistEntitiesJson {
    name
    slug
    entityType
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
          placeholder: BLURRED
        )
      }
    }
  }
`;
