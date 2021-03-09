import { graphql, Link } from "gatsby";
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";
import React, { useReducer, useRef } from "react";
import DebouncedInput from "../components/DebouncedInput";
import Fieldset from "../components/Fieldset";
import FilterPageHeader from "../components/FilterPageHeader";
import Label from "../components/Label";
import Layout from "../components/Layout";
import SelectInput from "../components/SelectInput";
import Seo from "../components/Seo";
import applyFilters from "../utils/apply-filters";
import { sortNumberDesc, sortStringAsc } from "../utils/sort-utils";
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
  pageHeaderSubCss,
  percentBackgroundCss,
  percentProgressCss,
  progressRingCss,
  progressStatsCss,
  rightCss,
} from "./watchlist-type.module.scss";

function sortEntities(titles: WatchlistEntity[], sortOrder: string) {
  const sortMap: Record<
    string,
    (a: WatchlistEntity, b: WatchlistEntity) => number
  > = {
    name: (a, b) => sortStringAsc(a.name, b.name),
    reviews: (a, b) => sortNumberDesc(a.reviewCount, b.reviewCount),
  };

  const comparer = sortMap[sortOrder];

  if (!comparer) {
    return titles;
  }

  return titles.sort(comparer);
}

/**
 * The page state.
 */
type State = {
  /** All possible reviews. */
  allEntities: WatchlistEntity[];
  /** People matching the current filters. */
  filteredEntities: WatchlistEntity[];
  /** The active filters. */
  filters: Record<string, (entity: WatchlistEntity) => boolean>;
  /** The active sort value. */
  sortValue: string;
};

function initState({ entities }: { entities: WatchlistEntity[] }): State {
  return {
    allEntities: entities,
    filteredEntities: entities,
    filters: {},
    sortValue: "name",
  };
}

function Progress({ entity }: { entity: WatchlistEntity }): JSX.Element {
  const percent = Math.floor((entity.reviewCount / entity.titleCount) * 100);

  return (
    <svg viewBox="0 0 36 36">
      <path
        className={percentBackgroundCss}
        d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
      />
      <path
        d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
        className={percentProgressCss}
        strokeDasharray={`${percent}, 100`}
      />
    </svg>
  );
}

/**
 * Renders the description for the current entity type.
 */
function buildDescription(entityType: string): string {
  switch (entityType) {
    case "director":
      return `"Drama is life with the dull bits cut out."`;
    case "performer":
      return `"Talk low, talk slow, and don't talk too much."`;
    case "writer":
      return `"It's not a lie. It's a gift for fiction."`;
    case "collection":
      return `"Round up the usual suspects."`;
    default:
      throw new Error(`Unknown entityType parameter: ${entityType}`);
  }
}

const FILTER_NAME = "FILTER_NAME";
const SORT = "SORT";

/** Action to filter by title. */
interface FilterNameAction {
  type: typeof FILTER_NAME;
  /** The value to filter on. */
  value: string;
}

interface SortAction {
  type: typeof SORT;
  /** The sorter to apply. */
  value: string;
}

type ActionTypes = FilterNameAction | SortAction;

/**
 * Applies the given action to the given state, returning a new State object.
 * @param state The current state.
 * @param action The action to apply.
 */
function reducer(state: State, action: ActionTypes): State {
  let filters;
  let filteredEntities;

  switch (action.type) {
    case FILTER_NAME: {
      const regex = new RegExp(action.value, "i");
      filters = {
        ...state.filters,
        name: (person: WatchlistEntity) => {
          return regex.test(person.name);
        },
      };
      filteredEntities = sortEntities(
        applyFilters<WatchlistEntity>({
          collection: state.allEntities,
          filters,
        }),
        state.sortValue
      );
      return {
        ...state,
        filters,
        filteredEntities,
      };
    }
    case SORT: {
      filteredEntities = sortEntities(state.filteredEntities, action.value);
      return {
        ...state,
        sortValue: action.value,
        filteredEntities,
      };
    }
    default:
      throw new Error(`Unknown action type.`);
  }
}

