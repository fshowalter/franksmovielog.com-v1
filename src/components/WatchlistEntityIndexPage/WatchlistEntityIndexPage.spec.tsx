// eslint-disable-next-line import/no-extraneous-dependencies
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import WatchlistEntityIndexPage, {
  EntityType,
} from "./WatchlistEntityIndexPage";
import data from "./WatchlistEntityIndexPage.fixtures";

describe("/watchlist/{entityType}/", () => {
  it("can filter by name", async () => {
    expect.hasAssertions();

    render(
      <WatchlistEntityIndexPage
        data={data}
        pageContext={{ entityType: EntityType.DIRECTOR }}
      />
    );

    await act(async () => {
      await userEvent.type(screen.getByLabelText("Name"), "Dario Argento");
      await new Promise((r) => setTimeout(r, 500));
    });

    expect(screen.getByTestId("entity-list")).toMatchSnapshot();
  });

  it("can sort by name", async () => {
    expect.hasAssertions();

    render(
      <WatchlistEntityIndexPage
        data={data}
        pageContext={{ entityType: EntityType.DIRECTOR }}
      />
    );

    await userEvent.selectOptions(screen.getByLabelText("Order By"), "Name");

    expect(screen.getByTestId("entity-list")).toMatchSnapshot();
  });

  it("can sort by review count", async () => {
    expect.hasAssertions();

    render(
      <WatchlistEntityIndexPage
        data={data}
        pageContext={{ entityType: EntityType.DIRECTOR }}
      />
    );

    await userEvent.selectOptions(
      screen.getByLabelText("Order By"),
      "Review Count"
    );

    expect(screen.getByTestId("entity-list")).toMatchSnapshot();
  });
});

describe("/watchlist/directors/", () => {
  it("renders", () => {
    const { asFragment } = render(
      <WatchlistEntityIndexPage
        data={data}
        pageContext={{ entityType: EntityType.DIRECTOR }}
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  // Helmet uses requestAnimationFrame to ensure DOM is synced.
  // https://github.com/nfl/react-helmet/blob/master/test/HelmetDeclarativeTest.js
  // eslint-disable-next-line jest/no-done-callback
  it("sets page title", (done) => {
    expect.hasAssertions();
    render(
      <WatchlistEntityIndexPage
        data={data}
        pageContext={{ entityType: EntityType.DIRECTOR }}
      />
    );

    requestAnimationFrame(() => {
      expect(document.title).toStrictEqual("Watchlist Directors");
      done();
    });
  });
});

describe("/watchlist/performers/", () => {
  it("renders", () => {
    const { asFragment } = render(
      <WatchlistEntityIndexPage
        data={data}
        pageContext={{ entityType: EntityType.PERFORMER }}
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  // Helmet uses requestAnimationFrame to ensure DOM is synced.
  // https://github.com/nfl/react-helmet/blob/master/test/HelmetDeclarativeTest.js
  // eslint-disable-next-line jest/no-done-callback
  it("sets page title", (done) => {
    expect.hasAssertions();
    render(
      <WatchlistEntityIndexPage
        data={data}
        pageContext={{ entityType: EntityType.PERFORMER }}
      />
    );

    requestAnimationFrame(() => {
      expect(document.title).toStrictEqual("Watchlist Performers");
      done();
    });
  });
});

describe("/watchlist/writers/", () => {
  it("renders", () => {
    const { asFragment } = render(
      <WatchlistEntityIndexPage
        data={data}
        pageContext={{ entityType: EntityType.WRITER }}
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  // Helmet uses requestAnimationFrame to ensure DOM is synced.
  // https://github.com/nfl/react-helmet/blob/master/test/HelmetDeclarativeTest.js
  // eslint-disable-next-line jest/no-done-callback
  it("sets page title", (done) => {
    expect.hasAssertions();
    render(
      <WatchlistEntityIndexPage
        data={data}
        pageContext={{ entityType: EntityType.WRITER }}
      />
    );

    requestAnimationFrame(() => {
      expect(document.title).toStrictEqual("Watchlist Writers");
      done();
    });
  });
});

describe("/watchlist/collections/", () => {
  it("renders", () => {
    const { asFragment } = render(
      <WatchlistEntityIndexPage
        data={data}
        pageContext={{ entityType: EntityType.COLLECTION }}
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  // Helmet uses requestAnimationFrame to ensure DOM is synced.
  // https://github.com/nfl/react-helmet/blob/master/test/HelmetDeclarativeTest.js
  // eslint-disable-next-line jest/no-done-callback
  it("sets page title", (done) => {
    expect.hasAssertions();
    render(
      <WatchlistEntityIndexPage
        data={data}
        pageContext={{ entityType: EntityType.COLLECTION }}
      />
    );

    requestAnimationFrame(() => {
      expect(document.title).toStrictEqual("Watchlist Collections");
      done();
    });
  });
});
