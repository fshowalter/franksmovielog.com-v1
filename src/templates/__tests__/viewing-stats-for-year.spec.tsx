// eslint-disable-next-line import/no-extraneous-dependencies
import { render } from "@testing-library/react";
import React from "react";
import ViewingStatsForYearTemplate from "../viewing-stats-for-year";
import data from "./__fixtures__/viewing-stats-for-year-page-queries";

jest.mock("../../components/Seo/Seo.tsx");

describe("/viewings/stats/{year}", () => {
  it("renders", () => {
    const { asFragment } = render(
      <ViewingStatsForYearTemplate
        data={data}
        pageContext={{ yearScope: "2020" }}
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
