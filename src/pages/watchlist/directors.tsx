import { graphql, Link } from "gatsby";
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";
import React, { useReducer } from "react";
import DebouncedInput from "../../components/DebouncedInput";
import Fieldset from "../../components/Fieldset";
import FilterPageHeader from "../../components/FilterPageHeader";
import Label from "../../components/Label";
import Layout from "../../components/Layout";
import SelectInput from "../../components/SelectInput";
import Seo from "../../components/Seo";
import applyFilters from "../../utils/apply-filters";
import { sortNumberDesc, sortStringAsc } from "../../utils/sort-utils";
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
} from "./directors.module.scss";

type SortValue = "name" | "reviews";

function sortEntities(titles: WatchlistEntity[], sortOrder: SortValue) {
  const sortMap: Record<
    SortValue,
    (a: WatchlistEntity, b: WatchlistEntity) => number
  > = {
    name: (a, b) => sortStringAsc(a.name, b.name),
    reviews: (a, b) => sortNumberDesc(a.reviewCount, b.reviewCount),
  };

  const comparer = sortMap[sortOrder];

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
  sortValue: SortValue;
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
  value: SortValue;
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
    // no default
  }
}

function ListItem({ entity }: { entity: WatchlistEntity }): JSX.Element {
  if (entity.avatar) {
    return (
      <li className={listItemCss}>
        <Link
          className={listItemLinkCss}
          to={`/watchlist/directors/${entity.slug}/`}
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
          <Link to={`/watchlist/directors/${entity.slug}/`}>{entity.name}</Link>
        </div>
        <Link
          to={`/watchlist/directors/${entity.slug}/`}
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
 * Renders a page for watchlist directors.
 */
export default function WatchlistDirectorsPage({
  data,
}: {
  data: PageQueryResult;
}): JSX.Element {
  const [state, dispatch] = useReducer(
    reducer,
    {
      entities: [...data.entity.nodes],
    },
    initState
  );

  return (
    <Layout>
      <Seo
        pageTitle="Watchlist Directors"
        description="A sortable and filterable list of watchlist directors."
        image={null}
        article={false}
      />
      <main className={containerCss}>
        <div className={leftCss}>
          <FilterPageHeader
            className={pageHeaderCss}
            heading={
              <>
                <span className={pageHeaderSubCss}>Watchlist</span> Directors
              </>
            }
            tagline="Drama is life with the dull bits cut out."
          />
          <Fieldset className={filtersCss}>
            <legend>Filter &amp; Sort</legend>
            <Label htmlFor="watchlist-type-name-input">
              Name
              <DebouncedInput
                id="watchlist-type-name-input"
                placeholder="Enter all or part of a name"
                onChange={(value) => dispatch({ type: FILTER_NAME, value })}
              />
            </Label>
            <Label htmlFor="watchlist-type-sort-input">
              Order By
              <SelectInput
                value={state.sortValue}
                id="watchlist-type-sort-input"
                onChange={(e) =>
                  dispatch({ type: SORT, value: e.target.value as SortValue })
                }
              >
                <option value="name">Name</option>
                <option value="reviews">Review Count</option>
              </SelectInput>
            </Label>
          </Fieldset>
        </div>
        <div className={rightCss}>
          <ul data-testid="directors-list" className={listCss}>
            {state.filteredEntities.map((entity) => {
              return <ListItem key={entity.slug} entity={entity} />;
            })}
          </ul>
        </div>
      </main>
    </Layout>
  );
}

interface WatchlistEntity {
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
  query {
    entity: allWatchlistEntitiesJson(
      sort: { fields: [name], order: ASC }
      filter: { entity_type: { eq: "director" } }
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
              breakpoints: [130, 162, 174, 260, 324, 348]
              width: 174
              height: 174
              placeholder: TRACED_SVG
              sizes: "(max-width: 487) 174px,  (max-width: 1279px) 162px, (max-width: 1291px) 174px, 130px"
            )
          }
        }
      }
    }
  }
`;
