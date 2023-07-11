import { act, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { select } from "react-select-event";
import OverratedDisappointmentsPage, { Head } from "./overrated";
import { data } from "./overrated.fixtures";

describe("/reviews/overrated/", () => {
  it("renders", () => {
    const { asFragment } = render(<OverratedDisappointmentsPage data={data} />);

    expect(asFragment()).toMatchSnapshot();
  });

  it("sets page title", () => {
    render(<Head />);

    expect(document.title).toStrictEqual("Overrated Disappointments");
  });

  it("can filter by title", async () => {
    expect.hasAssertions();
    render(<OverratedDisappointmentsPage data={data} />);

    await act(async () => {
      await userEvent.type(screen.getByLabelText("Title"), "Arrebato");
      await new Promise((r) => setTimeout(r, 500));
    });

    expect(screen.getByTestId("poster-list")).toMatchSnapshot();
  });

  it("can sort by title (A → Z)", async () => {
    expect.hasAssertions();

    render(<OverratedDisappointmentsPage data={data} />);

    await userEvent.selectOptions(
      screen.getByLabelText("Order By"),
      "Title (A → Z)",
    );

    expect(screen.getByTestId("poster-list")).toMatchSnapshot();
  });

  it("can sort by title (Z → A)", async () => {
    expect.hasAssertions();

    render(<OverratedDisappointmentsPage data={data} />);

    await userEvent.selectOptions(
      screen.getByLabelText("Order By"),
      "Title (Z → A)",
    );

    expect(screen.getByTestId("poster-list")).toMatchSnapshot();
  });

  it("can sort by release date with oldest first", async () => {
    expect.hasAssertions();

    render(<OverratedDisappointmentsPage data={data} />);

    await userEvent.selectOptions(
      screen.getByLabelText("Order By"),
      "Release Date (Oldest First)",
    );

    expect(screen.getByTestId("poster-list")).toMatchSnapshot();
  });

  it("can sort by release date with newest first", async () => {
    expect.hasAssertions();

    render(<OverratedDisappointmentsPage data={data} />);

    await userEvent.selectOptions(
      screen.getByLabelText("Order By"),
      "Release Date (Newest First)",
    );

    expect(screen.getByTestId("poster-list")).toMatchSnapshot();
  });

  it("can sort by grade with best first", async () => {
    expect.hasAssertions();

    render(<OverratedDisappointmentsPage data={data} />);

    await userEvent.selectOptions(
      screen.getByLabelText("Order By"),
      "Grade (Best First)",
    );

    expect(screen.getByTestId("poster-list")).toMatchSnapshot();
  });

  it("can sort by grade with worst first", async () => {
    expect.hasAssertions();

    render(<OverratedDisappointmentsPage data={data} />);

    await userEvent.selectOptions(
      screen.getByLabelText("Order By"),
      "Grade (Worst First)",
    );

    expect(screen.getByTestId("poster-list")).toMatchSnapshot();
  });

  it("can filter by release year", async () => {
    expect.hasAssertions();
    render(<OverratedDisappointmentsPage data={data} />);

    const fieldset = screen.getByRole("group", { name: "Release Year" });
    const fromInput = within(fieldset).getByLabelText("From");
    const toInput = within(fieldset).getByLabelText("to");

    await userEvent.selectOptions(fromInput, "1984");
    await userEvent.selectOptions(toInput, "2020");

    expect(screen.getByTestId("poster-list")).toMatchSnapshot();
  });

  it("can filter by release year reversed", async () => {
    expect.hasAssertions();

    render(<OverratedDisappointmentsPage data={data} />);

    const fieldset = screen.getByRole("group", { name: "Release Year" });
    const fromInput = within(fieldset).getByLabelText("From");
    const toInput = within(fieldset).getByLabelText("to");

    await userEvent.selectOptions(fromInput, "1984");
    await userEvent.selectOptions(toInput, "2018");
    await userEvent.selectOptions(fromInput, "2020");
    await userEvent.selectOptions(toInput, "1981");

    expect(screen.getByTestId("poster-list")).toMatchSnapshot();
  });

  it("can filter by genres", async () => {
    expect.hasAssertions();

    render(<OverratedDisappointmentsPage data={data} />);

    const selectElement = screen.getByLabelText("Genres");

    await select(selectElement, ["Horror", "Comedy"]);

    expect(screen.getByTestId("poster-list")).toMatchSnapshot();
  });
});
