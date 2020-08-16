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

    expect(tree).toMatchInlineSnapshot(`
      Array [
        <a
          href="#content"
        >
          Skip to content
        </a>,
        <div>
          <div
            id="top"
          >
            <div>
              <header>
                <div>
                  <h1>
                    <a
                      href="/"
                    >
                      Frank's Movie Log
                    </a>
                  </h1>
                  <p>
                    My life at the movies.
                  </p>
                </div>
                <form
                  acceptCharset="UTF-8"
                  action="https://www.google.com/search"
                  method="get"
                  role="search"
                >
                  <label
                    htmlFor="search"
                  >
                    <span>
                      Search
                    </span>
                    <input
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
                      type="submit"
                      value="Search"
                    >
                      <svg
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
              </header>
              <nav>
                <ul>
                  <li>
                    <a
                      href="/"
                    >
                      Home
                    </a>
                  </li>
                  <li>
                    <a
                      href="/about/"
                    >
                      About
                    </a>
                  </li>
                  <li>
                    <a
                      href="/how-i-grade/"
                    >
                      How I Grade
                    </a>
                  </li>
                  <li>
                    <a
                      href="/reviews/"
                    >
                      All Reviews
                    </a>
                  </li>
                  <li>
                    <a
                      href="/viewings/"
                    >
                      Viewing Log
                    </a>
                  </li>
                  <li>
                    <a
                      href="/watchlist/"
                    >
                      Watchlist
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
            <div
              id="content"
            >
              <main>
                <ol />
                <p>
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
          </div>
          <footer>
            <ul>
              <li>
                <a
                  href="/"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/about/"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="/how-i-grade/"
                >
                  How I Grade
                </a>
              </li>
              <li>
                <a
                  href="/reviews/"
                >
                  All Reviews
                </a>
              </li>
              <li>
                <a
                  href="/viewings/"
                >
                  Viewing Log
                </a>
              </li>
              <li>
                <a
                  href="/watchlist/"
                >
                  Watchlist
                </a>
              </li>
            </ul>
            <p>
              All stills used in accordance with the
               
              <a
                href="http://www.copyright.gov/title17/92chap1.html#107"
              >
                Fair Use Law.
              </a>
            </p>
            <a
              href="#top"
            >
              To the top ↑
            </a>
          </footer>
        </div>,
      ]
    `);
  });
});
