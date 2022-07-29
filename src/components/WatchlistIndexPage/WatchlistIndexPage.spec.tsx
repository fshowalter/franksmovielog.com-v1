// eslint-disable-next-line import/no-extraneous-dependencies
import { act, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import WatchlistIndexPage, { Head } from "./WatchlistIndexPage";
import data from "./WatchlistIndexPage.fixtures";

describe("/watchlist", () => {
  it("renders", () => {
    const { asFragment } = render(<WatchlistIndexPage data={data} />);

    expect(asFragment()).toMatchSnapshot();
  });

  it("sets page title", () => {
    render(<Head />);

    expect(document.title).toStrictEqual("Watchlist");
  });

  it("can filter by title", async () => {
    expect.hasAssertions();
    render(<WatchlistIndexPage data={data} />);

    await act(async () => {
      await userEvent.type(screen.getByLabelText("Title"), "Lawyer Man");
      await new Promise((r) => setTimeout(r, 500));
    });

    expect(screen.getByTestId("movies-list")).toMatchSnapshot();
  });

  it("can filter by not-found title", async () => {
    expect.hasAssertions();
    render(<WatchlistIndexPage data={data} />);

    await act(async () => {
      await userEvent.type(
        screen.getByLabelText("Title"),
        "This movie doesn't exist"
      );
      await new Promise((r) => setTimeout(r, 500));
    });

    expect(screen.getByTestId("movies-list")).toMatchSnapshot();
  });

  it("can filter by director", async () => {
    expect.hasAssertions();
    render(<WatchlistIndexPage data={data} />);

    await userEvent.selectOptions(
      screen.getByLabelText("Director"),
      "Howard Hawks"
    );

    expect(screen.getByTestId("movies-list")).toMatchSnapshot();
  });

  it("can filter by director then show all", async () => {
    expect.hasAssertions();

    render(<WatchlistIndexPage data={data} />);

    await userEvent.selectOptions(
      screen.getByLabelText("Director"),
      "Howard Hawks"
    );
    await userEvent.selectOptions(screen.getByLabelText("Director"), "All");

    expect(screen.getByTestId("movies-list")).toMatchSnapshot();
  });

  it("can filter by performer", async () => {
    expect.hasAssertions();
    render(<WatchlistIndexPage data={data} />);

    await userEvent.selectOptions(
      screen.getByLabelText("Performer"),
      "Bette Davis"
    );

    expect(screen.getByTestId("movies-list")).toMatchSnapshot();
  });

  it("can filter by performer then show all", async () => {
    expect.hasAssertions();

    render(<WatchlistIndexPage data={data} />);

    await userEvent.selectOptions(
      screen.getByLabelText("Performer"),
      "Bette Davis"
    );
    await userEvent.selectOptions(screen.getByLabelText("Performer"), "All");

    expect(screen.getByTestId("movies-list")).toMatchSnapshot();
  });

  it("can filter by writer", async () => {
    expect.hasAssertions();
    render(<WatchlistIndexPage data={data} />);

    await userEvent.selectOptions(
      screen.getByLabelText("Writer"),
      "Leigh Brackett"
    );

    expect(screen.getByTestId("movies-list")).toMatchSnapshot();
  });

  it("can filter by writer then show all", async () => {
    expect.hasAssertions();

    render(<WatchlistIndexPage data={data} />);

    await userEvent.selectOptions(
      screen.getByLabelText("Writer"),
      "Leigh Brackett"
    );

    await userEvent.selectOptions(screen.getByLabelText("Writer"), "All");

    expect(screen.getByTestId("movies-list")).toMatchSnapshot();
  });

  it("can filter by collection", async () => {
    expect.hasAssertions();

    render(<WatchlistIndexPage data={data} />);

    await userEvent.selectOptions(
      screen.getByLabelText("Collection"),
      "Universal Monsters"
    );

    expect(screen.getByTestId("movies-list")).toMatchSnapshot();
  });

  it("can filter by collection then show all", async () => {
    expect.hasAssertions();

    render(<WatchlistIndexPage data={data} />);

    await userEvent.selectOptions(
      screen.getByLabelText("Collection"),
      "Universal Monsters"
    );
    await userEvent.selectOptions(screen.getByLabelText("Collection"), "All");

    expect(screen.getByTestId("movies-list")).toMatchSnapshot();
  });

  it("can sort by title", async () => {
    expect.hasAssertions();

    render(<WatchlistIndexPage data={data} />);

    await userEvent.selectOptions(screen.getByLabelText("Order By"), "Title");

    expect(screen.getByTestId("movies-list")).toMatchSnapshot();
  });

  it("can sort by release date with oldest first", async () => {
    expect.hasAssertions();

    render(<WatchlistIndexPage data={data} />);

    await userEvent.selectOptions(
      screen.getByLabelText("Order By"),
      "Release Date (Oldest First)"
    );

    expect(screen.getByTestId("movies-list")).toMatchSnapshot();
  });

  it("can sort by release date with newest first", async () => {
    expect.hasAssertions();

    render(<WatchlistIndexPage data={data} />);

    await userEvent.selectOptions(
      screen.getByLabelText("Order By"),
      "Release Date (Newest First)"
    );

    expect(screen.getByTestId("movies-list")).toMatchSnapshot();
  });

  it("can filter by release year", async () => {
    expect.hasAssertions();

    render(<WatchlistIndexPage data={data} />);

    const fieldset = screen.getByRole("group", { name: "Release Year" });
    const fromInput = within(fieldset).getByLabelText("From");
    const toInput = within(fieldset).getByLabelText("to");

    await userEvent.selectOptions(fromInput, "1947");
    await userEvent.selectOptions(toInput, "1948");

    expect(screen.getByTestId("movies-list")).toMatchSnapshot();
  });

  it("can hide reviewed titles", async () => {
    expect.hasAssertions();

    render(<WatchlistIndexPage data={data} />);

    await userEvent.click(screen.getByText("Hide Reviewed"));

    expect(screen.getByTestId("movies-list")).toMatchSnapshot();
  });

  it("can show hidden reviewed titles", async () => {
    expect.hasAssertions();

    render(<WatchlistIndexPage data={data} />);

    await userEvent.click(screen.getByText("Hide Reviewed"));
    await userEvent.click(screen.getByText("Show Reviewed"));

    expect(screen.getByTestId("movies-list")).toMatchSnapshot();
  });

  it("can show more titles", async () => {
    expect.hasAssertions();

    render(<WatchlistIndexPage data={data} />);

    await userEvent.click(screen.getByText("Show More"));

    expect(screen.getByTestId("movies-list")).toMatchSnapshot();
  });
});
