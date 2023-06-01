import { useRef } from "react";
import { Box } from "../Box";
import { Layout } from "../Layout";
import { HomePageItem } from "./HomePageItem";
import { Pagination } from "./Pagination";

export function Home({
  items,
  currentPageNumber,
  numberOfItems,
  skip,
  limit,
}: {
  items: readonly Queries.HomePageItemFragment[];
  currentPageNumber: number;
  numberOfItems: number;
  skip: number;
  limit: number;
}): JSX.Element {
  const listHeader = useRef<HTMLDivElement>(null);

  return (
    <Layout>
      <Box as="main" innerRef={listHeader}>
        <Box as="ol" display="flex" flexDirection="column">
          {items.map((item, index) => {
            return (
              <HomePageItem
                key={item.sequence}
                item={item}
                eagerLoadImage={index === 0}
                counterValue={numberOfItems - skip - index}
              />
            );
          })}
        </Box>
        <Pagination
          currentPage={currentPageNumber}
          urlRoot="/"
          perPage={limit}
          numberOfItems={numberOfItems}
          prevText="Newer"
          nextText="Older"
          paddingX="pageMargin"
          paddingY={40}
          justifyContent="center"
        />
      </Box>
    </Layout>
  );
}
