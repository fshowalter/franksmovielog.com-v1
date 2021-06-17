// eslint-disable-next-line import/no-extraneous-dependencies
import { render } from "@testing-library/react";
import React from "react";
import NotFoundPage from "../404";
import data from "./__fixtures__/404-page-query";

jest.mock("../../components/Seo/Seo.tsx");

describe("/404", () => {
  it("renders", () => {
    const { asFragment } = render(<NotFoundPage data={data} />);

    expect(asFragment()).toMatchSnapshot();
  });

  // Helmet uses requestAnimationFrame to ensure DOM is synced.
  // https://github.com/nfl/react-helmet/blob/master/test/HelmetDeclarativeTest.js
  // eslint-disable-next-line jest/no-done-callback
  it("sets page title", (done) => {
    expect.hasAssertions();
    render(<NotFoundPage data={data} />);

    requestAnimationFrame(() => {
      expect(document.title).toStrictEqual("404: Not Found");
      done();
    });
  });
});
