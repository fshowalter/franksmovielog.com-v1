import { graphql, Link } from "gatsby";
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";
import React, { useReducer } from "react";
import DebouncedInput from "../DebouncedInput";
import Fieldset from "../Fieldset";
import FilterPageHeader from "../FilterPageHeader";
import Label from "../Label";
import Layout from "../Layout";
import SelectInput from "../SelectInput";
import Seo from "../Seo";
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
} from "./WatchlistEntityIndexPage.module.scss";
import {
  ActionType,
  initState,
  reducer,
  SortValue,
} from "./WatchlistEntityIndexPage.reducer";

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
      details.tagLine = `"Drama is life with the dull bits cut out."`;
      return details;
    }
    case EntityType.PERFORMER: {
      details.pluralName = "Performers";
      details.tagLine = `"Talk low, talk slow, and don't talk too much."`;
      return details;
    }
    case EntityType.WRITER: {
      details.pluralName = "Writers";
      details.tagLine = `"It's not a lie. It's a gift for fiction."`;
      return details;
    }
    case EntityType.COLLECTION: {
      details.pluralName = "Collections";
      details.tagLine = `"Round up the usual suspects."`;
      return details;
    }
  }
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
      <Seo
        pageTitle={`Watchlist ${entityDetails.pluralName}`}
        description={`A sortable and filterable list of watchlist ${entityDetails.pluralName.toLocaleLowerCase()}.`}
        image={null}
        article={false}
      />
      <main className={containerCss}>
        <div className={leftCss}>
          <FilterPageHeader
            className={pageHeaderCss}
            heading={
              <>
                <span className={pageHeaderSubCss}>Watchlist</span>{" "}
                {entityDetails.pluralName}
              </>
            }
            tagline={entityDetails.tagLine}
          />
          <Fieldset className={filtersCss}>
            <legend>Filter &amp; Sort</legend>
            <Label htmlFor="watchlist-entity-name-input">
              Name
              <DebouncedInput
                id="watchlist-entity-name-input"
                placeholder="Enter all or part of a name"
                onChange={(value) =>
                  dispatch({ type: ActionType.FILTER_NAME, value })
                }
              />
            </Label>
            <Label htmlFor="watchlist-entity-sort-input">
              Order By
              <SelectInput
                value={state.sortValue}
                id="watchlist-entity-sort-input"
                onChange={(e) =>
                  dispatch({
                    type: ActionType.SORT,
                    value: e.target.value as SortValue,
                  })
                }
              >
                <option value="name">Name</option>
                <option value="reviews">Review Count</option>
              </SelectInput>
            </Label>
          </Fieldset>
        </div>
        <div className={rightCss}>
          <ul data-testid="entity-list" className={listCss}>
            {state.filteredEntities.map((entity) => {
              return <ListItem key={entity.slug} entity={entity} />;
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
