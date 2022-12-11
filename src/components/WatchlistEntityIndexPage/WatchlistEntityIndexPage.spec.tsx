import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import WatchlistEntityIndexPage, {
  EntityType,
  Head,
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

  it("sets page title", () => {
    render(<Head pageContext={{ entityType: EntityType.DIRECTOR }} />);

    expect(document.title).toStrictEqual("Watchlist Directors");
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

  it("sets page title", () => {
    render(<Head pageContext={{ entityType: EntityType.PERFORMER }} />);

    expect(document.title).toStrictEqual("Watchlist Performers");
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

  it("sets page title", () => {
    render(<Head pageContext={{ entityType: EntityType.WRITER }} />);

    expect(document.title).toStrictEqual("Watchlist Writers");
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

  it("sets page title", () => {
    render(<Head pageContext={{ entityType: EntityType.COLLECTION }} />);

    expect(document.title).toStrictEqual("Watchlist Collections");
  });
});
