import { useRef } from "react";
import { Box } from "../Box";
import { Layout } from "../Layout";
import { Link } from "../Link";
import { HomePageItem } from "./HomePageItem";

export function Home({
  items,
}: {
  items: readonly Queries.HomePageItemFragment[];
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
              />
            );
          })}
        </Box>
        <Link
          to="/reviews/"
          paddingX="pageMargin"
          paddingY={40}
          justifyContent="flex-end"
          display="flex"
          fontSize="medium"
        >
          All Reviews →
        </Link>
      </Box>
    </Layout>
  );
}
