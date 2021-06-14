// eslint-disable-next-line import/no-extraneous-dependencies
import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import ViewingsPage from "./viewings";

jest.mock("../components/Seo/Seo.tsx");

const data = {
  viewing: {
    nodes: [
      {
        sequence: 1113,
        viewingDate: "Saturday Jun 12, 2021",
        releaseDate: "Thursday Feb 9, 1989",
        title: "Weekend at Bernie's",
        venue: "Hulu",
        year: 1989,
        sortTitle: "Weekend at Bernie's (1989)",
        slug: "weekend-at-bernies-1989",
      },
      {
        sequence: 1112,
        viewingDate: "Thursday Jun 10, 2021",
        releaseDate: "Friday Jul 23, 1976",
        title: "The Human Tornado",
        venue: "Blu-ray",
        year: 1976,
        sortTitle: "Human Tornado (1976)",
        slug: "the-human-tornado-1976",
      },
      {
        sequence: 1111,
        viewingDate: "Thursday Jun 10, 2021",
        releaseDate: "Friday Mar 12, 2010",
        title: "Gone with the Pope",
        venue: "Arrow Player",
        year: 2010,
        sortTitle: "Gone with the Pope (2010)",
        slug: "gone-with-the-pope-2010",
      },
      {
        sequence: 1,
        viewingDate: "Thursday Jan 5, 2012",
        releaseDate: "Monday Dec 12, 2011",
        title: "The Girl with the Dragon Tattoo",
        venue: "AMC Tysons Corner 16",
        year: 2011,
        sortTitle: "Girl with the Dragon Tattoo (2011)",
        slug: null,
      },
    ],
  },
};

