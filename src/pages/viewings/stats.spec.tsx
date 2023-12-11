import { render } from "@testing-library/react";
import AllTimeStatsPage, { Head } from "./stats";
import { data } from "./stats.fixtures";

describe("/viewings/stats/", () => {
  it("sets page title", () => {
    render(<Head />);

    expect(document.title).toStrictEqual("All-Time Stats");
  });

  it("renders all-time stats", () => {
    const { asFragment } = render(<AllTimeStatsPage data={data} />);

    expect(asFragment()).toMatchSnapshot();
  });
});
