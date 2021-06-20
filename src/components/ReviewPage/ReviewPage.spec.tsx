// eslint-disable-next-line import/no-extraneous-dependencies
import { render } from "@testing-library/react";
import React from "react";
import ReviewPage from "./ReviewPage";
import data, { dataWithCollectionAndCountries } from "./ReviewPage.fixtures";

describe("/reviews/{slug}", () => {
  it("renders", () => {
    const { asFragment } = render(<ReviewPage data={data} />);

    expect(asFragment()).toMatchSnapshot();
  });

  it("renders with multiple countries and a collection", () => {
    const { asFragment } = render(
      <ReviewPage data={dataWithCollectionAndCountries} />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  // Helmet uses requestAnimationFrame to ensure DOM is synced.
  // https://github.com/nfl/react-helmet/blob/master/test/HelmetDeclarativeTest.js
  // eslint-disable-next-line jest/no-done-callback
  it("sets page title", (done) => {
    expect.hasAssertions();
    render(<ReviewPage data={data} />);

    requestAnimationFrame(() => {
      expect(document.title).toStrictEqual("Rio Bravo (1959)");
      done();
    });
  });
});
