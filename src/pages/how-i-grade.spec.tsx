import { render } from "@testing-library/react";
import HowIGradePage, { Head } from "./how-i-grade";
import { data } from "./how-i-grade.fixtures";

describe("/how-i-grade", () => {
  it("renders", () => {
    const { asFragment } = render(<HowIGradePage data={data} />);

    expect(asFragment()).toMatchSnapshot();
  });

  it("sets page title", () => {
    render(<Head />);

    expect(document.title).toStrictEqual("How I Grade");
  });
});
