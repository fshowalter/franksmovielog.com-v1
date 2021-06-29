// eslint-disable-next-line import/no-extraneous-dependencies
import { act, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import WatchlistIndexPage from "./WatchlistIndexPage";
import data from "./WatchlistIndexPage.fixtures";

describe("/watchlist", () => {
  it("renders", () => {
    const { asFragment } = render(<WatchlistIndexPage data={data} />);

    expect(asFragment()).toMatchSnapshot();
  });

  // Helmet uses requestAnimationFrame to ensure DOM is synced.
  // https://github.com/nfl/react-helmet/blob/master/test/HelmetDeclarativeTest.js
  // eslint-disable-next-line jest/no-done-callback
  it("sets page title", (done) => {
    expect.hasAssertions();
    render(<WatchlistIndexPage data={data} />);

    requestAnimationFrame(() => {
      expect(document.title).toStrictEqual("Watchlist");
      done();
    });
  });

  it("can filter by title", async () => {
    expect.hasAssertions();
    render(<WatchlistIndexPage data={data} />);

    act(() => {
      jest.useFakeTimers(); // For the debouced input
      userEvent.type(screen.getByLabelText("Title"), "Lawyer Man");
      jest.runOnlyPendingTimers(); // Flush the delay
      jest.useRealTimers();
    });

    await waitFor(() => {
      expect(screen.getByTestId("watchlist-list")).toMatchSnapshot();
    });
  });

  it("can filter by not-found title", async () => {
    expect.hasAssertions();
    render(<WatchlistIndexPage data={data} />);

    act(() => {
      jest.useFakeTimers(); // For the debouced input
      userEvent.type(
        screen.getByLabelText("Title"),
        "This movie doesn't exist"
      );
      jest.runOnlyPendingTimers(); // Flush the delay
      jest.useRealTimers();
    });

    await waitFor(() => {
      expect(screen.getByTestId("watchlist-list")).toMatchSnapshot();
    });
  });

  it("can filter by director", () => {
    expect.hasAssertions();
    render(<WatchlistIndexPage data={data} />);

    userEvent.selectOptions(screen.getByLabelText("Director"), "Howard Hawks");

    expect(screen.getByTestId("watchlist-list")).toMatchSnapshot();
  });

  it("can filter by director then show all", () => {
    render(<WatchlistIndexPage data={data} />);

    userEvent.selectOptions(screen.getByLabelText("Director"), "Howard Hawks");
    userEvent.selectOptions(screen.getByLabelText("Director"), "All");

    expect(screen.getByTestId("watchlist-list")).toMatchSnapshot();
  });

  it("can filter by performer", () => {
    expect.hasAssertions();
    render(<WatchlistIndexPage data={data} />);

    userEvent.selectOptions(screen.getByLabelText("Performer"), "Bette Davis");

    expect(screen.getByTestId("watchlist-list")).toMatchSnapshot();
  });

  it("can filter by performer then show all", () => {
    render(<WatchlistIndexPage data={data} />);

    userEvent.selectOptions(screen.getByLabelText("Performer"), "Bette Davis");
    userEvent.selectOptions(screen.getByLabelText("Performer"), "All");

    expect(screen.getByTestId("watchlist-list")).toMatchSnapshot();
  });

  it("can filter by writer", () => {
    expect.hasAssertions();
    render(<WatchlistIndexPage data={data} />);

    userEvent.selectOptions(screen.getByLabelText("Writer"), "Clive Barker");

    expect(screen.getByTestId("watchlist-list")).toMatchSnapshot();
  });

  it("can filter by writer then show all", () => {
    render(<WatchlistIndexPage data={data} />);

    userEvent.selectOptions(screen.getByLabelText("Writer"), "Clive Barker");
    userEvent.selectOptions(screen.getByLabelText("Writer"), "All");

    expect(screen.getByTestId("watchlist-list")).toMatchSnapshot();
  });

  it("can filter by collection", () => {
    expect.hasAssertions();
    render(<WatchlistIndexPage data={data} />);

    userEvent.selectOptions(
      screen.getByLabelText("Collection"),
      "Hammer Films"
    );

    expect(screen.getByTestId("watchlist-list")).toMatchSnapshot();
  });

  it("can filter by collection then show all", () => {
    render(<WatchlistIndexPage data={data} />);

    userEvent.selectOptions(
      screen.getByLabelText("Collection"),
      "Hammer Films"
    );
    userEvent.selectOptions(screen.getByLabelText("Collection"), "All");

    expect(screen.getByTestId("watchlist-list")).toMatchSnapshot();
  });

  it("can sort by title", () => {
    render(<WatchlistIndexPage data={data} />);

    userEvent.selectOptions(screen.getByLabelText("Order By"), "Title");

    expect(screen.getByTestId("watchlist-list")).toMatchSnapshot();
  });

  it("can sort by release date with oldest first", () => {
    render(<WatchlistIndexPage data={data} />);

    userEvent.selectOptions(
      screen.getByLabelText("Order By"),
      "Release Date (Oldest First)"
    );

    expect(screen.getByTestId("watchlist-list")).toMatchSnapshot();
  });

  it("can sort by release date with newest first", () => {
    render(<WatchlistIndexPage data={data} />);

    userEvent.selectOptions(
      screen.getByLabelText("Order By"),
      "Release Date (Newest First)"
    );

    expect(screen.getByTestId("watchlist-list")).toMatchSnapshot();
  });

  it("can filter by release year", () => {
    render(<WatchlistIndexPage data={data} />);

    const fieldset = screen.getByRole("group", { name: "Release Year" });
    const fromInput = within(fieldset).getByLabelText("From");
    const toInput = within(fieldset).getByLabelText("To");

    userEvent.clear(fromInput);
    userEvent.type(fromInput, "1958");
    userEvent.clear(toInput);
    userEvent.type(toInput, "1978");

    expect(screen.getByTestId("watchlist-list")).toMatchSnapshot();
  });

  it("can hide reviewed titles", () => {
    render(<WatchlistIndexPage data={data} />);

    userEvent.click(screen.getByText("Hide Reviewed"));

    expect(screen.getByTestId("watchlist-list")).toMatchSnapshot();
  });

  it("can show hidden reviewed titles", () => {
    render(<WatchlistIndexPage data={data} />);

    userEvent.click(screen.getByText("Hide Reviewed"));
    userEvent.click(screen.getByText("Show Reviewed"));

    expect(screen.getByTestId("watchlist-list")).toMatchSnapshot();
  });

  it("can view more titles", () => {
    render(<WatchlistIndexPage data={data} />);

    userEvent.click(screen.getByText("Show More"));

    expect(screen.getByTestId("watchlist-list")).toMatchSnapshot();
  });
});
