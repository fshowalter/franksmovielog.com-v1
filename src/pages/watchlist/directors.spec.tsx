import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import WatchlistDirectorsPage, { Head } from "./directors";
import { data } from "./directors.fixtures";

describe("/watchlist/directors", () => {
  it("can filter by name", async () => {
    expect.hasAssertions();

    render(<WatchlistDirectorsPage data={data} />);

    await act(async () => {
      await userEvent.type(screen.getByLabelText("Name"), "Dario Argento");
      await new Promise((r) => setTimeout(r, 500));
    });

    expect(screen.getByTestId("entity-list")).toMatchSnapshot();
  });

  it("can sort by name", async () => {
    expect.hasAssertions();

    render(<WatchlistDirectorsPage data={data} />);

    await userEvent.selectOptions(screen.getByLabelText("Order By"), "Name");

    expect(screen.getByTestId("entity-list")).toMatchSnapshot();
  });

  it("can sort by review count", async () => {
    expect.hasAssertions();

    render(<WatchlistDirectorsPage data={data} />);

    await userEvent.selectOptions(
      screen.getByLabelText("Order By"),
      "Review Count"
    );

    expect(screen.getByTestId("entity-list")).toMatchSnapshot();
  });

  it("sets page title", () => {
    render(<Head />);

    expect(document.title).toStrictEqual("Watchlist Directors");
  });
});
