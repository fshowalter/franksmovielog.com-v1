// eslint-disable-next-line import/no-extraneous-dependencies
import { render } from "@testing-library/react";
import React from "react";
import AboutPage from "./about";
import data from "./about.fixtures";

describe("/about", () => {
  it("renders", () => {
    const { asFragment } = render(<AboutPage data={data} />);

    expect(asFragment()).toMatchSnapshot();
  });

  // Helmet uses requestAnimationFrame to ensure DOM is synced.
  // https://github.com/nfl/react-helmet/blob/master/test/HelmetDeclarativeTest.js
  // eslint-disable-next-line jest/no-done-callback
  it("sets page title", (done) => {
    expect.hasAssertions();
    render(<AboutPage data={data} />);

    requestAnimationFrame(() => {
      expect(document.title).toStrictEqual("About");
      done();
    });
  });
});
