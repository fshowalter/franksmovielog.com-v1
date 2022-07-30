// eslint-disable-next-line import/no-extraneous-dependencies
import { render } from "@testing-library/react";
import NotFoundPage, { Head } from "./404";
import data from "./404.fixtures";

describe("/404", () => {
  it("renders", () => {
    const { asFragment } = render(<NotFoundPage data={data} />);

    expect(asFragment()).toMatchSnapshot();
  });

  it("sets page title", () => {
    render(<Head />);

    expect(document.title).toEqual("404: Not Found");
  });
});
