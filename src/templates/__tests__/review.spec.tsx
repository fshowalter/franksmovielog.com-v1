// eslint-disable-next-line import/no-extraneous-dependencies
import { render } from "@testing-library/react";
import React from "react";
import WatchlistCollectionTemplate from "../review";
import data from "./__fixtures__/review-page-queries";

describe("/reviews/{slug}", () => {
  it("renders", () => {
    const { asFragment } = render(<WatchlistCollectionTemplate data={data} />);

    expect(asFragment()).toMatchSnapshot();
  });

  // Helmet uses requestAnimationFrame to ensure DOM is synced.
  // https://github.com/nfl/react-helmet/blob/master/test/HelmetDeclarativeTest.js
  // eslint-disable-next-line jest/no-done-callback
  it("sets page title", (done) => {
    expect.hasAssertions();
    render(<WatchlistCollectionTemplate data={data} />);

    requestAnimationFrame(() => {
      expect(document.title).toStrictEqual("Rio Bravo (1959)");
      done();
    });
  });
});
