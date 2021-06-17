// eslint-disable-next-line import/no-extraneous-dependencies
import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import WatchlistDirectorsPage from "../directors";
import data from "./__fixtures__/directors-page-query";

jest.mock("../../../components/Seo/Seo.tsx");

describe("/watchlist/directors)", () => {
  it("renders", () => {
    const { asFragment } = render(<WatchlistDirectorsPage data={data} />);

    expect(asFragment()).toMatchSnapshot();
  });

  // Helmet uses requestAnimationFrame to ensure DOM is synced.
  // https://github.com/nfl/react-helmet/blob/master/test/HelmetDeclarativeTest.js
  // eslint-disable-next-line jest/no-done-callback
  it("sets page title", (done) => {
    expect.hasAssertions();
    render(<WatchlistDirectorsPage data={data} />);

    requestAnimationFrame(() => {
      expect(document.title).toStrictEqual("Watchlist Directors");
      done();
    });
  });

  it("can filter by name", async () => {
    expect.hasAssertions();
    render(<WatchlistDirectorsPage data={data} />);

    act(() => {
      jest.useFakeTimers(); // For the debouced input
      userEvent.type(screen.getByLabelText("Name"), "Dario Argento");
      jest.runOnlyPendingTimers(); // Flush the delay
      jest.useRealTimers();
    });

    await waitFor(() => {
      expect(screen.getByTestId("directors-list")).toMatchSnapshot();
    });
  });

  it("can sort by name", () => {
    render(<WatchlistDirectorsPage data={data} />);

    userEvent.selectOptions(screen.getByLabelText("Order By"), "Name");

    expect(screen.getByTestId("directors-list")).toMatchSnapshot();
  });

  it("can sort by review count", () => {
    render(<WatchlistDirectorsPage data={data} />);

    userEvent.selectOptions(screen.getByLabelText("Order By"), "Review Count");

    expect(screen.getByTestId("directors-list")).toMatchSnapshot();
  });
});
