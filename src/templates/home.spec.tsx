import {
  createHistory,
  createMemorySource,
  LocationProvider,
} from "@reach/router"; // eslint-disable-line import/no-extraneous-dependencies
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
  update: {
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
          className="skipLinkCss"
          href="#content"
        >
          Skip to content
        </a>,
        <div
          className="containerCss"
          id="top"
        >
          <header
            className="mastHeaderCss"
          >
            <h1
              className="mastTitleCss"
            >
              <a
                href="/"
              >
                Frank's Movie Log
              </a>
            </h1>
            <p
              className="mastTaglineCss"
            >
              My life at the movies.
            </p>
            <form
              acceptCharset="UTF-8"
              action="https://www.google.com/search"
              className="mastSearchFormCss"
              method="get"
              role="search"
            >
              <label
                className="mastSearchWrapCss"
                htmlFor="search"
              >
                <div
                  className="srOnlyCss"
                >
                  Search
                </div>
                <input
                  className="mastSearchInputCss"
                  id="search"
                  name="q"
                  placeholder="Search..."
                  type="text"
                />
                <input
                  name="q"
                  type="hidden"
                  value="site:www.franksmovielog.com"
                />
                <button
                  aria-label="Search"
                  className="mastSearchSubmitCss"
                  type="submit"
                  value="Search"
                >
                  <svg
                    className="iconCss "
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
              className="mastNavCss"
            >
              <ul
                className="mastNavListCss"
              >
                <li
                  className="mastNavListItemCss"
                >
                  <a
                    className="mastNavLinkCss"
                    href="/"
                  >
                    Home
                  </a>
                </li>
                <li
                  className="mastNavListItemCss"
                >
                  <a
                    className="mastNavLinkCss"
                    href="/about/"
                  >
                    About
                  </a>
                </li>
                <li
                  className="mastNavListItemCss"
                >
                  <a
                    className="mastNavLinkCss"
                    href="/how-i-grade/"
                  >
                    How I Grade
                  </a>
                </li>
                <li
                  className="mastNavListItemCss"
                >
                  <a
                    className="mastNavLinkCss"
                    href="/reviews/"
                  >
                    All Reviews
                  </a>
                </li>
                <li
                  className="mastNavListItemCss"
                >
                  <a
                    className="mastNavLinkCss"
                    href="/viewings/"
                  >
                    Viewing Log
                  </a>
                </li>
                <li
                  className="mastNavListItemCss"
                >
                  <a
                    className="mastNavLinkCss"
                    href="/watchlist/"
                  >
                    Watchlist
                  </a>
                </li>
              </ul>
            </nav>
          </header>
          <div
            className="childrenCss"
            id="content"
          >
            <main
              className="containerCss"
            >
              <ol
                className="listCss"
              />
              <p
                className="infoCss paginationCss"
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
            className="footerCss"
          >
            <ul
              className="footerNavListCss"
            >
              <li
                className="footerNavListItemCss"
              >
                <a
                  href="/"
                >
                  Home
                </a>
              </li>
              <li
                className="footerNavListItemCss"
              >
                <a
                  href="/about/"
                >
                  About
                </a>
              </li>
              <li
                className="footerNavListItemCss"
              >
                <a
                  href="/how-i-grade/"
                >
                  How I Grade
                </a>
              </li>
              <li
                className="footerNavListItemCss"
              >
                <a
                  href="/reviews/"
                >
                  All Reviews
                </a>
              </li>
              <li
                className="footerNavListItemCss"
              >
                <a
                  href="/viewings/"
                >
                  Viewing Log
                </a>
              </li>
              <li
                className="footerNavListItemCss"
              >
                <a
                  href="/watchlist/"
                >
                  Watchlist
                </a>
              </li>
            </ul>
            <p
              className="footerFairUseCss"
            >
              All stills used in accordance with the
               
              <a
                href="http://www.copyright.gov/title17/92chap1.html#107"
              >
                Fair Use Law.
              </a>
            </p>
            <div
              className="srOnlyCss"
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
