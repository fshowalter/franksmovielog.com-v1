// eslint-disable-next-line import/no-extraneous-dependencies
import { act, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import WatchlistEntityPage, { EntityType } from "./WatchlistEntityPage";
import data, { dataNoAvatar } from "./WatchlistEntityPage.fixtures";

describe("/watchlist/directors/{slug}", () => {
  it("renders", () => {
    const { asFragment } = render(
      <WatchlistEntityPage
        data={data}
        pageContext={{ entityType: EntityType.DIRECTOR }}
      />
    );

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
      render(
        <WatchlistEntityPage
          data={dataNoAvatar}
          pageContext={{ entityType: EntityType.DIRECTOR }}
        />
      );
    }).toThrow("No avatar found for John Carpenter.");

    spy.mockRestore();
  });

  // Helmet uses requestAnimationFrame to ensure DOM is synced.
  // https://github.com/nfl/react-helmet/blob/master/test/HelmetDeclarativeTest.js
  // eslint-disable-next-line jest/no-done-callback
  it("sets page title", (done) => {
    expect.hasAssertions();
    render(
      <WatchlistEntityPage
        data={data}
        pageContext={{ entityType: EntityType.DIRECTOR }}
      />
    );

    requestAnimationFrame(() => {
      expect(document.title).toStrictEqual("John Carpenter");
      done();
    });
  });

  it("can filter by title", async () => {
    expect.hasAssertions();
    render(
      <WatchlistEntityPage
        data={data}
        pageContext={{ entityType: EntityType.DIRECTOR }}
      />
    );

    act(() => {
      jest.useFakeTimers(); // For the debouced input
      userEvent.type(screen.getByLabelText("Title"), "Halloween");
      jest.runOnlyPendingTimers(); // Flush the delay
      jest.useRealTimers();
    });

    await waitFor(() => {
      expect(screen.getByTestId("movie-list")).toMatchSnapshot();
    });
  });

  it("can sort by title", () => {
    render(
      <WatchlistEntityPage
        data={data}
        pageContext={{ entityType: EntityType.DIRECTOR }}
      />
    );

    userEvent.selectOptions(screen.getByLabelText("Order By"), "Title");

    expect(screen.getByTestId("movie-list")).toMatchSnapshot();
  });

  it("can sort by release date with oldest first", () => {
    render(
      <WatchlistEntityPage
        data={data}
        pageContext={{ entityType: EntityType.DIRECTOR }}
      />
    );

    userEvent.selectOptions(
      screen.getByLabelText("Order By"),
      "Release Date (Oldest First)"
    );

    expect(screen.getByTestId("movie-list")).toMatchSnapshot();
  });

  it("can sort by release date with newest first", () => {
    render(
      <WatchlistEntityPage
        data={data}
        pageContext={{ entityType: EntityType.DIRECTOR }}
      />
    );

    userEvent.selectOptions(
      screen.getByLabelText("Order By"),
      "Release Date (Newest First)"
    );

    expect(screen.getByTestId("movie-list")).toMatchSnapshot();
  });

  it("can filter by release year", () => {
    render(
      <WatchlistEntityPage
        data={data}
        pageContext={{ entityType: EntityType.DIRECTOR }}
      />
    );

    const fieldset = screen.getByRole("group", { name: "Release Year" });
    const fromInput = within(fieldset).getByLabelText("From");
    const toInput = within(fieldset).getByLabelText("To");

    userEvent.clear(fromInput);
    userEvent.type(fromInput, "1980");
    userEvent.clear(toInput);
    userEvent.type(toInput, "1990");

    expect(screen.getByTestId("movie-list")).toMatchSnapshot();
  });
});

describe("/watchlist/performers/{slug}", () => {
  it("renders", () => {
    const { asFragment } = render(
      <WatchlistEntityPage
        data={data}
        pageContext={{ entityType: EntityType.PERFORMER }}
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });
});

describe("/watchlist/writers/{slug}", () => {
  it("renders", () => {
    const { asFragment } = render(
      <WatchlistEntityPage
        data={data}
        pageContext={{ entityType: EntityType.WRITER }}
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });
});

describe("/watchlist/collections/{slug}", () => {
  it("renders", () => {
    const { asFragment } = render(
      <WatchlistEntityPage
        data={data}
        pageContext={{ entityType: EntityType.COLLECTION }}
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
