// eslint-disable-next-line import/no-extraneous-dependencies
import { act, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import selectEvent from "react-select-event";
import ReviewsIndexPage from "./ReviewsIndexPage";
import data from "./ReviewsIndexPage.fixtures";

describe("/reviews", () => {
  it("renders", () => {
    const { asFragment } = render(<ReviewsIndexPage data={data} />);

    expect(asFragment()).toMatchSnapshot();
  });

  // Helmet uses requestAnimationFrame to ensure DOM is synced.
  // https://github.com/nfl/react-helmet/blob/master/test/HelmetDeclarativeTest.js
  // eslint-disable-next-line jest/no-done-callback
  it("sets page title", (done) => {
    expect.hasAssertions();
    render(<ReviewsIndexPage data={data} />);

    requestAnimationFrame(() => {
      expect(document.title).toStrictEqual("Reviews");
      done();
    });
  });

  it("can filter by title", async () => {
    expect.hasAssertions();
    render(<ReviewsIndexPage data={data} />);

    act(() => {
      jest.useFakeTimers(); // For the debouced input
      userEvent.type(screen.getByLabelText("Title"), "Human Tornado");
      jest.runOnlyPendingTimers(); // Flush the delay
      jest.useRealTimers();
    });

    await waitFor(() => {
      expect(screen.getByTestId("viewings-list")).toMatchSnapshot();
    });
  });

  it("can filter by venue", () => {
    expect.hasAssertions();
    render(<ReviewsIndexPage data={data} />);

    userEvent.selectOptions(screen.getByLabelText("Venue"), "Arrow Player");

    expect(screen.getByTestId("viewings-list")).toMatchSnapshot();
  });

  it("can filter by venue then show all", () => {
    render(<ReviewsIndexPage data={data} />);

    userEvent.selectOptions(screen.getByLabelText("Venue"), "Arrow Player");
    userEvent.selectOptions(screen.getByLabelText("Venue"), "All");

    expect(screen.getByTestId("viewings-list")).toMatchSnapshot();
  });

  it("can sort by viewing date with newest first", () => {
    render(<ReviewsIndexPage data={data} />);

    userEvent.selectOptions(
      screen.getByLabelText("Order By"),
      "Viewing Date (Newest First)"
    );

    expect(screen.getByTestId("viewings-list")).toMatchSnapshot();
  });

  it("can sort by viewing date with oldest first", () => {
    render(<ReviewsIndexPage data={data} />);

    userEvent.selectOptions(
      screen.getByLabelText("Order By"),
      "Viewing Date (Oldest First)"
    );

    expect(screen.getByTestId("viewings-list")).toMatchSnapshot();
  });

  it("can sort by title", () => {
    render(<ReviewsIndexPage data={data} />);

    userEvent.selectOptions(screen.getByLabelText("Order By"), "Title");

    expect(screen.getByTestId("viewings-list")).toMatchSnapshot();
  });

  it("can sort by release date with oldest first", () => {
    render(<ReviewsIndexPage data={data} />);

    userEvent.selectOptions(
      screen.getByLabelText("Order By"),
      "Release Date (Oldest First)"
    );

    expect(screen.getByTestId("viewings-list")).toMatchSnapshot();
  });

  it("can sort by release date with newest first", () => {
    render(<ReviewsIndexPage data={data} />);

    userEvent.selectOptions(
      screen.getByLabelText("Order By"),
      "Release Date (Newest First)"
    );

    expect(screen.getByTestId("viewings-list")).toMatchSnapshot();
  });

  it("can sort by grade with best first", () => {
    render(<ReviewsIndexPage data={data} />);

    userEvent.selectOptions(
      screen.getByLabelText("Order By"),
      "Grade (Best First)"
    );

    expect(screen.getByTestId("viewings-list")).toMatchSnapshot();
  });

  it("can sort by grade with worst first", () => {
    render(<ReviewsIndexPage data={data} />);

    userEvent.selectOptions(
      screen.getByLabelText("Order By"),
      "Grade (Worst First)"
    );

    expect(screen.getByTestId("viewings-list")).toMatchSnapshot();
  });

  it("sorts unrated movies last", () => {
    render(<ReviewsIndexPage data={data} />);

    userEvent.selectOptions(screen.getByLabelText("Venue"), "Shudder");

    userEvent.selectOptions(
      screen.getByLabelText("Order By"),
      "Grade (Worst First)"
    );

    expect(screen.getByTestId("viewings-list")).toMatchSnapshot();
  });

  it("can filter by release year", () => {
    render(<ReviewsIndexPage data={data} />);

    const fieldset = screen.getByRole("group", { name: "Release Year" });
    const fromInput = within(fieldset).getByLabelText("From");
    const toInput = within(fieldset).getByLabelText("to");

    userEvent.selectOptions(fromInput, "1980");
    userEvent.selectOptions(toInput, "2010");

    expect(screen.getByTestId("viewings-list")).toMatchSnapshot();
  });

  it("can filter by release year reversed", () => {
    render(<ReviewsIndexPage data={data} />);

    const fieldset = screen.getByRole("group", { name: "Release Year" });
    const fromInput = within(fieldset).getByLabelText("From");
    const toInput = within(fieldset).getByLabelText("to");

    userEvent.selectOptions(fromInput, "1980");
    userEvent.selectOptions(toInput, "2010");
    userEvent.selectOptions(fromInput, "2011");
    userEvent.selectOptions(toInput, "1981");

    expect(screen.getByTestId("viewings-list")).toMatchSnapshot();
  });

  it("can filter by viewing year", () => {
    render(<ReviewsIndexPage data={data} />);

    const fieldset = screen.getByRole("group", { name: "Viewing Year" });
    const fromInput = within(fieldset).getByLabelText("From");
    const toInput = within(fieldset).getByLabelText("to");

    userEvent.selectOptions(fromInput, "2012");
    userEvent.selectOptions(toInput, "2015");

    expect(screen.getByTestId("viewings-list")).toMatchSnapshot();
  });

  it("can filter by viewing year reversed", () => {
    render(<ReviewsIndexPage data={data} />);

    const fieldset = screen.getByRole("group", { name: "Viewing Year" });
    const fromInput = within(fieldset).getByLabelText("From");
    const toInput = within(fieldset).getByLabelText("to");

    userEvent.selectOptions(fromInput, "2013");
    userEvent.selectOptions(toInput, "2015");
    userEvent.selectOptions(fromInput, "2017");
    userEvent.selectOptions(toInput, "2012");

    expect(screen.getByTestId("viewings-list")).toMatchSnapshot();
  });

  it("can filter by grade", () => {
    render(<ReviewsIndexPage data={data} />);

    const fieldset = screen.getByRole("group", { name: "Grade" });
    const fromInput = within(fieldset).getByLabelText("From");
    const toInput = within(fieldset).getByLabelText("to");

    userEvent.selectOptions(fromInput, "B-");
    userEvent.selectOptions(toInput, "A+");

    expect(screen.getByTestId("viewings-list")).toMatchSnapshot();
  });

  it("can filter by genres", async () => {
    expect.hasAssertions();
    render(<ReviewsIndexPage data={data} />);

    const select = screen.getByLabelText("Genres");

    await selectEvent.select(select, ["Horror", "Comedy"]);

    expect(screen.getByTestId("viewings-list")).toMatchSnapshot();
  });

  it("can filter by grade reversed", () => {
    render(<ReviewsIndexPage data={data} />);

    const fieldset = screen.getByRole("group", { name: "Grade" });
    const fromInput = within(fieldset).getByLabelText("From");
    const toInput = within(fieldset).getByLabelText("to");

    userEvent.selectOptions(fromInput, "B");
    userEvent.selectOptions(toInput, "B+");
    userEvent.selectOptions(fromInput, "A-");
    userEvent.selectOptions(toInput, "B-");

    expect(screen.getByTestId("viewings-list")).toMatchSnapshot();
  });

  it("can exclude unrated titles", () => {
    render(<ReviewsIndexPage data={data} />);

    userEvent.selectOptions(
      screen.getByLabelText("Order By"),
      "Viewing Date (Oldest First)"
    );

    userEvent.click(screen.getByLabelText("Include unrated viewings"));

    expect(screen.getByTestId("viewings-list")).toMatchSnapshot();
  });

  it("can show more titles", () => {
    render(<ReviewsIndexPage data={data} />);

    userEvent.click(screen.getByText("Show More"));

    expect(screen.getByTestId("viewings-list")).toMatchSnapshot();
  });
});
