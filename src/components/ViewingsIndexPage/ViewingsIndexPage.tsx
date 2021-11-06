import { graphql, Link } from "gatsby";
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";
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
  listHeaderGroupCss,
  listInfoCss,
  listItemImageLinkCss,
  listItemSlugCss,
  listItemTitleCss,
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

function ListInfo({
  visible,
  total,
}: {
  visible: number;
  total: number;
}): JSX.Element {
  let showingText;

  if (visible > total) {
    showingText = `Showing ${total} of ${total}`;
  } else {
    showingText = `Showing 1-${visible} of ${total.toLocaleString()}`;
  }

  return <div className={listInfoCss}>{showingText}</div>;
}

function groupForViewing(viewing: Viewing, sortValue: SortType): string {
  const shortMonthToLong: { [key: string]: string } = {
    Jan: "January",
    Feb: "February",
    Mar: "March",
    Apr: "April",
    May: "May",
    Jun: "June",
    Jul: "July",
    Aug: "August",
    Sep: "September",
    Oct: "October",
    Nov: "November",
    Dec: "December",
  };

  switch (sortValue) {
    case "release-date-asc":
    case "release-date-desc": {
      return viewing.releaseDate.substring(0, 4);
    }
    case "viewing-date-asc":
    case "viewing-date-desc": {
      const match = viewing.viewingDate.match(
        /[A-Za-z]{3} ([A-Za-z]{3}) \d{1,2}, (\d{4})/
      );
      if (!match) {
        return "Unknown";
      }

      return `${shortMonthToLong[match[1]]} ${match[2]}`;
    }
    case "title": {
      const letter = viewing.sortTitle.substring(0, 1);

      if (letter.toLowerCase() == letter.toUpperCase()) {
        return "#";
      }

      return viewing.sortTitle.substring(0, 1).toLocaleUpperCase();
    }
    // no default
  }
}

function groupViewings({
  viewings,
  sortValue,
}: {
  viewings: Viewing[];
  sortValue: SortType;
}): Map<string, Viewing[]> {
  const groupedViewings: Map<string, Viewing[]> = new Map();

  viewings.map((viewing) => {
    const group = groupForViewing(viewing, sortValue);
    let groupValue = groupedViewings.get(group);

    if (!groupValue) {
      groupValue = [];
      groupedViewings.set(group, groupValue);
    }
    groupValue.push(viewing);
  });

  return groupedViewings;
}

function ListItem({ viewing }: { viewing: Viewing }): JSX.Element {
  if (viewing.slug) {
    return (
      <li>
        <Link className={listItemImageLinkCss} to={`/reviews/${viewing.slug}/`}>
          {viewing.poster && (
            <GatsbyImage
              image={viewing.poster.childImageSharp.gatsbyImageData}
              alt={`A poster from ${viewing.title} (${viewing.year})`}
            />
          )}
        </Link>
        <div className={listItemTitleCss}>
          <Link to={`/reviews/${viewing.slug}/`}>
            {viewing.title}{" "}
            <span className={listItemTitleYearCss}>{viewing.year}</span>
          </Link>
        </div>
        <div className={listItemSlugCss}>
          <div>{viewing.viewingDate}</div>
          <div>{viewing.venue}</div>
        </div>
      </li>
    );
  }

  return (
    <li>
      <GatsbyImage
        image={viewing.poster.childImageSharp.gatsbyImageData}
        alt="An unreviewed title."
      />
      <div className={listItemTitleCss}>
        {viewing.title}{" "}
        <span className={listItemTitleYearCss}>{viewing.year}</span>
      </div>
      <div className={listItemSlugCss}>
        <div>{viewing.viewingDate}</div>
        <div>{viewing.venue}</div>
      </div>
    </li>
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

  const groupedViewings = groupViewings({
    viewings: state.filteredViewings.slice(0, state.showCount),
    sortValue: state.sortValue,
  });

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
            <ListInfo
              visible={state.showCount}
              total={state.filteredViewings.length}
            />
          </div>
        </div>
        <div className={rightCss} ref={listHeader}>
          <ol data-testid="viewings-list">
            {[...groupedViewings].map(([group, viewings], index) => {
              return (
                <li key={group}>
                  <div
                    className={listHeaderGroupCss}
                    style={{ zIndex: index + 100 }}
                  >
                    {group}
                  </div>
                  <ol className={listCss}>
                    {viewings.map((viewing) => {
                      return (
                        <ListItem viewing={viewing} key={viewing.sequence} />
                      );
                    })}
                  </ol>
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
  poster: {
    childImageSharp: {
      gatsbyImageData: IGatsbyImageData;
    };
  };
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
        viewingDate: viewing_date(formatString: "ddd MMM D, YYYY")
        releaseDate: release_date
        title
        venue
        year
        sortTitle: sort_title
        slug
        poster {
          childImageSharp {
            gatsbyImageData(
              layout: CONSTRAINED
              formats: [JPG, AVIF]
              quality: 80
              width: 200
              placeholder: TRACED_SVG
            )
          }
        }
      }
    }
  }
`;
