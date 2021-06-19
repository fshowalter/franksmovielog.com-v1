// eslint-disable-next-line import/no-extraneous-dependencies
import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import WatchlistPage from "../watchlist";
import data from "./__fixtures__/watchlist-page-query";

jest.mock("../../components/Seo/Seo.tsx");

describe("/watchlist", () => {
  it("renders", () => {
    const { asFragment } = render(<WatchlistPage data={data} />);

    expect(asFragment()).toMatchSnapshot();
  });

  // Helmet uses requestAnimationFrame to ensure DOM is synced.
  // https://github.com/nfl/react-helmet/blob/master/test/HelmetDeclarativeTest.js
  // eslint-disable-next-line jest/no-done-callback
  it("sets page title", (done) => {
    expect.hasAssertions();
    render(<WatchlistPage data={data} />);

    requestAnimationFrame(() => {
      expect(document.title).toStrictEqual("Watchlist");
      done();
    });
  });

  it("can filter by title", async () => {
    expect.hasAssertions();
    render(<WatchlistPage data={data} />);

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

  it("can filter by director", () => {
    expect.hasAssertions();
    render(<WatchlistPage data={data} />);

    userEvent.selectOptions(screen.getByLabelText("Director"), "Howard Hawks");

    expect(screen.getByTestId("watchlist-list")).toMatchSnapshot();
  });

  it("can filter by director then show all", () => {
    render(<WatchlistPage data={data} />);

    userEvent.selectOptions(screen.getByLabelText("Director"), "Howard Hawks");
    userEvent.selectOptions(screen.getByLabelText("Director"), "All");

    expect(screen.getByTestId("watchlist-list")).toMatchSnapshot();
  });

  it("can filter by performer", () => {
    expect.hasAssertions();
    render(<WatchlistPage data={data} />);

    userEvent.selectOptions(screen.getByLabelText("Performer"), "Bette Davis");

    expect(screen.getByTestId("watchlist-list")).toMatchSnapshot();
  });

  it("can filter by performer then show all", () => {
    render(<WatchlistPage data={data} />);

    userEvent.selectOptions(screen.getByLabelText("Performer"), "Bette Davis");
    userEvent.selectOptions(screen.getByLabelText("Performer"), "All");

    expect(screen.getByTestId("watchlist-list")).toMatchSnapshot();
  });

  it("can filter by writer", () => {
    expect.hasAssertions();
    render(<WatchlistPage data={data} />);

    userEvent.selectOptions(screen.getByLabelText("Writer"), "Clive Barker");

    expect(screen.getByTestId("watchlist-list")).toMatchSnapshot();
  });

  it("can filter by writer then show all", () => {
    render(<WatchlistPage data={data} />);

    userEvent.selectOptions(screen.getByLabelText("Writer"), "Clive Barker");
    userEvent.selectOptions(screen.getByLabelText("Writer"), "All");

    expect(screen.getByTestId("watchlist-list")).toMatchSnapshot();
  });

  it("can filter by collection", () => {
    expect.hasAssertions();
    render(<WatchlistPage data={data} />);

    userEvent.selectOptions(
      screen.getByLabelText("Collection"),
      "Hammer Films"
    );

    expect(screen.getByTestId("watchlist-list")).toMatchSnapshot();
  });

  it("can filter by collection then show all", () => {
    render(<WatchlistPage data={data} />);

    userEvent.selectOptions(
      screen.getByLabelText("Collection"),
      "Hammer Films"
    );
    userEvent.selectOptions(screen.getByLabelText("Collection"), "All");

    expect(screen.getByTestId("watchlist-list")).toMatchSnapshot();
  });

  it("can sort by title", () => {
    render(<WatchlistPage data={data} />);

    userEvent.selectOptions(screen.getByLabelText("Order By"), "Title");

    expect(screen.getByTestId("watchlist-list")).toMatchSnapshot();
  });

  it("can sort by release date with oldest first", () => {
    render(<WatchlistPage data={data} />);

    userEvent.selectOptions(
      screen.getByLabelText("Order By"),
      "Release Date (Oldest First)"
    );

    expect(screen.getByTestId("watchlist-list")).toMatchSnapshot();
  });

  it("can sort by release date with newest first", () => {
    render(<WatchlistPage data={data} />);

    userEvent.selectOptions(
      screen.getByLabelText("Order By"),
      "Release Date (Newest First)"
    );

    expect(screen.getByTestId("watchlist-list")).toMatchSnapshot();
  });

  it("can filter by release year", () => {
    render(<WatchlistPage data={data} />);

    const inputs = screen.getAllByLabelText("Release Year");

    userEvent.clear(inputs[0]);
    userEvent.type(inputs[0], "1958");
    userEvent.clear(inputs[1]);
    userEvent.type(inputs[1], "1978");

    expect(screen.getByTestId("watchlist-list")).toMatchSnapshot();
  });

  it("can hide reviewed titles", () => {
    render(<WatchlistPage data={data} />);

    userEvent.click(screen.getByText("Hide Reviewed"));

    expect(screen.getByTestId("watchlist-list")).toMatchSnapshot();
  });

  it("can show hidden reviewed titles", () => {
    render(<WatchlistPage data={data} />);

    userEvent.click(screen.getByText("Hide Reviewed"));
    userEvent.click(screen.getByText("Show Reviewed"));

    expect(screen.getByTestId("watchlist-list")).toMatchSnapshot();
  });

  it("can view next page", () => {
    render(<WatchlistPage data={data} />);

    userEvent.click(screen.getByText("Next →"));

    expect(screen.getByTestId("watchlist-list")).toMatchSnapshot();
  });
});
