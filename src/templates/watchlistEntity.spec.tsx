import { act, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import WatchlistEntityPage, { EntityType, Head } from "./watchlistEntity";
import { data } from "./watchlistEntity.fixtures";

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

  it("sets page title", () => {
    render(
      <Head data={data} pageContext={{ entityType: EntityType.DIRECTOR }} />
    );

    expect(document.title).toStrictEqual("John Ford");
  });

  it("can filter by title", async () => {
    expect.hasAssertions();
    render(
      <WatchlistEntityPage
        data={data}
        pageContext={{ entityType: EntityType.DIRECTOR }}
      />
    );

    await act(async () => {
      await userEvent.type(
        screen.getByLabelText("Title"),
        "Man Who Shot Liberty Valance"
      );
      await new Promise((r) => setTimeout(r, 500));
    });

    expect(screen.getByTestId("movie-list")).toMatchSnapshot();
  });

  it("can sort by title", async () => {
    expect.hasAssertions();

    render(
      <WatchlistEntityPage
        data={data}
        pageContext={{ entityType: EntityType.DIRECTOR }}
      />
    );

    await userEvent.selectOptions(screen.getByLabelText("Order By"), "Title");

    expect(screen.getByTestId("movie-list")).toMatchSnapshot();
  });

  it("can sort by release date with oldest first", async () => {
    expect.hasAssertions();

    render(
      <WatchlistEntityPage
        data={data}
        pageContext={{ entityType: EntityType.DIRECTOR }}
      />
    );

    await userEvent.selectOptions(
      screen.getByLabelText("Order By"),
      "Release Date (Oldest First)"
    );

    expect(screen.getByTestId("movie-list")).toMatchSnapshot();
  });

  it("can sort by release date with newest first", async () => {
    expect.hasAssertions();

    render(
      <WatchlistEntityPage
        data={data}
        pageContext={{ entityType: EntityType.DIRECTOR }}
      />
    );

    await userEvent.selectOptions(
      screen.getByLabelText("Order By"),
      "Release Date (Newest First)"
    );

    expect(screen.getByTestId("movie-list")).toMatchSnapshot();
  });

  it("can sort by grade with Best first", async () => {
    expect.hasAssertions();

    render(
      <WatchlistEntityPage
        data={data}
        pageContext={{ entityType: EntityType.DIRECTOR }}
      />
    );

    await userEvent.selectOptions(
      screen.getByLabelText("Order By"),
      "Grade (Best First)"
    );

    expect(screen.getByTestId("movie-list")).toMatchSnapshot();
  });

  it("can sort by grade with worst first", async () => {
    expect.hasAssertions();

    render(
      <WatchlistEntityPage
        data={data}
        pageContext={{ entityType: EntityType.DIRECTOR }}
      />
    );

    await userEvent.selectOptions(
      screen.getByLabelText("Order By"),
      "Grade (Worst First)"
    );

    expect(screen.getByTestId("movie-list")).toMatchSnapshot();
  });

  it("can filter by release year", async () => {
    expect.hasAssertions();

    render(
      <WatchlistEntityPage
        data={data}
        pageContext={{ entityType: EntityType.DIRECTOR }}
      />
    );

    const fieldset = screen.getByRole("group", { name: "Release Year" });
    const fromInput = within(fieldset).getByLabelText("From");
    const toInput = within(fieldset).getByLabelText("to");

    await userEvent.selectOptions(fromInput, "1959");
    await userEvent.selectOptions(toInput, "1962");

    expect(screen.getByTestId("movie-list")).toMatchSnapshot();
  });

  it("can view more titles", async () => {
    expect.hasAssertions();

    render(
      <WatchlistEntityPage
        data={data}
        pageContext={{ entityType: EntityType.DIRECTOR }}
      />
    );

    await userEvent.click(screen.getByText("Show More..."));

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
