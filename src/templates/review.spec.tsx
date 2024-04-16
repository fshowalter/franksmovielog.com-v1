import { render } from "@testing-library/react";
import ReviewPage, { Head } from "./review";
import { data } from "./review.fixtures";

describe("/reviews/{slug}", () => {
  it("renders", () => {
    const { asFragment } = render(<ReviewPage data={data} />);

    expect(asFragment()).toMatchSnapshot();
  });

  it("sets page title", () => {
    render(<Head data={data} />);

    expect(document.title).toStrictEqual("Horror of Dracula (1958)");
  });
});
