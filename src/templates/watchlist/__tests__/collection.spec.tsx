// eslint-disable-next-line import/no-extraneous-dependencies
import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import WatchlistCollectionTemplate from "../collection";
import data, { dataNoAvatar } from "./__fixtures__/collection-page-queries";

describe("/watchlist/collections/{slug}", () => {
  it("renders", () => {
    const { asFragment } = render(<WatchlistCollectionTemplate data={data} />);

    expect(asFragment()).toMatchSnapshot();
  });

  it("raises an error if avatar is null", () => {
    // Even though the error is caught, it still gets printed to the console
    // so we mock that out to avoid the wall of red text.
    // https://github.com/facebook/jest/issues/5785
    const spy = jest.spyOn(console, "error");
    spy.mockImplementation(() => {
      // stub
    });

    expect(() => {
      render(<WatchlistCollectionTemplate data={dataNoAvatar} />);
    }).toThrow("No avatar found for Hammer Films.");

    spy.mockRestore();
  });

  // Helmet uses requestAnimationFrame to ensure DOM is synced.
  // https://github.com/nfl/react-helmet/blob/master/test/HelmetDeclarativeTest.js
  // eslint-disable-next-line jest/no-done-callback
  it("sets page title", (done) => {
    expect.hasAssertions();
    render(<WatchlistCollectionTemplate data={data} />);

    requestAnimationFrame(() => {
      expect(document.title).toStrictEqual("Hammer Films");
      done();
    });
  });

  it("can filter by title", async () => {
    expect.hasAssertions();
    render(<WatchlistCollectionTemplate data={data} />);

    act(() => {
      jest.useFakeTimers(); // For the debouced input
      userEvent.type(screen.getByLabelText("Title"), "Dracula");
      jest.runOnlyPendingTimers(); // Flush the delay
      jest.useRealTimers();
    });

    await waitFor(() => {
      expect(screen.getByTestId("movie-list")).toMatchSnapshot();
    });
  });

  it("can sort by title", () => {
    render(<WatchlistCollectionTemplate data={data} />);

    userEvent.selectOptions(screen.getByLabelText("Order By"), "Title");

    expect(screen.getByTestId("movie-list")).toMatchSnapshot();
  });

  it("can sort by release date with oldest first", () => {
    render(<WatchlistCollectionTemplate data={data} />);

    userEvent.selectOptions(
      screen.getByLabelText("Order By"),
      "Release Date (Oldest First)"
    );

    expect(screen.getByTestId("movie-list")).toMatchSnapshot();
  });

  it("can sort by release date with newest first", () => {
    render(<WatchlistCollectionTemplate data={data} />);

    userEvent.selectOptions(
      screen.getByLabelText("Order By"),
      "Release Date (Newest First)"
    );

    expect(screen.getByTestId("movie-list")).toMatchSnapshot();
  });

  it("can filter by release year", () => {
    render(<WatchlistCollectionTemplate data={data} />);

    const inputs = screen.getAllByLabelText("Release Year");

    userEvent.clear(inputs[0]);
    userEvent.type(inputs[0], "1967");
    userEvent.clear(inputs[1]);
    userEvent.type(inputs[1], "1970");

    expect(screen.getByTestId("movie-list")).toMatchSnapshot();
  });
});
