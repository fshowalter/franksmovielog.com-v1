import {
  createHistory,
  createMemorySource,
  LocationProvider,
} from "@reach/router";
import { useStaticQuery } from "gatsby";
import React from "react";
import { create } from "react-test-renderer";
import HomeTemplate, { PageContext, PageQueryResult } from "./home";

const source = createMemorySource("/");
const history = createHistory(source);

const pageContext: PageContext = {
  limit: 10,
  skip: 0,
  numberOfItems: 1,
  currentPage: 1,
};

const data: PageQueryResult = {
  updates: {
    nodes: [],
  },
  movieInfo: {
    nodes: [],
  },
  watchlistMovie: {
    nodes: [],
  },
};

describe("Home", () => {
  beforeEach(() => {
    (useStaticQuery as jest.Mock).mockImplementationOnce(() => ({
      site: {
        siteMetadata: {
          author: "Frank Showalter",
        },
      },
    }));
  });

  it("renders correctly", () => {
    expect.hasAssertions();
    const tree = create(
      <LocationProvider history={history}>
        <HomeTemplate pageContext={pageContext} data={data} />
      </LocationProvider>
    ).toJSON();

    // eslint-disable-next-line jest/no-large-snapshots
    expect(tree).toMatchInlineSnapshot(`
      Array [
        <a
          className="skip_link"
          href="#content"
        >
          Skip to content
        </a>,
        <div
          className="container"
          id="top"
        >
          <header
            className="mast_header"
          >
            <h1
              className="mast_title"
            >
              <a
                href="/"
              >
                Frank's Movie Log
              </a>
            </h1>
            <p
              className="mast_tagline"
            >
              My life at the movies.
            </p>
            <form
              acceptCharset="UTF-8"
              action="https://www.google.com/search"
              className="mast_search_form"
              method="get"
              role="search"
            >
              <label
                className="mast_search_wrap"
                htmlFor="search"
              >
                <div
                  className="sr_only"
                >
                  Search
                </div>
                <input
                  className="mast_search_input"
                  id="search"
                  name="q"
                  placeholder="Search..."
                  type="text"
                />
                <input
                  name="q"
                  type="hidden"
                  value="site:movielog.frankshowalter.com"
                />
                <button
                  aria-label="Search"
                  className="mast_search_submit"
                  type="submit"
                  value="Search"
                >
                  <svg
                    className="icon "
                    height="1em"
                    viewBox="0 0 16 16"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.442 10.442a1 1 0 011.415 0l3.85 3.85a1 1 0 01-1.414 1.415l-3.85-3.85a1 1 0 010-1.415z"
                      fillRule="evenodd"
                    />
                    <path
                      d="M6.5 12a5.5 5.5 0 100-11 5.5 5.5 0 000 11zM13 6.5a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z"
                      fillRule="evenodd"
                    />
                  </svg>
                </button>
              </label>
            </form>
            <nav
              className="mast_nav"
            >
              <ul
                className="mast_nav_list"
              >
                <li
                  className="mast_nav_list_item"
                >
                  <a
                    className="mast_nav_link"
                    href="/"
                  >
                    Home
                  </a>
                </li>
                <li
                  className="mast_nav_list_item"
                >
                  <a
                    className="mast_nav_link"
                    href="/about/"
                  >
                    About
                  </a>
                </li>
                <li
                  className="mast_nav_list_item"
                >
                  <a
                    className="mast_nav_link"
                    href="/how-i-grade/"
                  >
                    How I Grade
                  </a>
                </li>
                <li
                  className="mast_nav_list_item"
                >
                  <a
                    className="mast_nav_link"
                    href="/reviews/"
                  >
                    All Reviews
                  </a>
                </li>
                <li
                  className="mast_nav_list_item"
                >
                  <a
                    className="mast_nav_link"
                    href="/viewings/"
                  >
                    Viewing Log
                  </a>
                </li>
                <li
                  className="mast_nav_list_item"
                >
                  <a
                    className="mast_nav_link"
                    href="/watchlist/"
                  >
                    Watchlist
                  </a>
                </li>
              </ul>
            </nav>
          </header>
          <div
            className="children"
            id="content"
          >
            <main
              className="container"
            >
              <ol
                className="list"
              />
              <p
                className="info pagination"
              >
                Showing 
                1
                -
                1
                 of 
                1
                .
              </p>
            </main>
          </div>
          <footer
            className="footer"
          >
            <ul
              className="footer_nav_list"
            >
              <li
                className="footer_nav_list_item"
              >
                <a
                  href="/"
                >
                  Home
                </a>
              </li>
              <li
                className="footer_nav_list_item"
              >
                <a
                  href="/about/"
                >
                  About
                </a>
              </li>
              <li
                className="footer_nav_list_item"
              >
                <a
                  href="/how-i-grade/"
                >
                  How I Grade
                </a>
              </li>
              <li
                className="footer_nav_list_item"
              >
                <a
                  href="/reviews/"
                >
                  All Reviews
                </a>
              </li>
              <li
                className="footer_nav_list_item"
              >
                <a
                  href="/viewings/"
                >
                  Viewing Log
                </a>
              </li>
              <li
                className="footer_nav_list_item"
              >
                <a
                  href="/watchlist/"
                >
                  Watchlist
                </a>
              </li>
            </ul>
            <p
              className="footer_fair_use"
            >
              All stills used in accordance with the
               
              <a
                href="http://www.copyright.gov/title17/92chap1.html#107"
              >
                Fair Use Law.
              </a>
            </p>
            <div
              className="sr_only"
            >
              <a
                href="#top"
              >
                To the top ↑
              </a>
            </div>
          </footer>
        </div>,
      ]
    `);
  });
});
