import { render } from "@testing-library/react";
import HomePage, { Head } from ".";
import { data } from "./index.fixtures";

describe("/", () => {
  it("renders home page", () => {
    const { asFragment } = render(<HomePage data={data} />);

    expect(asFragment()).toMatchSnapshot();
  });

  it("sets page title for first page", () => {
    render(<Head />);

    expect(document.title).toStrictEqual(
      "Frank's Movie Log: My Life at the Movies",
    );
  });
});
