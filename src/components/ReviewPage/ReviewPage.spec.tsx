// eslint-disable-next-line import/no-extraneous-dependencies
import { render } from "@testing-library/react";
import ReviewPage, { Head } from "./ReviewPage";
import data from "./ReviewPage.fixtures";

describe("/reviews/{slug}", () => {
  it("renders", () => {
    const { asFragment } = render(<ReviewPage data={data} />);

    expect(asFragment()).toMatchSnapshot();
  });

  it("sets page title", () => {
    render(<Head data={data} />);

    expect(document.title).toStrictEqual("Rio Bravo (1959)");
  });
});
