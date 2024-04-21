import { act, render, screen, within } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { select } from "react-select-event";
import ViewingsIndexPage, { Head } from "./viewings";
import { data } from "./viewings.fixtures";

describe("/viewings", () => {
  it("renders", () => {
    const { asFragment } = render(<ViewingsIndexPage data={data} />);

    expect(asFragment()).toMatchSnapshot();
  });

  it("sets page title", () => {
    render(<Head />);

    expect(document.title).toStrictEqual("Viewing Log");
  });

  it("can filter by title", async () => {
    expect.hasAssertions();
    render(<ViewingsIndexPage data={data} />);

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      await userEvent.type(screen.getByLabelText("Title"), "Rio Bravo");
      await new Promise((r) => setTimeout(r, 500));
    });

    expect(screen.getByTestId("poster-list")).toMatchSnapshot();
  });

  it("can filter by medium", async () => {
    expect.hasAssertions();
    render(<ViewingsIndexPage data={data} />);

    await userEvent.selectOptions(screen.getByLabelText("Medium"), "Blu-ray");

    expect(screen.getByTestId("poster-list")).toMatchSnapshot();
  });

  it("can filter by medium then show all", async () => {
    expect.hasAssertions();

    render(<ViewingsIndexPage data={data} />);

    await userEvent.selectOptions(screen.getByLabelText("Medium"), "Blu-ray");
    await userEvent.selectOptions(screen.getByLabelText("Medium"), "All");

    expect(screen.getByTestId("poster-list")).toMatchSnapshot();
  });

  it("can filter by venue", async () => {
    expect.hasAssertions();
    render(<ViewingsIndexPage data={data} />);

    await userEvent.selectOptions(
      screen.getByLabelText("Venue"),
      "Alamo Drafthouse Cinema - One Loudoun",
    );

    expect(screen.getByTestId("poster-list")).toMatchSnapshot();
  });

  it("can filter by venue then show all", async () => {
    expect.hasAssertions();
    render(<ViewingsIndexPage data={data} />);

    await userEvent.selectOptions(
      screen.getByLabelText("Venue"),
      "Alamo Drafthouse Cinema - One Loudoun",
    );
    await userEvent.selectOptions(screen.getByLabelText("Venue"), "All");

    expect(screen.getByTestId("poster-list")).toMatchSnapshot();
  });

  it("can sort by viewing date with newest first", async () => {
    expect.hasAssertions();

    render(<ViewingsIndexPage data={data} />);

    await userEvent.selectOptions(
      screen.getByLabelText("Order By"),
      "Viewing Date (Newest First)",
    );

    expect(screen.getByTestId("poster-list")).toMatchSnapshot();
  });

  it("can sort by viewing date with oldest first", async () => {
    expect.hasAssertions();

    render(<ViewingsIndexPage data={data} />);

    await userEvent.selectOptions(
      screen.getByLabelText("Order By"),
      "Viewing Date (Oldest First)",
    );

    expect(screen.getByTestId("poster-list")).toMatchSnapshot();
  });

  it("can filter by release year", async () => {
    expect.hasAssertions();

    render(<ViewingsIndexPage data={data} />);

    const fieldset = screen.getByRole("group", { name: "Release Year" });
    const fromInput = within(fieldset).getByLabelText("From");
    const toInput = within(fieldset).getByLabelText("to");

    await userEvent.selectOptions(fromInput, "1959");
    await userEvent.selectOptions(toInput, "1970");

    expect(screen.getByTestId("poster-list")).toMatchSnapshot();
  });

  it("can filter by release year reversed", async () => {
    expect.hasAssertions();

    render(<ViewingsIndexPage data={data} />);

    const fieldset = screen.getByRole("group", { name: "Release Year" });
    const fromInput = within(fieldset).getByLabelText("From");
    const toInput = within(fieldset).getByLabelText("to");

    await userEvent.selectOptions(fromInput, "1945");
    await userEvent.selectOptions(toInput, "1959");
    await userEvent.selectOptions(fromInput, "1976");
    await userEvent.selectOptions(toInput, "1950");

    expect(screen.getByTestId("poster-list")).toMatchSnapshot();
  });

  it("can filter by viewing year", async () => {
    expect.hasAssertions();

    render(<ViewingsIndexPage data={data} />);

    const fieldset = screen.getByRole("group", { name: "Viewing Year" });
    const fromInput = within(fieldset).getByLabelText("From");
    const toInput = within(fieldset).getByLabelText("to");

    await userEvent.selectOptions(fromInput, "2020");
    await userEvent.selectOptions(toInput, "2021");

    expect(screen.getByTestId("poster-list")).toMatchSnapshot();
  });

  it("can filter by viewing year reversed", async () => {
    expect.hasAssertions();

    render(<ViewingsIndexPage data={data} />);

    const fieldset = screen.getByRole("group", { name: "Viewing Year" });
    const fromInput = within(fieldset).getByLabelText("From");
    const toInput = within(fieldset).getByLabelText("to");

    await userEvent.selectOptions(fromInput, "2020");
    await userEvent.selectOptions(toInput, "2021");
    await userEvent.selectOptions(fromInput, "2022");
    await userEvent.selectOptions(toInput, "2020");

    expect(screen.getByTestId("poster-list")).toMatchSnapshot();
  });

  it("can filter by genres", async () => {
    expect.hasAssertions();
    render(<ViewingsIndexPage data={data} />);

    const selectElement = screen.getByLabelText("Genres");

    await select(selectElement, ["Horror", "Comedy"]);

    expect(screen.getByTestId("poster-list")).toMatchSnapshot();
  });

  it("can show more titles", async () => {
    expect.hasAssertions();

    render(<ViewingsIndexPage data={data} />);

    await userEvent.click(screen.getByText("Show More..."));

    expect(screen.getByTestId("poster-list")).toMatchSnapshot();
  });
});
