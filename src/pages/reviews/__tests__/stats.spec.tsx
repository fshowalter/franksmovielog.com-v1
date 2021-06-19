// eslint-disable-next-line import/no-extraneous-dependencies
import { render } from "@testing-library/react";
import React from "react";
import ReviewsStatsPage from "../stats";
import data from "./__fixtures__/stats-page-queries";

jest.mock("../../../components/Seo/Seo.tsx");

describe("/reviews/stats", () => {
  it("renders", () => {
    const { asFragment } = render(<ReviewsStatsPage data={data} />);

    expect(asFragment()).toMatchSnapshot();
  });
});
