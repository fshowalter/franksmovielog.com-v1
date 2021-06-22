// eslint-disable-next-line import/no-extraneous-dependencies
import { render } from "@testing-library/react";
import React from "react";
import ReviewsStatsForYear from "./ForYear";
import data from "./ForYear.fixtures";

describe("/reviews/stats/{year}", () => {
  it("renders for legacy year", () => {
    const { asFragment } = render(
      <ReviewsStatsForYear data={data} pageContext={{ yearScope: "2020" }} />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it("renders for current year", () => {
    const thisYear = new Date().getFullYear().toString();

    const { asFragment } = render(
      <ReviewsStatsForYear data={data} pageContext={{ yearScope: thisYear }} />
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
