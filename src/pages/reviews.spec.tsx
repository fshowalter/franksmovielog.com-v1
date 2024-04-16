import { act, render, screen, within } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { select } from "react-select-event";
import ReviewsIndexPage, { Head } from "./reviews";
import { data } from "./reviews.fixtures";

describe("/reviews", () => {
  it("renders", () => {
    const { asFragment } = render(<ReviewsIndexPage data={data} />);

    expect(asFragment()).toMatchSnapshot();
  });

  it("sets page title", () => {
    render(<Head />);

    expect(document.title).toStrictEqual("Reviews");
  });

  it("can filter by title", async () => {
    expect.hasAssertions();
    render(<ReviewsIndexPage data={data} />);

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      await userEvent.type(screen.getByLabelText("Title"), "Human Tornado");
      await new Promise((r) => setTimeout(r, 500));
    });

    expect(screen.getByTestId("poster-list")).toMatchSnapshot();
  });

  it("can sort by review date with newest first", async () => {
    expect.hasAssertions();

    render(<ReviewsIndexPage data={data} />);

    await userEvent.selectOptions(
      screen.getByLabelText("Order By"),
      "Review Date (Newest First)",
    );

    expect(screen.getByTestId("poster-list")).toMatchSnapshot();
  });

  it("can sort by review date with oldest first", async () => {
    expect.hasAssertions();

    render(<ReviewsIndexPage data={data} />);

    await userEvent.selectOptions(
      screen.getByLabelText("Order By"),
      "Review Date (Oldest First)",
    );

    expect(screen.getByTestId("poster-list")).toMatchSnapshot();
  });

  it("can sort by title A → Z", async () => {
    expect.hasAssertions();

    render(<ReviewsIndexPage data={data} />);

    await userEvent.selectOptions(
      screen.getByLabelText("Order By"),
      "Title (A → Z)",
    );

    expect(screen.getByTestId("poster-list")).toMatchSnapshot();
  });

  it("can sort by title Z → A", async () => {
    expect.hasAssertions();

    render(<ReviewsIndexPage data={data} />);

    await userEvent.selectOptions(
      screen.getByLabelText("Order By"),
      "Title (Z → A)",
    );

    expect(screen.getByTestId("poster-list")).toMatchSnapshot();
  });

  it("can sort by release date with oldest first", async () => {
    expect.hasAssertions();

    render(<ReviewsIndexPage data={data} />);

    await userEvent.selectOptions(
      screen.getByLabelText("Order By"),
      "Release Date (Oldest First)",
    );

    expect(screen.getByTestId("poster-list")).toMatchSnapshot();
  });

  it("can sort by release date with newest first", async () => {
    expect.hasAssertions();

    render(<ReviewsIndexPage data={data} />);

    await userEvent.selectOptions(
      screen.getByLabelText("Order By"),
      "Release Date (Newest First)",
    );

    expect(screen.getByTestId("poster-list")).toMatchSnapshot();
  });

  it("can sort by grade with best first", async () => {
    expect.hasAssertions();

    render(<ReviewsIndexPage data={data} />);

    await userEvent.selectOptions(
      screen.getByLabelText("Order By"),
      "Grade (Best First)",
    );

    expect(screen.getByTestId("poster-list")).toMatchSnapshot();
  });

  it("can sort by grade with worst first", async () => {
    expect.hasAssertions();

    render(<ReviewsIndexPage data={data} />);

    await userEvent.selectOptions(
      screen.getByLabelText("Order By"),
      "Grade (Worst First)",
    );

    expect(screen.getByTestId("poster-list")).toMatchSnapshot();
  });

  it("can filter by release year", async () => {
    expect.hasAssertions();

    render(<ReviewsIndexPage data={data} />);

    const fieldset = screen.getByRole("group", { name: "Release Year" });
    const fromInput = within(fieldset).getByLabelText("From");
    const toInput = within(fieldset).getByLabelText("to");

    await userEvent.selectOptions(fromInput, "1973");
    await userEvent.selectOptions(toInput, "2021");

    expect(screen.getByTestId("poster-list")).toMatchSnapshot();
  });

  it("can filter by release year reversed", async () => {
    expect.hasAssertions();

    render(<ReviewsIndexPage data={data} />);

    const fieldset = screen.getByRole("group", { name: "Release Year" });
    const fromInput = within(fieldset).getByLabelText("From");
    const toInput = within(fieldset).getByLabelText("to");

    await userEvent.selectOptions(fromInput, "1973");
    await userEvent.selectOptions(toInput, "2021");
    await userEvent.selectOptions(fromInput, "2009");
    await userEvent.selectOptions(toInput, "1972");

    expect(screen.getByTestId("poster-list")).toMatchSnapshot();
  });

  it("can filter by review year", async () => {
    expect.hasAssertions();

    render(<ReviewsIndexPage data={data} />);

    const fieldset = screen.getByRole("group", { name: "Review Year" });
    const fromInput = within(fieldset).getByLabelText("From");
    const toInput = within(fieldset).getByLabelText("to");

    await userEvent.selectOptions(fromInput, "2015");
    await userEvent.selectOptions(toInput, "2020");

    expect(screen.getByTestId("poster-list")).toMatchSnapshot();
  });

  it("can filter by review year reversed", async () => {
    expect.hasAssertions();

    render(<ReviewsIndexPage data={data} />);

    const fieldset = screen.getByRole("group", { name: "Review Year" });
    const fromInput = within(fieldset).getByLabelText("From");
    const toInput = within(fieldset).getByLabelText("to");

    await userEvent.selectOptions(fromInput, "2015");
    await userEvent.selectOptions(toInput, "2020");
    await userEvent.selectOptions(fromInput, "2017");
    await userEvent.selectOptions(toInput, "2015");

    expect(screen.getByTestId("poster-list")).toMatchSnapshot();
  });

  it("can filter by grade", async () => {
    expect.hasAssertions();

    render(<ReviewsIndexPage data={data} />);

    const fieldset = screen.getByRole("group", { name: "Grade" });
    const fromInput = within(fieldset).getByLabelText("From");
    const toInput = within(fieldset).getByLabelText("to");

    await userEvent.selectOptions(fromInput, "B-");
    await userEvent.selectOptions(toInput, "A+");

    expect(screen.getByTestId("poster-list")).toMatchSnapshot();
  });

  it("can filter by genres", async () => {
    expect.hasAssertions();
    render(<ReviewsIndexPage data={data} />);

    const selectElement = screen.getByLabelText("Genres");

    await select(selectElement, ["Horror", "Comedy"]);

    expect(screen.getByTestId("poster-list")).toMatchSnapshot();
  });

  it("can filter by grade reversed", async () => {
    expect.hasAssertions();

    render(<ReviewsIndexPage data={data} />);

    const fieldset = screen.getByRole("group", { name: "Grade" });
    const fromInput = within(fieldset).getByLabelText("From");
    const toInput = within(fieldset).getByLabelText("to");

    await userEvent.selectOptions(fromInput, "B");
    await userEvent.selectOptions(toInput, "B+");
    await userEvent.selectOptions(fromInput, "A-");
    await userEvent.selectOptions(toInput, "B-");

    expect(screen.getByTestId("poster-list")).toMatchSnapshot();
  });

  it("can show more titles", async () => {
    expect.hasAssertions();

    render(<ReviewsIndexPage data={data} />);

    await userEvent.click(screen.getByText("Show More..."));

    expect(screen.getByTestId("poster-list")).toMatchSnapshot();
  });
});
