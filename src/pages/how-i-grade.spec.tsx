// eslint-disable-next-line import/no-extraneous-dependencies
import { render } from "@testing-library/react";
import React from "react";
import HowIGradePage from "./how-i-grade";
import data from "./how-i-grade.fixtures";

describe("/how-i-grade", () => {
  it("renders", () => {
    const { asFragment } = render(<HowIGradePage data={data} />);

    expect(asFragment()).toMatchSnapshot();
  });

  // Helmet uses requestAnimationFrame to ensure DOM is synced.
  // https://github.com/nfl/react-helmet/blob/master/test/HelmetDeclarativeTest.js
  // eslint-disable-next-line jest/no-done-callback
  it("sets page title", (done) => {
    expect.hasAssertions();
    render(<HowIGradePage data={data} />);

    requestAnimationFrame(() => {
      expect(document.title).toStrictEqual("How I Grade");
      done();
    });
  });
});
