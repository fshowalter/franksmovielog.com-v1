import { render } from "@testing-library/react";
import ProgressPage, { Head } from "./progress";
import { data } from "./progress.fixtures";

describe("/watchlist/progress/", () => {
  it("sets page title", () => {
    render(<Head />);

    expect(document.title).toStrictEqual("Watchlist Progress");
  });

  it("renders watchlist progress", () => {
    const { asFragment } = render(<ProgressPage data={data} />);

    expect(asFragment()).toMatchSnapshot();
  });
});
