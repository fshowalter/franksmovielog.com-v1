// eslint-disable-next-line import/no-extraneous-dependencies
import { render } from "@testing-library/react";
import React from "react";
import AllReviewStatsPage from "./AllTime";
import data from "./AllTime.fixtures";

describe("/reviews/stats", () => {
  it("renders", () => {
    const { asFragment } = render(<AllReviewStatsPage data={data} />);

    expect(asFragment()).toMatchSnapshot();
  });
});