describe("/viewings", () => {
  it("renders", () => {
    const { asFragment } = render(<ViewingsPage data={data} />);

    expect(asFragment()).toMatchSnapshot();
  });

  // Helmet uses requestAnimationFrame to ensure DOM is synced.
  // https://github.com/nfl/react-helmet/blob/master/test/HelmetDeclarativeTest.js
  // eslint-disable-next-line jest/no-done-callback
  it("sets page title", (done) => {
    expect.hasAssertions();
    render(<ViewingsPage data={data} />);

    requestAnimationFrame(() => {
      expect(document.title).toStrictEqual("Viewing Log");
      done();
    });
  });

  it("can filter by title", async () => {
    expect.hasAssertions();
    render(<ViewingsPage data={data} />);

    act(() => {
      jest.useFakeTimers(); // For the debouced input
      userEvent.type(screen.getByLabelText("Title"), "Human Tornado");
      jest.runOnlyPendingTimers(); // Flush the delay
      jest.useRealTimers();
    });

    await waitFor(() => {
      expect(screen.getByTestId("viewings-list")).toMatchInlineSnapshot(`
<ol
  class="listCss"
  data-testid="viewings-list"
>
  <li
    class="listItemCss listItemFirstCss"
    value="1112"
  >
    <div
      class="listItemTitleCss"
    >
      <a
        class="listItemTitleLinkCss"
        href="/reviews/the-human-tornado-1976/#1112"
        rel="canonical"
      >
        The Human Tornado
         
        <span
          class="listItemTitleYearCss"
        >
          1976
        </span>
      </a>
    </div>
    <div
      class="listItemSlugCss"
    >
      Thursday Jun 10, 2021
       via 
      Blu-ray
    </div>
  </li>
</ol>
`);
    });
  });

  it("can filter by venue", () => {
    expect.hasAssertions();
    render(<ViewingsPage data={data} />);

    userEvent.selectOptions(screen.getByLabelText("Venue"), "Arrow Player");

    expect(screen.getByTestId("viewings-list")).toMatchInlineSnapshot(`
<ol
  class="listCss"
  data-testid="viewings-list"
>
  <li
    class="listItemCss listItemFirstCss"
    value="1111"
  >
    <div
      class="listItemTitleCss"
    >
      <a
        class="listItemTitleLinkCss"
        href="/reviews/gone-with-the-pope-2010/#1111"
        rel="canonical"
      >
        Gone with the Pope
         
        <span
          class="listItemTitleYearCss"
        >
          2010
        </span>
      </a>
    </div>
    <div
      class="listItemSlugCss"
    >
      Thursday Jun 10, 2021
       via 
      Arrow Player
    </div>
  </li>
</ol>
`);
  });

  it("can filter by venue then show all", () => {
    render(<ViewingsPage data={data} />);

    userEvent.selectOptions(screen.getByLabelText("Venue"), "Arrow Player");
    userEvent.selectOptions(screen.getByLabelText("Venue"), "All");

    expect(screen.getByTestId("viewings-list")).toMatchSnapshot();
  });

  it("can sort by viewing date with newest first", () => {
    render(<ViewingsPage data={data} />);

    userEvent.selectOptions(
      screen.getByLabelText("Order By"),
      "Viewing Date (Newest First)"
    );

    expect(screen.getByTestId("viewings-list")).toMatchSnapshot();
  });

  it("can sort by viewing date with oldest first", () => {
    render(<ViewingsPage data={data} />);

    userEvent.selectOptions(
      screen.getByLabelText("Order By"),
      "Viewing Date (Oldest First)"
    );

    expect(screen.getByTestId("viewings-list")).toMatchSnapshot();
  });

  it("can sort by title", () => {
    render(<ViewingsPage data={data} />);

    userEvent.selectOptions(screen.getByLabelText("Order By"), "Title");

    expect(screen.getByTestId("viewings-list")).toMatchSnapshot();
  });

  it("can sort by release date with oldest first", () => {
    render(<ViewingsPage data={data} />);

    userEvent.selectOptions(
      screen.getByLabelText("Order By"),
      "Release Date (Oldest First)"
    );

    expect(screen.getByTestId("viewings-list")).toMatchSnapshot();
  });

  it("can sort by release date with newest first", () => {
    render(<ViewingsPage data={data} />);

    userEvent.selectOptions(
      screen.getByLabelText("Order By"),
      "Release Date (Newest First)"
    );

    expect(screen.getByTestId("viewings-list")).toMatchSnapshot();
  });

  it("can filter by release year", () => {
    render(<ViewingsPage data={data} />);

    const inputs = screen.getAllByLabelText("Release Year");

    userEvent.clear(inputs[0]);
    userEvent.type(inputs[0], "1980");
    userEvent.clear(inputs[1]);
    userEvent.type(inputs[1], "2010");

    expect(screen.getByTestId("viewings-list")).toMatchInlineSnapshot(`
<ol
  class="listCss"
  data-testid="viewings-list"
>
  <li
    class="listItemCss listItemFirstCss"
    value="1113"
  >
    <div
      class="listItemTitleCss"
    >
      <a
        class="listItemTitleLinkCss"
        href="/reviews/weekend-at-bernies-1989/#1113"
        rel="canonical"
      >
        Weekend at Bernie's
         
        <span
          class="listItemTitleYearCss"
        >
          1989
        </span>
      </a>
    </div>
    <div
      class="listItemSlugCss"
    >
      Saturday Jun 12, 2021
       via 
      Hulu
    </div>
  </li>
  <li
    class="listItemCss "
    value="1111"
  >
    <div
      class="listItemTitleCss"
    >
      <a
        class="listItemTitleLinkCss"
        href="/reviews/gone-with-the-pope-2010/#1111"
        rel="canonical"
      >
        Gone with the Pope
         
        <span
          class="listItemTitleYearCss"
        >
          2010
        </span>
      </a>
    </div>
    <div
      class="listItemSlugCss"
    >
      Thursday Jun 10, 2021
       via 
      Arrow Player
    </div>
  </li>
</ol>
`);
  });
});
