// eslint-disable-next-line import/no-extraneous-dependencies
import {
  createHistory,
  createMemorySource,
  LocationProvider,
} from "@gatsbyjs/reach-router";
import { render } from "@testing-library/react";
import { useStaticQuery } from "gatsby";
import React from "react";
import Seo from "./Seo";

const source = createMemorySource("test");
const history = createHistory(source);

describe("Seo", () => {
  beforeEach(() => {
    (useStaticQuery as jest.Mock).mockImplementationOnce(() => ({
      site: {
        siteMetadata: {
          siteTitle: "Frank's Movie Log",
          siteUrl: "https://www.franksmovielog.com/",
          siteImage: "assets/default_og.jpg",
        },
      },
    }));
  });

  // Helmet uses requestAnimationFrame to ensure DOM is synced.
  // https://github.com/nfl/react-helmet/blob/master/test/HelmetDeclarativeTest.js
  // eslint-disable-next-line jest/no-done-callback
  it("sets meta", (done) => {
    expect.hasAssertions();
    render(
      <>
        <LocationProvider history={history}>
          <Seo pageTitle="Test Page" description="A generic description." />
        </LocationProvider>
        <div>Test</div>
      </>
    );

    requestAnimationFrame(() => {
      expect(document.head).toMatchInlineSnapshot(`
        <head>
          <title>
            Test Page | Frank's Movie Log
          </title>
          <meta
            content="A generic description."
            data-react-helmet="true"
            name="description"
          />
          <meta
            content="https://www.franksmovielog.com/assets/default_og.jpg"
            data-react-helmet="true"
            name="og:image"
          />
          <meta
            content="https://www.franksmovielog.com/test"
            data-react-helmet="true"
            property="og:url"
          />
          <meta
            content="Test Page | Frank's Movie Log"
            data-react-helmet="true"
            property="og:title"
          />
          <meta
            content="A generic description."
            data-react-helmet="true"
            property="og:description"
          />
        </head>
      `);

      done();
    });
  });

  // Helmet uses requestAnimationFrame to ensure DOM is synced.
  // https://github.com/nfl/react-helmet/blob/master/test/HelmetDeclarativeTest.js
  // eslint-disable-next-line jest/no-done-callback
  it("sets meta for articles", (done) => {
    expect.hasAssertions();
    render(
      <>
        <LocationProvider history={history}>
          <Seo
            pageTitle="Test Page"
            description="A generic description."
            article
          />
        </LocationProvider>
        <div>Test</div>
      </>
    );

    requestAnimationFrame(() => {
      expect(document.head).toMatchInlineSnapshot(`
          <head>
            <title>
              Test Page | Frank's Movie Log
            </title>
            <meta
              content="A generic description."
              data-react-helmet="true"
              name="description"
            />
            <meta
              content="https://www.franksmovielog.com/assets/default_og.jpg"
              data-react-helmet="true"
              name="og:image"
            />
            <meta
              content="https://www.franksmovielog.com/test"
              data-react-helmet="true"
              property="og:url"
            />
            <meta
              content="article"
              data-react-helmet="true"
              property="og:type"
            />
            <meta
              content="Test Page | Frank's Movie Log"
              data-react-helmet="true"
              property="og:title"
            />
            <meta
              content="A generic description."
              data-react-helmet="true"
              property="og:description"
            />
          </head>
        `);

      done();
    });
  });

  // Helmet uses requestAnimationFrame to ensure DOM is synced.
  // https://github.com/nfl/react-helmet/blob/master/test/HelmetDeclarativeTest.js
  // eslint-disable-next-line jest/no-done-callback
  it("does not set sub-title on root", (done) => {
    expect.hasAssertions();
    render(
      <>
        <LocationProvider history={history}>
          <Seo
            pageTitle="Frank's Movie Log"
            description="A generic description."
            article
          />
        </LocationProvider>
        <div>Test</div>
      </>
    );

    requestAnimationFrame(() => {
      expect(document.title).toStrictEqual("Frank's Movie Log");
      done();
    });
  });
});