function ListItem({
  entityType,
  entity,
}: {
  entityType: string;
  entity: WatchlistEntity;
}): JSX.Element {
  if (entity.avatar) {
    return (
      <li className={listItemCss}>
        <Link
          className={listItemLinkCss}
          to={`/watchlist/${entityType}s/${entity.slug}/`}
        >
          {entity.avatar && (
            <GatsbyImage
              image={entity.avatar.childImageSharp.gatsbyImageData}
              className={listItemAvatarCss}
              alt={`An image of ${entity.name}`}
            />
          )}
        </Link>
        <div className={listItemTitleCss}>
          <Link to={`/watchlist/${entityType}s/${entity.slug}/`}>
            {entity.name}
          </Link>
        </div>
        <Link
          to={`/watchlist/${entityType}s/${entity.slug}/`}
          className={progressRingCss}
        >
          <Progress entity={entity} />
        </Link>
        <div className={progressStatsCss}>
          {entity.reviewCount} / {entity.titleCount}
        </div>
      </li>
    );
  }
  return (
    <li className={listItemCss}>
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
      <div className={listItemTitleCss}>{entity.name}</div>
      <div className={progressRingCss}>
        <Progress entity={entity} />
      </div>
      <div className={progressStatsCss}>
        {entity.reviewCount} / {entity.titleCount}
      </div>
    </li>
  );
}

/**
 * Renders a watchlist page for a given person.
 */
export default function WatchlistTypeTemplate({
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

  const listHeader = useRef<HTMLDivElement>(null);
  const pageTitle = `${pageContext.entityType[0].toUpperCase()}${pageContext.entityType.slice(
    1
  )}`;

  return (
    <Layout>
      <Seo
        pageTitle={`Watchlist ${pageTitle}s`}
        description={`A sortable and filterable list of watchlist ${pageContext.entityType}s.`}
        image={null}
        article={false}
      />
      <main className={containerCss}>
        <div className={leftCss}>
          <FilterPageHeader
            className={pageHeaderCss}
            heading={
              <>
                <span className={pageHeaderSubCss}>Watchlist</span> {pageTitle}s
              </>
            }
            tagline={buildDescription(pageContext.entityType)}
          />
          <Fieldset className={filtersCss}>
            <legend>Filter &amp; Sort</legend>
            <Label htmlFor="watchlist-people-title-input">
              Title
              <DebouncedInput
                id="watchlist-people-name-input"
                placeholder="Enter all or part of a name"
                onChange={(value) => dispatch({ type: FILTER_NAME, value })}
              />
            </Label>
            <Label htmlFor="watchlist-people-sort-input">
              Order By
              <SelectInput
                value={state.sortValue}
                id="watchlist-people-sort-input"
                onChange={(e) =>
                  dispatch({ type: SORT, value: e.target.value })
                }
              >
                <option value="name">Name</option>
                <option value="reviews">Review Count</option>
              </SelectInput>
            </Label>
          </Fieldset>
        </div>
        <div className={rightCss} ref={listHeader}>
          <ul className={listCss}>
            {state.filteredEntities.map((entity) => {
              return (
                <ListItem entity={entity} entityType={pageContext.entityType} />
              );
            })}
          </ul>
        </div>
      </main>
    </Layout>
  );
}

interface PageContext {
  entityType: string;
  slug: string;
}

interface WatchlistEntity {
  name: string;
  slug: string;
  titleCount: number;
  reviewCount: number;
  avatar: {
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
  query($entityType: String) {
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
              formats: [JPG]
              quality: 80
              breakpoints: [130, 162, 174, 260, 324, 348]
              width: 174
              height: 174
              sizes: "(max-width: 487) 174px,  (max-width: 1279px) 162px, (max-width: 1291px) 174px, 130px"
            )
          }
        }
      }
    }
  }
`;
