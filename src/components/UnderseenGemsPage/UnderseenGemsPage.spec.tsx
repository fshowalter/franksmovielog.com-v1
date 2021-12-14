// eslint-disable-next-line import/no-extraneous-dependencies
import { act, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import selectEvent from "react-select-event";
import UnderseenGemsPage from "./UnderseenGemsPage";
import data from "./UnderseenGemsPage.fixtures";

describe("/reviews/underseen/", () => {
  it("renders", () => {
    const { asFragment } = render(<UnderseenGemsPage data={data} />);

    expect(asFragment()).toMatchSnapshot();
  });

  // Helmet uses requestAnimationFrame to ensure DOM is synced.
  // https://github.com/nfl/react-helmet/blob/master/test/HelmetDeclarativeTest.js
  // eslint-disable-next-line jest/no-done-callback
  it("sets page title", (done) => {
    expect.hasAssertions();
    render(<UnderseenGemsPage data={data} />);

    requestAnimationFrame(() => {
      expect(document.title).toStrictEqual("Underseen Gems");
      done();
    });
  });

  it("can filter by title", async () => {
    expect.hasAssertions();
    render(<UnderseenGemsPage data={data} />);

    act(() => {
      jest.useFakeTimers(); // For the debouced input
      userEvent.type(screen.getByLabelText("Title"), "Arrebato");
      jest.runOnlyPendingTimers(); // Flush the delay
      jest.useRealTimers();
    });

    await waitFor(() => {
      expect(screen.getByTestId("movies-list")).toMatchSnapshot();
    });
  });

  it("can sort by title", () => {
    render(<UnderseenGemsPage data={data} />);

    userEvent.selectOptions(screen.getByLabelText("Order By"), "Title");

    expect(screen.getByTestId("movies-list")).toMatchSnapshot();
  });

  it("can sort by release date with oldest first", () => {
    render(<UnderseenGemsPage data={data} />);

    userEvent.selectOptions(
      screen.getByLabelText("Order By"),
      "Release Date (Oldest First)"
    );

    expect(screen.getByTestId("movies-list")).toMatchSnapshot();
  });

  it("can sort by release date with newest first", () => {
    render(<UnderseenGemsPage data={data} />);

    userEvent.selectOptions(
      screen.getByLabelText("Order By"),
      "Release Date (Newest First)"
    );

    expect(screen.getByTestId("movies-list")).toMatchSnapshot();
  });

  it("can sort by grade with best first", () => {
    render(<UnderseenGemsPage data={data} />);

    userEvent.selectOptions(
      screen.getByLabelText("Order By"),
      "Grade (Best First)"
    );

    expect(screen.getByTestId("movies-list")).toMatchSnapshot();
  });

  it("can sort by grade with worst first", () => {
    render(<UnderseenGemsPage data={data} />);

    userEvent.selectOptions(
      screen.getByLabelText("Order By"),
      "Grade (Worst First)"
    );

    expect(screen.getByTestId("movies-list")).toMatchSnapshot();
  });

  it("can filter by release year", () => {
    render(<UnderseenGemsPage data={data} />);

    const fieldset = screen.getByRole("group", { name: "Release Year" });
    const fromInput = within(fieldset).getByLabelText("From");
    const toInput = within(fieldset).getByLabelText("to");

    userEvent.selectOptions(fromInput, "1987");
    userEvent.selectOptions(toInput, "2013");

    expect(screen.getByTestId("movies-list")).toMatchSnapshot();
  });

  it("can filter by release year reversed", () => {
    render(<UnderseenGemsPage data={data} />);

    const fieldset = screen.getByRole("group", { name: "Release Year" });
    const fromInput = within(fieldset).getByLabelText("From");
    const toInput = within(fieldset).getByLabelText("to");

    userEvent.selectOptions(fromInput, "1987");
    userEvent.selectOptions(toInput, "2013");
    userEvent.selectOptions(fromInput, "2009");
    userEvent.selectOptions(toInput, "1989");

    expect(screen.getByTestId("movies-list")).toMatchSnapshot();
  });

  it("can filter by genres", async () => {
    expect.hasAssertions();
    render(<UnderseenGemsPage data={data} />);

    const select = screen.getByLabelText("Genres");

    await selectEvent.select(select, ["Horror", "Comedy"]);

    expect(screen.getByTestId("movies-list")).toMatchSnapshot();
  });
});
