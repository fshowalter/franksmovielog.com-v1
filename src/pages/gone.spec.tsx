// eslint-disable-next-line import/no-extraneous-dependencies
import { render } from "@testing-library/react";
import GonePage, { Head } from "./gone";
import data from "./gone.fixtures";

describe("/gone", () => {
  it("renders", () => {
    const { asFragment } = render(<GonePage data={data} />);

    expect(asFragment()).toMatchSnapshot();
  });

  it("sets page title", () => {
    render(<Head />);

    expect(document.title).toStrictEqual("410: Gone");
  });
});
