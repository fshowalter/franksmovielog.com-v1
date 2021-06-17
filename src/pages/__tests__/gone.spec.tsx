// eslint-disable-next-line import/no-extraneous-dependencies
import { render } from "@testing-library/react";
import React from "react";
import GonePage from "../gone";
import data from "./__fixtures__/gone-page-query";

jest.mock("../../components/Seo/Seo.tsx");

describe("/gone", () => {
  it("renders", () => {
    const { asFragment } = render(<GonePage data={data} />);

    expect(asFragment()).toMatchSnapshot();
  });

  // Helmet uses requestAnimationFrame to ensure DOM is synced.
  // https://github.com/nfl/react-helmet/blob/master/test/HelmetDeclarativeTest.js
  // eslint-disable-next-line jest/no-done-callback
  it("sets page title", (done) => {
    expect.hasAssertions();
    render(<GonePage data={data} />);

    requestAnimationFrame(() => {
      expect(document.title).toStrictEqual("410: Gone");
      done();
    });
  });
});
