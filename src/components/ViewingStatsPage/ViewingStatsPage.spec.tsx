// eslint-disable-next-line import/no-extraneous-dependencies
import { render } from "@testing-library/react";
import React from "react";
import ViewingStatsPage from "./ViewingStatsPage";
import data from "./ViewingStatsPage.fixtures";

describe("/viewings/stats/{year}", () => {
  it("renders for legacy year", () => {
    const { asFragment } = render(
      <ViewingStatsPage data={data} pageContext={{ yearScope: "2020" }} />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it("renders for current year", () => {
    const thisYear = new Date().getFullYear().toString();

    const { asFragment } = render(
      <ViewingStatsPage data={data} pageContext={{ yearScope: thisYear }} />
    );

    expect(asFragment()).toMatchSnapshot();
  });
});

describe("/viewings/stats/", () => {
  it("renders all-time", () => {
    const { asFragment } = render(
      <ViewingStatsPage data={data} pageContext={{ yearScope: "all" }} />
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
