// eslint-disable-next-line import/no-extraneous-dependencies
import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import ReviewsPage from "../index";
import data from "./__fixtures__/index-page-query";

jest.mock("../../../components/Seo/Seo.tsx");

describe("/reviews", () => {
  it("renders", () => {
    const { asFragment } = render(<ReviewsPage data={data} />);

    expect(asFragment()).toMatchSnapshot();
  });

  // Helmet uses requestAnimationFrame to ensure DOM is synced.
  // https://github.com/nfl/react-helmet/blob/master/test/HelmetDeclarativeTest.js
  // eslint-disable-next-line jest/no-done-callback
  it("sets page title", (done) => {
    expect.hasAssertions();
    render(<ReviewsPage data={data} />);

    requestAnimationFrame(() => {
      expect(document.title).toStrictEqual("All Reviews");
      done();
    });
  });

  it("can filter by title", async () => {
    expect.hasAssertions();
    render(<ReviewsPage data={data} />);

    act(() => {
      jest.useFakeTimers(); // For the debouced input
      userEvent.type(screen.getByLabelText("Title"), "Human Tornado");
      jest.runOnlyPendingTimers(); // Flush the delay
      jest.useRealTimers();
    });

    await waitFor(() => {
      expect(screen.getByTestId("reviews-list")).toMatchSnapshot();
    });
  });

  it("can sort by grade with best first", () => {
    render(<ReviewsPage data={data} />);

    userEvent.selectOptions(
      screen.getByLabelText("Order By"),
      "Grade (Best First)"
    );

    expect(screen.getByTestId("reviews-list")).toMatchSnapshot();
  });

  it("can sort by grade with worst first", () => {
    render(<ReviewsPage data={data} />);

    userEvent.selectOptions(
      screen.getByLabelText("Order By"),
      "Grade (Worst First)"
    );

    expect(screen.getByTestId("reviews-list")).toMatchSnapshot();
  });

  it("can sort by title", () => {
    render(<ReviewsPage data={data} />);

    userEvent.selectOptions(screen.getByLabelText("Order By"), "Title");

    expect(screen.getByTestId("reviews-list")).toMatchSnapshot();
  });

  it("can sort by release date with oldest first", () => {
    render(<ReviewsPage data={data} />);

    userEvent.selectOptions(
      screen.getByLabelText("Order By"),
      "Release Date (Oldest First)"
    );

    expect(screen.getByTestId("reviews-list")).toMatchSnapshot();
  });

  it("can sort by release date with newest first", () => {
    render(<ReviewsPage data={data} />);

    userEvent.selectOptions(
      screen.getByLabelText("Order By"),
      "Release Date (Newest First)"
    );

    expect(screen.getByTestId("reviews-list")).toMatchSnapshot();
  });

  it("can filter by release year", () => {
    render(<ReviewsPage data={data} />);

    const inputs = screen.getAllByLabelText("Release Year");

    userEvent.clear(inputs[0]);
    userEvent.type(inputs[0], "1980");
    userEvent.clear(inputs[1]);
    userEvent.type(inputs[1], "2010");

    expect(screen.getByTestId("reviews-list")).toMatchSnapshot();
  });

  it("can show grades", () => {
    render(<ReviewsPage data={data} />);

    userEvent.click(screen.getByText("Show Grades"));

    expect(screen.getByTestId("reviews-list")).toMatchSnapshot();
  });

  it("can show stars", () => {
    render(<ReviewsPage data={data} />);

    userEvent.click(screen.getByText("Show Grades"));
    userEvent.click(screen.getByText("Show Stars"));

    expect(screen.getByTestId("reviews-list")).toMatchSnapshot();
  });
});
