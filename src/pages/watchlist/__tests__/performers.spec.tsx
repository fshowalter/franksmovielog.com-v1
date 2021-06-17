// eslint-disable-next-line import/no-extraneous-dependencies
import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import WatchlistPerformersPage from "../performers";
import data from "./__fixtures__/performers-page-query";

jest.mock("../../../components/Seo/Seo.tsx");

describe("/watchlist/performers)", () => {
  it("renders", () => {
    const { asFragment } = render(<WatchlistPerformersPage data={data} />);

    expect(asFragment()).toMatchSnapshot();
  });

  // Helmet uses requestAnimationFrame to ensure DOM is synced.
  // https://github.com/nfl/react-helmet/blob/master/test/HelmetDeclarativeTest.js
  // eslint-disable-next-line jest/no-done-callback
  it("sets page title", (done) => {
    expect.hasAssertions();
    render(<WatchlistPerformersPage data={data} />);

    requestAnimationFrame(() => {
      expect(document.title).toStrictEqual("Watchlist Performers");
      done();
    });
  });

  it("can filter by name", async () => {
    expect.hasAssertions();
    render(<WatchlistPerformersPage data={data} />);

    act(() => {
      jest.useFakeTimers(); // For the debouced input
      userEvent.type(screen.getByLabelText("Name"), "William Powell");
      jest.runOnlyPendingTimers(); // Flush the delay
      jest.useRealTimers();
    });

    await waitFor(() => {
      expect(screen.getByTestId("performers-list")).toMatchSnapshot();
    });
  });

  it("can sort by name", () => {
    render(<WatchlistPerformersPage data={data} />);

    userEvent.selectOptions(screen.getByLabelText("Order By"), "Name");

    expect(screen.getByTestId("performers-list")).toMatchSnapshot();
  });

  it("can sort by review count", () => {
    render(<WatchlistPerformersPage data={data} />);

    userEvent.selectOptions(screen.getByLabelText("Order By"), "Review Count");

    expect(screen.getByTestId("performers-list")).toMatchSnapshot();
  });
});
