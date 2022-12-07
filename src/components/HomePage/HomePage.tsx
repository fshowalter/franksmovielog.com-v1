import { graphql } from "gatsby";
import { useRef } from "react";
import { gridAreaComponent, gridComponent } from "../Grid";
import Layout from "../Layout";
import { gridAreas, gridStyle } from "./HomePage.css";
import Item from "./Item";
import Pagination from "./Pagination";

const GridArea = gridAreaComponent(gridAreas);

const Grid = gridComponent(gridStyle);

export interface PageContext {
  limit: number;
  skip: number;
  numberOfItems: number;
  currentPage: number;
}

export { Head } from "./Head";

export default function HomePage({
  pageContext,
  data,
}: {
  pageContext: PageContext;
  data: NonNullable<Queries.HomePageQuery>;
}): JSX.Element {
  const listHeader = useRef<HTMLDivElement>(null);
  const { viewings } = data;

  return (
    <Layout>
      <Grid as="main" ref={listHeader}>
        <GridArea name="list">
          <ol>
            {viewings.map((viewing, index) => {
              return (
                <Item
                  key={viewing.sequence}
                  viewing={viewing}
                  eagerLoadImage={index === 0}
                  counterValue={
                    pageContext.numberOfItems - pageContext.skip - index
                  }
                />
              );
            })}
          </ol>
        </GridArea>
        <GridArea name="pagination">
          <Pagination
            currentPage={pageContext.currentPage}
            urlRoot="/"
            perPage={pageContext.limit}
            numberOfItems={pageContext.numberOfItems}
            prevText="Newer"
            nextText="Older"
          />
        </GridArea>
      </Grid>
    </Layout>
  );
}

export const pageQuery = graphql`
  query HomePage($skip: Int!, $limit: Int!) {
    viewings: viewingsWithReviews(
      sort: { fields: sequence, order: DESC }
      limit: $limit
      skip: $skip
    ) {
      imdbId
      sequence
      title
      year
      date: viewingDate(formatString: "DD MMM, YYYY")
      slug
      grade
      principalCastNames
      directorNames
      excerpt
      backdrop {
        childImageSharp {
          gatsbyImageData(
            layout: CONSTRAINED
            formats: [JPG, AVIF]
            quality: 80
            width: 640
            placeholder: TRACED_SVG
          )
        }
      }
    }
  }
`;
