import { graphql, Link } from "gatsby";
import React, { useReducer, useRef } from "react";
import { collator } from "../../utils/sort-utils";
import Button from "../Button";
import DebouncedInput from "../DebouncedInput/DebouncedInput";
import Fieldset from "../Fieldset";
import FilterPageHeader from "../FilterPageHeader";
import Layout from "../Layout";
import RangeInput from "../RangeInput";
import SelectInput from "../SelectInput";
import Seo from "../Seo";
import StatsLink from "../StatsLink";
import {
  containerCss,
  filtersCss,
  leftCss,
  listCss,
  listInfoCss,
  listItemCss,
  listItemSlugCss,
  listItemTitleCss,
  listItemTitleLinkCss,
  listItemTitleYearCss,
  pageHeaderCss,
  quoteCss,
  rightCss,
  showMoreCss,
} from "./ViewingsIndexPage.module.scss";
import type { SortType } from "./ViewingsIndexPage.reducer";
import reducer, { ActionTypes, initState } from "./ViewingsIndexPage.reducer";

/**
 * Renders the venue select options.
 */
function VenueOptions({
  viewings,
}: {
  /** The viewings to parse for possible venues. */
  viewings: Viewing[];
}): JSX.Element {
  const venues = Array.from(
    new Set(viewings.map((viewing) => viewing.venue))
  ).sort((a, b) => collator.compare(a, b));

  return (
    <>
      <option key="all" value="All">
        All
      </option>
      {venues.map((venue) => (
        <option key={venue} value={venue}>
          {venue}
        </option>
      ))}
    </>
  );
}

/**
 * Renders a viewing title.
 */
function ViewingTitle({
  viewing,
}: {
  /** The viewing to render */
  viewing: Viewing;
}): JSX.Element {
  let title = (
    <>
      {viewing.title}{" "}
      <span className={listItemTitleYearCss}>{viewing.year}</span>
    </>
  );

  if (viewing.slug) {
    title = (
      <Link
        rel="canonical"
        to={`/reviews/${viewing.slug}/#${viewing.sequence}`}
        className={listItemTitleLinkCss}
      >
        {title}
      </Link>
    );
  }

  return <div className={listItemTitleCss}>{title}</div>;
}

/**
 * Renders a viewing slug.
 */
function ViewingSlug({ viewing }: { viewing: Viewing }) {
  return (
    <div className={listItemSlugCss}>
      {viewing.viewingDate} via {viewing.venue}
    </div>
  );
}

/**
 * Renders the viewings page.
 */
export default function ViewingsIndexPage({
  data,
}: {
  data: PageQueryResult;
}): JSX.Element {
  const [state, dispatch] = useReducer(
    reducer,
    {
      viewings: [...data.viewing.nodes],
    },
    initState
  );

  const listHeader = useRef<HTMLDivElement>(null);

  return (
    <Layout>
      <Seo
        pageTitle="Viewing Log"
        description="A sortable and filterable list of every movie I've watched since 2012."
        image={null}
        article={false}
      />
      <main className={containerCss}>
        <div className={leftCss}>
          <FilterPageHeader
            className={pageHeaderCss}
            heading="Viewing Log"
            tagline={
              <>
                I&apos;ve watched {state.allViewings.length.toLocaleString()}{" "}
                movies since 2012.{" "}
                <span className={quoteCss}>
                  &ldquo;We have such sights to show you.&rdquo;
                </span>
                <br />
                <StatsLink to="/viewings/stats/" />
              </>
            }
          />
          <Fieldset className={filtersCss} legend="Filter & Sort">
            <DebouncedInput
              label="Title"
              placeholder="Enter all or part of a title"
              onChange={(value) =>
                dispatch({ type: ActionTypes.FILTER_TITLE, value })
              }
            />
            <RangeInput
              label="Release Year"
              min={state.minYear}
              max={state.maxYear}
              onChange={(values) =>
                dispatch({ type: ActionTypes.FILTER_RELEASE_YEAR, values })
              }
            />
            <SelectInput
              label="Venue"
              onChange={(e) =>
                dispatch({
                  type: ActionTypes.FILTER_VENUE,
                  value: e.target.value,
                })
              }
            >
              <VenueOptions viewings={state.allViewings} />
            </SelectInput>
            <SelectInput
              value={state.sortValue}
              label="Order By"
              onChange={(e) =>
                dispatch({
                  type: ActionTypes.SORT,
                  value: e.target.value as SortType,
                })
              }
            >
              <option value="viewing-date-desc">
                Viewing Date (Newest First)
              </option>
              <option value="viewing-date-asc">
                Viewing Date (Oldest First)
              </option>
              <option value="release-date-desc">
                Release Date (Newest First)
              </option>
              <option value="release-date-asc">
                Release Date (Oldest First)
              </option>
              <option value="title">Title</option>
            </SelectInput>
          </Fieldset>
          <div className={listInfoCss}>
            Showing 1-{state.showCount} of{" "}
            {state.filteredViewings.length.toLocaleString()}
          </div>
        </div>
        <div className={rightCss} ref={listHeader}>
          <ol data-testid="viewings-list" className={listCss}>
            {state.filteredViewings.slice(0, state.showCount).map((viewing) => {
              return (
                <li
                  value={viewing.sequence}
                  key={viewing.sequence}
                  className={listItemCss}
                >
                  <ViewingTitle viewing={viewing} />
                  <ViewingSlug viewing={viewing} />
                </li>
              );
            })}
          </ol>
          <div className={showMoreCss}>
            {state.filteredViewings.length > state.showCount && (
              <Button onClick={() => dispatch({ type: ActionTypes.SHOW_MORE })}>
                <svg
                  focusable="false"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"></path>
                </svg>
                Show More
              </Button>
            )}
          </div>
        </div>
      </main>
    </Layout>
  );
}

export interface Viewing {
  title: string;
  year: number;
  releaseDate: string;
  viewingDate: string;
  sequence: number;
  venue: string;
  sortTitle: string;
  slug: string | null;
}

interface PageQueryResult {
  viewing: {
    nodes: Viewing[];
  };
}

export const pageQuery = graphql`
  query {
    viewing: allViewingsJson(sort: { fields: [sequence], order: DESC }) {
      nodes {
        sequence
        viewingDate: viewing_date(formatString: "dddd MMM D, YYYY")
        releaseDate: release_date
        title
        venue
        year
        sortTitle: sort_title
        slug
      }
    }
  }
`;
