import { act, render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import WatchlistWritersPage, { Head } from "./writers";
import { data } from "./writers.fixtures";

describe("/watchlist/performers/", () => {
  it("can filter by name", async () => {
    expect.hasAssertions();

    render(<WatchlistWritersPage data={data} />);

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      await userEvent.type(screen.getByLabelText("Name"), "Raymond Chandler");
      await new Promise((r) => setTimeout(r, 500));
    });

    expect(screen.getByTestId("entity-list")).toMatchSnapshot();
  });

  it("can sort by name desc", async () => {
    expect.hasAssertions();

    render(<WatchlistWritersPage data={data} />);

    await userEvent.selectOptions(
      screen.getByLabelText("Order By"),
      "Name (Z → A)",
    );

    expect(screen.getByTestId("entity-list")).toMatchSnapshot();
  });

  it("can sort by name asc", async () => {
    expect.hasAssertions();

    render(<WatchlistWritersPage data={data} />);

    await userEvent.selectOptions(
      screen.getByLabelText("Order By"),
      "Name (A → Z)",
    );

    expect(screen.getByTestId("entity-list")).toMatchSnapshot();
  });

  it("can sort by title count desc", async () => {
    expect.hasAssertions();

    render(<WatchlistWritersPage data={data} />);

    await userEvent.selectOptions(
      screen.getByLabelText("Order By"),
      "Title Count (Most First)",
    );

    expect(screen.getByTestId("entity-list")).toMatchSnapshot();
  });

  it("can sort by title count asc", async () => {
    expect.hasAssertions();

    render(<WatchlistWritersPage data={data} />);

    await userEvent.selectOptions(
      screen.getByLabelText("Order By"),
      "Title Count (Fewest First)",
    );

    expect(screen.getByTestId("entity-list")).toMatchSnapshot();
  });

  it("can sort by review count desc", async () => {
    expect.hasAssertions();

    render(<WatchlistWritersPage data={data} />);

    await userEvent.selectOptions(
      screen.getByLabelText("Order By"),
      "Review Count (Most First)",
    );

    expect(screen.getByTestId("entity-list")).toMatchSnapshot();
  });

  it("can sort by review count asc", async () => {
    expect.hasAssertions();

    render(<WatchlistWritersPage data={data} />);

    await userEvent.selectOptions(
      screen.getByLabelText("Order By"),
      "Review Count (Fewest First)",
    );

    expect(screen.getByTestId("entity-list")).toMatchSnapshot();
  });

  it("sets page title", () => {
    render(<Head />);

    expect(document.title).toStrictEqual("Watchlist Writers");
  });
});
