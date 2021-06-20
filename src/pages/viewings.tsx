import { graphql } from "gatsby";
import React from "react";
import Seo from "../components/Seo";
import ViewingsPage from "../components/ViewingsPage";

/**
 * Renders the viewings page.
 */
export default function ViewingsPageShell({
  data,
}: {
  data: PageQueryResult;
}): JSX.Element {
  return (
    <>
      <Seo
        pageTitle="Viewing Log"
        description="A sortable and filterable list of every movie I've watched since 2012."
        image={null}
        article={false}
      />
      <ViewingsPage data={data} />
    </>
  );
}

interface PageQueryResult {
  viewing: {
    nodes: {
      title: string;
      year: number;
      releaseDate: string;
      viewingDate: string;
      sequence: number;
      venue: string;
      sortTitle: string;
      slug: string | null;
    }[];
  };
}

export const pageQuery = graphql`
  query {
    viewing: allViewingsJson(sort: { fields: [sequence], order: DESC }) {
      nodes {
        sequence
        viewingDate: viewing_date(formatString: "dddd MMM D, YYYY")
        releaseDate: release_date
        title
        venue
        year
        sortTitle: sort_title
        slug
      }
    }
  }
`;
