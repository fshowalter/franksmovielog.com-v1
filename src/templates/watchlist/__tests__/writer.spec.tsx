// eslint-disable-next-line import/no-extraneous-dependencies
import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import WatchlistWriterTemplate from "../writer";
import data, { dataNoAvatar } from "./__fixtures__/writer-page-queries";

describe("/watchlist/writers/{slug}", () => {
  it("renders", () => {
    const { asFragment } = render(<WatchlistWriterTemplate data={data} />);

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
      render(<WatchlistWriterTemplate data={dataNoAvatar} />);
    }).toThrow("No avatar found for Clive Barker.");

    spy.mockRestore();
  });

  // Helmet uses requestAnimationFrame to ensure DOM is synced.
  // https://github.com/nfl/react-helmet/blob/master/test/HelmetDeclarativeTest.js
  // eslint-disable-next-line jest/no-done-callback
  it("sets page title", (done) => {
    expect.hasAssertions();
    render(<WatchlistWriterTemplate data={data} />);

    requestAnimationFrame(() => {
      expect(document.title).toStrictEqual("Clive Barker");
      done();
    });
  });

  it("can filter by title", async () => {
    expect.hasAssertions();
    render(<WatchlistWriterTemplate data={data} />);

    act(() => {
      jest.useFakeTimers(); // For the debouced input
      userEvent.type(screen.getByLabelText("Title"), "Hellraiser");
      jest.runOnlyPendingTimers(); // Flush the delay
      jest.useRealTimers();
    });

    await waitFor(() => {
      expect(screen.getByTestId("movie-list")).toMatchSnapshot();
    });
  });

  it("can sort by title", () => {
    render(<WatchlistWriterTemplate data={data} />);

    userEvent.selectOptions(screen.getByLabelText("Order By"), "Title");

    expect(screen.getByTestId("movie-list")).toMatchSnapshot();
  });

  it("can sort by release date with oldest first", () => {
    render(<WatchlistWriterTemplate data={data} />);

    userEvent.selectOptions(
      screen.getByLabelText("Order By"),
      "Release Date (Oldest First)"
    );

    expect(screen.getByTestId("movie-list")).toMatchSnapshot();
  });

  it("can sort by release date with newest first", () => {
    render(<WatchlistWriterTemplate data={data} />);

    userEvent.selectOptions(
      screen.getByLabelText("Order By"),
      "Release Date (Newest First)"
    );

    expect(screen.getByTestId("movie-list")).toMatchSnapshot();
  });

  it("can filter by release year", () => {
    render(<WatchlistWriterTemplate data={data} />);

    const inputs = screen.getAllByLabelText("Release Year");

    userEvent.clear(inputs[0]);
    userEvent.type(inputs[0], "1987");
    userEvent.clear(inputs[1]);
    userEvent.type(inputs[1], "1990");

    expect(screen.getByTestId("movie-list")).toMatchSnapshot();
  });
});
