// eslint-disable-next-line import/no-extraneous-dependencies
import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import ViewingsIndexPage from "./ViewingsIndexPage";
import data from "./ViewingsIndexPage.fixtures";

describe("/viewings", () => {
  it("renders", () => {
    const { asFragment } = render(<ViewingsIndexPage data={data} />);

    expect(asFragment()).toMatchSnapshot();
  });

  // Helmet uses requestAnimationFrame to ensure DOM is synced.
  // https://github.com/nfl/react-helmet/blob/master/test/HelmetDeclarativeTest.js
  // eslint-disable-next-line jest/no-done-callback
  it("sets page title", (done) => {
    expect.hasAssertions();
    render(<ViewingsIndexPage data={data} />);

    requestAnimationFrame(() => {
      expect(document.title).toStrictEqual("Viewing Log");
      done();
    });
  });

  it("can filter by title", async () => {
    expect.hasAssertions();
    render(<ViewingsIndexPage data={data} />);

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
    render(<ViewingsIndexPage data={data} />);

    userEvent.selectOptions(screen.getByLabelText("Venue"), "Arrow Player");

    expect(screen.getByTestId("viewings-list")).toMatchSnapshot();
  });

  it("can filter by venue then show all", () => {
    render(<ViewingsIndexPage data={data} />);

    userEvent.selectOptions(screen.getByLabelText("Venue"), "Arrow Player");
    userEvent.selectOptions(screen.getByLabelText("Venue"), "All");

    expect(screen.getByTestId("viewings-list")).toMatchSnapshot();
  });

  it("can sort by viewing date with newest first", () => {
    render(<ViewingsIndexPage data={data} />);

    userEvent.selectOptions(
      screen.getByLabelText("Order By"),
      "Viewing Date (Newest First)"
    );

    expect(screen.getByTestId("viewings-list")).toMatchSnapshot();
  });

  it("can sort by viewing date with oldest first", () => {
    render(<ViewingsIndexPage data={data} />);

    userEvent.selectOptions(
      screen.getByLabelText("Order By"),
      "Viewing Date (Oldest First)"
    );

    expect(screen.getByTestId("viewings-list")).toMatchSnapshot();
  });

  it("can sort by title", () => {
    render(<ViewingsIndexPage data={data} />);

    userEvent.selectOptions(screen.getByLabelText("Order By"), "Title");

    expect(screen.getByTestId("viewings-list")).toMatchSnapshot();
  });

  it("can sort by release date with oldest first", () => {
    render(<ViewingsIndexPage data={data} />);

    userEvent.selectOptions(
      screen.getByLabelText("Order By"),
      "Release Date (Oldest First)"
    );

    expect(screen.getByTestId("viewings-list")).toMatchSnapshot();
  });

  it("can sort by release date with newest first", () => {
    render(<ViewingsIndexPage data={data} />);

    userEvent.selectOptions(
      screen.getByLabelText("Order By"),
      "Release Date (Newest First)"
    );

    expect(screen.getByTestId("viewings-list")).toMatchSnapshot();
  });

  it("can filter by release year", () => {
    render(<ViewingsIndexPage data={data} />);

    const inputs = screen.getAllByLabelText("Release Year");

    userEvent.clear(inputs[0]);
    userEvent.type(inputs[0], "1980");
    userEvent.clear(inputs[1]);
    userEvent.type(inputs[1], "2010");

    expect(screen.getByTestId("viewings-list")).toMatchSnapshot();
  });
});
