import { graphql, Link } from "gatsby";
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";
import { useReducer } from "react";
import DebouncedInput from "../DebouncedInput";
import Fieldset from "../Fieldset";
import FilterPageHeader from "../FilterPageHeader";
import HeadBuilder from "../HeadBuilder";
import Layout from "../Layout";
import { SelectField } from "../SelectField";
import {
  containerCss,
  defaultImageCss,
  filtersCss,
  leftCss,
  listCss,
  listItemAvatarCss,
  listItemCss,
  listItemLinkCss,
  listItemTitleCss,
  pageHeaderCss,
  percentBackgroundCss,
  percentProgressCss,
  progressRingCss,
  progressStatsCss,
  rightCss,
} from "./WatchlistEntityIndexPage.module.scss";
import {
  ActionType,
  initState,
  reducer,
  SortValue,
} from "./WatchlistEntityIndexPage.reducer";

function Progress({ entity }: { entity: WatchlistEntity }): JSX.Element {
  const percent = entity.reviewCount / entity.titleCount;
  const circumference = 17.5 * 2 * Math.PI;

  return (
    <svg
      viewBox="0 0 36 36"
      className={progressRingCss}
      preserveAspectRatio="none"
    >
      <g id="circles" strokeWidth="1">
        <circle
          r="17.5"
          cx="18"
          cy="18"
          fill="none"
          className={percentBackgroundCss}
        />
        <circle
          r="17.5"
          cx="18"
          cy="18"
          fill="none"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={circumference - percent * circumference}
          className={percentProgressCss}
        />
      </g>
    </svg>
  );
}

function ListItem({
  entity,
  slugPath,
}: {
  entity: WatchlistEntity;
  slugPath: string;
}): JSX.Element {
  if (entity.avatar) {
    return (
      <li className={listItemCss}>
        <Link
          className={listItemLinkCss}
          to={`/watchlist/${slugPath}/${entity.slug}/`}
        >
          {entity.avatar && (
            <GatsbyImage
              image={entity.avatar.childImageSharp.gatsbyImageData}
              className={listItemAvatarCss}
              alt={`An image of ${entity.name}`}
            />
          )}
          <Progress entity={entity} />
        </Link>
        <div className={listItemTitleCss}>
          <Link to={`/watchlist/${slugPath}/${entity.slug}/`}>
            {entity.name}
          </Link>
        </div>
        <div className={progressStatsCss}>
          {entity.reviewCount} / {entity.titleCount}
        </div>
      </li>
    );
  }
  return (
    <li className={listItemCss}>
      <div className={listItemLinkCss}>
        <svg
          className={`${listItemAvatarCss} ${defaultImageCss}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
        >
          <path
            clipRule="evenodd"
            d="M16 8A8 8 0 110 8a8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zM8 9a5 5 0 00-4.546 2.916A5.986 5.986 0 008 14a5.986 5.986 0 004.546-2.084A5 5 0 008 9z"
            fillRule="evenodd"
          />
        </svg>
        <Progress entity={entity} />
      </div>
      <div className={listItemTitleCss}>{entity.name}</div>
      <div className={progressStatsCss}>
        {entity.reviewCount} / {entity.titleCount}
      </div>
    </li>
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
  data: PageQueryResult;
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
      <main className={containerCss}>
        <div className={leftCss}>
          <FilterPageHeader
            className={pageHeaderCss}
            heading={entityDetails.pluralName}
            tagline={<q>{entityDetails.tagLine}</q>}
            breadcrumb={<Link to="/watchlist/">Watchlist</Link>}
          />
          <div className={filtersCss}>
            <Fieldset legend="Filter & Sort">
              <DebouncedInput
                label="Name"
                placeholder="Enter all or part of a name"
                onChange={(value) =>
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
          </div>
        </div>
        <div className={rightCss}>
          <ul data-testid="entity-list" className={listCss}>
            {state.filteredEntities.map((entity) => {
              return (
                <ListItem
                  key={entity.slug}
                  entity={entity}
                  slugPath={entityDetails.pluralName.toLowerCase()}
                />
              );
            })}
          </ul>
        </div>
      </main>
    </Layout>
  );
}

interface PageContext {
  entityType: EntityType;
}

export interface WatchlistEntity {
  name: string;
  slug: string;
  titleCount: number;
  reviewCount: number;
  avatar: null | {
    childImageSharp: {
      gatsbyImageData: IGatsbyImageData;
    };
  };
}

interface PageQueryResult {
  entity: {
    nodes: WatchlistEntity[];
  };
}

export const pageQuery = graphql`
  query ($entityType: String!) {
    entity: allWatchlistEntitiesJson(
      sort: { fields: [name], order: ASC }
      filter: { entity_type: { eq: $entityType } }
    ) {
      nodes {
        name
        slug
        titleCount: title_count
        reviewCount: review_count
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
    }
  }
`;
