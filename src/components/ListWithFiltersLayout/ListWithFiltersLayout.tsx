import { useRef } from "react";
import { Box } from "../Box";
import { Layout } from "../Layout";
import { Spacer } from "../Spacer";
import { Filters } from "./Filters";

export function ListWithFiltersLayout({
  header,
  filters,
  list,
}: {
  header: React.ReactNode;
  filters: React.ReactNode;
  list: React.ReactNode;
}): JSX.Element {
  const listHeader = useRef<HTMLDivElement>(null);

  return (
    <Layout>
      <Box
        as="main"
        display="flex"
        flexDirection={{ default: "column", desktop: "row" }}
        paddingX={{ default: 0, desktop: "pageMargin" }}
        columnGap={96}
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          paddingX={{ default: "gutter", desktop: 0 }}
          paddingTop={32}
          flexBasis={360}
        >
          <Box maxWidth="prose">{header}</Box>
          <Spacer axis="vertical" size={32} />
          <Filters>{filters}</Filters>
          <Spacer axis="vertical" size={32} />
        </Box>
        <Box
          name="list"
          innerRef={listHeader}
          display="flex"
          flexDirection="column"
          flexGrow={1}
        >
          <Spacer axis="vertical" size={{ default: 0, desktop: 32 }} />
          {list}
        </Box>
      </Box>
    </Layout>
  );
}
