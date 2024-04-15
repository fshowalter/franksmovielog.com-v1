import { act, render, screen, within } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import CastAndCrewMember, { Head } from "./castAndCrewMember";
import { data } from "./castAndCrewMember.fixtures";

describe("/cast-and-crew/{slug}", () => {
  it("renders", () => {
    const { asFragment } = render(<CastAndCrewMember data={data} />);

    expect(asFragment()).toMatchSnapshot();
  });

  it("sets page title", () => {
    render(<Head data={data} />);

    expect(document.title).toStrictEqual("Ingmar Bergman");
  });

  it("can filter by title", async () => {
    expect.hasAssertions();
    render(<CastAndCrewMember data={data} />);

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      await userEvent.type(
        screen.getByLabelText("Title"),
        "Man Who Shot Liberty Valance",
      );
      await new Promise((r) => setTimeout(r, 500));
    });

    expect(screen.getByTestId("poster-list")).toMatchSnapshot();
  });

  it("can sort by title", async () => {
    expect.hasAssertions();

    render(<CastAndCrewMember data={data} />);

    await userEvent.selectOptions(screen.getByLabelText("Order By"), "Title");

    expect(screen.getByTestId("poster-list")).toMatchSnapshot();
  });

  it("can sort by release date with oldest first", async () => {
    expect.hasAssertions();

    render(<CastAndCrewMember data={data} />);

    await userEvent.selectOptions(
      screen.getByLabelText("Order By"),
      "Release Date (Oldest First)",
    );

    expect(screen.getByTestId("poster-list")).toMatchSnapshot();
  });

  it("can sort by release date with newest first", async () => {
    expect.hasAssertions();

    render(<CastAndCrewMember data={data} />);

    await userEvent.selectOptions(
      screen.getByLabelText("Order By"),
      "Release Date (Newest First)",
    );

    expect(screen.getByTestId("poster-list")).toMatchSnapshot();
  });

  it("can sort by grade with best first", async () => {
    expect.hasAssertions();

    render(<CastAndCrewMember data={data} />);

    await userEvent.selectOptions(
      screen.getByLabelText("Order By"),
      "Grade (Best First)",
    );

    expect(screen.getByTestId("poster-list")).toMatchSnapshot();
  });

  it("can sort by grade with worst first", async () => {
    expect.hasAssertions();

    render(<CastAndCrewMember data={data} />);

    await userEvent.selectOptions(
      screen.getByLabelText("Order By"),
      "Grade (Worst First)",
    );

    expect(screen.getByTestId("poster-list")).toMatchSnapshot();
  });

  it("can filter by release year", async () => {
    expect.hasAssertions();

    render(<CastAndCrewMember data={data} />);

    const fieldset = screen.getByRole("group", { name: "Release Year" });
    const fromInput = within(fieldset).getByLabelText("From");
    const toInput = within(fieldset).getByLabelText("to");

    await userEvent.selectOptions(fromInput, "1950");
    await userEvent.selectOptions(toInput, "1960");

    expect(screen.getByTestId("poster-list")).toMatchSnapshot();
  });

  it("can hide reviewed titles", async () => {
    expect.hasAssertions();

    render(<CastAndCrewMember data={data} />);

    await userEvent.click(screen.getByText("Hide Reviewed"));

    expect(screen.getByTestId("poster-list")).toMatchSnapshot();
  });

  it("can show hidden reviewed titles", async () => {
    expect.hasAssertions();

    render(<CastAndCrewMember data={data} />);

    await userEvent.click(screen.getByText("Hide Reviewed"));
    await userEvent.click(screen.getByText("Show Reviewed"));

    expect(screen.getByTestId("poster-list")).toMatchSnapshot();
  });
});
