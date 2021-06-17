// eslint-disable-next-line import/no-extraneous-dependencies
import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import WatchlistWritersPage from "../writers";
import data from "./__fixtures__/writers-page-query";

jest.mock("../../../components/Seo/Seo.tsx");

describe("/watchlist/writers)", () => {
  it("renders", () => {
    const { asFragment } = render(<WatchlistWritersPage data={data} />);

    expect(asFragment()).toMatchSnapshot();
  });

  // Helmet uses requestAnimationFrame to ensure DOM is synced.
  // https://github.com/nfl/react-helmet/blob/master/test/HelmetDeclarativeTest.js
  // eslint-disable-next-line jest/no-done-callback
  it("sets page title", (done) => {
    expect.hasAssertions();
    render(<WatchlistWritersPage data={data} />);

    requestAnimationFrame(() => {
      expect(document.title).toStrictEqual("Watchlist Writers");
      done();
    });
  });

  it("can filter by name", async () => {
    expect.hasAssertions();
    render(<WatchlistWritersPage data={data} />);

    act(() => {
      jest.useFakeTimers(); // For the debouced input
      userEvent.type(screen.getByLabelText("Name"), "Clive Barker");
      jest.runOnlyPendingTimers(); // Flush the delay
      jest.useRealTimers();
    });

    await waitFor(() => {
      expect(screen.getByTestId("writers-list")).toMatchSnapshot();
    });
  });

  it("can sort by name", () => {
    render(<WatchlistWritersPage data={data} />);

    userEvent.selectOptions(screen.getByLabelText("Order By"), "Name");

    expect(screen.getByTestId("writers-list")).toMatchSnapshot();
  });

  it("can sort by review count", () => {
    render(<WatchlistWritersPage data={data} />);

    userEvent.selectOptions(screen.getByLabelText("Order By"), "Review Count");

    expect(screen.getByTestId("writers-list")).toMatchSnapshot();
  });
});
