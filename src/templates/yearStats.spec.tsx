import { render } from "@testing-library/react";
import StatsForYearTemplate, { Head } from "./yearStats";
import { data } from "./yearStats.fixtures";

describe("/stats/{year}", () => {
  it("renders for legacy year", () => {
    const { asFragment } = render(
      <StatsForYearTemplate data={data} pageContext={{ year: "2021" }} />,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it("sets page title", () => {
    render(<Head pageContext={{ year: "2000" }} />);

    expect(document.title).toStrictEqual("2000 Stats");
  });

  it("renders for current year", () => {
    const thisYear = "2022";

    const { asFragment } = render(
      <StatsForYearTemplate data={data} pageContext={{ year: thisYear }} />,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
