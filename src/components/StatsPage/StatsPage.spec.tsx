// eslint-disable-next-line import/no-extraneous-dependencies
import { render } from "@testing-library/react";
import StatsPage from "./StatsPage";
import { data } from "./StatsPage.fixtures";

describe("/stats/{year}", () => {
  it("renders for legacy year", () => {
    const { asFragment } = render(
      <StatsPage data={data} pageContext={{ yearScope: "2020" }} />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it("renders for current year", () => {
    const thisYear = "2021";

    const { asFragment } = render(
      <StatsPage data={data} pageContext={{ yearScope: thisYear }} />
    );

    expect(asFragment()).toMatchSnapshot();
  });
});

describe("/stats/", () => {
  it("renders all-time", () => {
    const { asFragment } = render(
      <StatsPage data={data} pageContext={{ yearScope: "all" }} />
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
