import { render } from "@testing-library/react";
import AboutPage, { Head } from "./about";
import { data } from "./about.fixtures";

describe("/about", () => {
  it("renders", () => {
    const { asFragment } = render(<AboutPage data={data} />);

    expect(asFragment()).toMatchSnapshot();
  });

  it("sets page title", () => {
    render(<Head />);

    expect(document.title).toEqual("About");
  });
});
