// eslint-disable-next-line import/no-extraneous-dependencies
import { act, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import selectEvent from "react-select-event";
import ReviewsIndexPage, { Head } from "./ReviewsIndexPage";
import data from "./ReviewsIndexPage.fixtures";

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

    await act(async () => {
      await userEvent.type(screen.getByLabelText("Title"), "Human Tornado");
      await new Promise((r) => setTimeout(r, 500));
    });

    expect(screen.getByTestId("viewings-list")).toMatchSnapshot();
  });

  it("can filter by venue", async () => {
    expect.hasAssertions();
    render(<ReviewsIndexPage data={data} />);

    await userEvent.selectOptions(
      screen.getByLabelText("Venue"),
      "Arrow Player"
    );

    expect(screen.getByTestId("viewings-list")).toMatchSnapshot();
  });

  it("can filter by venue then show all", async () => {
    expect.hasAssertions();

    render(<ReviewsIndexPage data={data} />);

    await userEvent.selectOptions(
      screen.getByLabelText("Venue"),
      "Arrow Player"
    );
    await userEvent.selectOptions(screen.getByLabelText("Venue"), "All");

    expect(screen.getByTestId("viewings-list")).toMatchSnapshot();
  });

  it("can sort by viewing date with newest first", async () => {
    expect.hasAssertions();

    render(<ReviewsIndexPage data={data} />);

    await userEvent.selectOptions(
      screen.getByLabelText("Order By"),
      "Viewing Date (Newest First)"
    );

    expect(screen.getByTestId("viewings-list")).toMatchSnapshot();
  });

  it("can sort by viewing date with oldest first", async () => {
    expect.hasAssertions();

    render(<ReviewsIndexPage data={data} />);

    await userEvent.selectOptions(
      screen.getByLabelText("Order By"),
      "Viewing Date (Oldest First)"
    );

    expect(screen.getByTestId("viewings-list")).toMatchSnapshot();
  });

  it("can sort by title", async () => {
    expect.hasAssertions();

    render(<ReviewsIndexPage data={data} />);

    await userEvent.selectOptions(screen.getByLabelText("Order By"), "Title");

    expect(screen.getByTestId("viewings-list")).toMatchSnapshot();
  });

  it("can sort by release date with oldest first", async () => {
    expect.hasAssertions();

    render(<ReviewsIndexPage data={data} />);

    await userEvent.selectOptions(
      screen.getByLabelText("Order By"),
      "Release Date (Oldest First)"
    );

    expect(screen.getByTestId("viewings-list")).toMatchSnapshot();
  });

  it("can sort by release date with newest first", async () => {
    expect.hasAssertions();

    render(<ReviewsIndexPage data={data} />);

    await userEvent.selectOptions(
      screen.getByLabelText("Order By"),
      "Release Date (Newest First)"
    );

    expect(screen.getByTestId("viewings-list")).toMatchSnapshot();
  });

  it("can sort by grade with best first", async () => {
    expect.hasAssertions();

    render(<ReviewsIndexPage data={data} />);

    await userEvent.selectOptions(
      screen.getByLabelText("Order By"),
      "Grade (Best First)"
    );

    expect(screen.getByTestId("viewings-list")).toMatchSnapshot();
  });

  it("can sort by grade with worst first", async () => {
    expect.hasAssertions();

    render(<ReviewsIndexPage data={data} />);

    await userEvent.selectOptions(
      screen.getByLabelText("Order By"),
      "Grade (Worst First)"
    );

    expect(screen.getByTestId("viewings-list")).toMatchSnapshot();
  });

  it("sorts unrated movies last", async () => {
    expect.hasAssertions();

    render(<ReviewsIndexPage data={data} />);

    await userEvent.selectOptions(screen.getByLabelText("Venue"), "Shudder");

    await userEvent.selectOptions(
      screen.getByLabelText("Order By"),
      "Grade (Worst First)"
    );

    expect(screen.getByTestId("viewings-list")).toMatchSnapshot();
  });

  it("can filter by release year", async () => {
    expect.hasAssertions();

    render(<ReviewsIndexPage data={data} />);

    const fieldset = screen.getByRole("group", { name: "Release Year" });
    const fromInput = within(fieldset).getByLabelText("From");
    const toInput = within(fieldset).getByLabelText("to");

    await userEvent.selectOptions(fromInput, "1980");
    await userEvent.selectOptions(toInput, "2010");

    expect(screen.getByTestId("viewings-list")).toMatchSnapshot();
  });

  it("can filter by release year reversed", async () => {
    expect.hasAssertions();

    render(<ReviewsIndexPage data={data} />);

    const fieldset = screen.getByRole("group", { name: "Release Year" });
    const fromInput = within(fieldset).getByLabelText("From");
    const toInput = within(fieldset).getByLabelText("to");

    await userEvent.selectOptions(fromInput, "1980");
    await userEvent.selectOptions(toInput, "2010");
    await userEvent.selectOptions(fromInput, "2011");
    await userEvent.selectOptions(toInput, "1981");

    expect(screen.getByTestId("viewings-list")).toMatchSnapshot();
  });

  it("can filter by viewing year", async () => {
    expect.hasAssertions();

    render(<ReviewsIndexPage data={data} />);

    const fieldset = screen.getByRole("group", { name: "Viewing Year" });
    const fromInput = within(fieldset).getByLabelText("From");
    const toInput = within(fieldset).getByLabelText("to");

    await userEvent.selectOptions(fromInput, "2012");
    await userEvent.selectOptions(toInput, "2015");

    expect(screen.getByTestId("viewings-list")).toMatchSnapshot();
  });

  it("can filter by viewing year reversed", async () => {
    expect.hasAssertions();

    render(<ReviewsIndexPage data={data} />);

    const fieldset = screen.getByRole("group", { name: "Viewing Year" });
    const fromInput = within(fieldset).getByLabelText("From");
    const toInput = within(fieldset).getByLabelText("to");

    await userEvent.selectOptions(fromInput, "2013");
    await userEvent.selectOptions(toInput, "2015");
    await userEvent.selectOptions(fromInput, "2017");
    await userEvent.selectOptions(toInput, "2012");

    expect(screen.getByTestId("viewings-list")).toMatchSnapshot();
  });

  it("can filter by grade", async () => {
    expect.hasAssertions();

    render(<ReviewsIndexPage data={data} />);

    const fieldset = screen.getByRole("group", { name: "Grade" });
    const fromInput = within(fieldset).getByLabelText("From");
    const toInput = within(fieldset).getByLabelText("to");

    await userEvent.selectOptions(fromInput, "B-");
    await userEvent.selectOptions(toInput, "A+");

    expect(screen.getByTestId("viewings-list")).toMatchSnapshot();
  });

  it("can filter by genres", async () => {
    expect.hasAssertions();
    render(<ReviewsIndexPage data={data} />);

    const select = screen.getByLabelText("Genres");

    await selectEvent.select(select, ["Horror", "Comedy"]);

    expect(screen.getByTestId("viewings-list")).toMatchSnapshot();
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

    expect(screen.getByTestId("viewings-list")).toMatchSnapshot();
  });

  it("can exclude unrated titles", async () => {
    expect.hasAssertions();

    render(<ReviewsIndexPage data={data} />);

    await userEvent.selectOptions(
      screen.getByLabelText("Order By"),
      "Viewing Date (Oldest First)"
    );

    await userEvent.click(screen.getByLabelText("Include unrated viewings"));

    expect(screen.getByTestId("viewings-list")).toMatchSnapshot();
  });

  it("can show more titles", async () => {
    expect.hasAssertions();

    render(<ReviewsIndexPage data={data} />);

    await userEvent.click(screen.getByText("Show More..."));

    expect(screen.getByTestId("viewings-list")).toMatchSnapshot();
  });
});
