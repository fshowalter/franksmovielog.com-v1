import { useRef } from "react";
import { Box, IBoxProps } from "../Box";
import { Button } from "../Button";
import { Fieldset } from "../Fieldset";
import { Layout } from "../Layout";
import { Spacer } from "../Spacer";

import { foregroundColors } from "../../styles/colors.css";
import {
  stickyFiltersStyle,
  stickyGroupHeaderStyle,
  stickyListInfoStyle,
} from "./ListWithFiltersLayout.css";

function ListInfo({
  visible,
  total,
}: {
  visible: number;
  total: number;
}): JSX.Element {
  let showingText;

  if (visible > total) {
    showingText = `Showing ${total} of ${total}`;
  } else {
    showingText = `Showing 1-${visible} of ${total.toLocaleString()}`;
  }

  return <div>{showingText}</div>;
}

function GroupingListItem({
  groupText,
  children,
  zIndex,
}: {
  groupText: string;
  children: React.ReactNode;
  zIndex: number;
}) {
  return (
    <Box as="li" display="block">
      <Box
        fontSize="medium"
        style={{ zIndex: zIndex }}
        paddingTop={{ default: 0, desktop: 16 }}
        backgroundColor="default"
        className={stickyGroupHeaderStyle}
      >
        <Box
          backgroundColor="canvas"
          paddingY={8}
          paddingX={{ default: "gutter", desktop: 24 }}
        >
          {groupText}
        </Box>
      </Box>
      <Spacer axis="vertical" size={{ default: 0, tablet: 16 }} />
      {children}
      <Spacer axis="vertical" size={{ default: 0, tablet: 16 }} />
    </Box>
  );
}

interface GroupedListProps<T> extends IBoxProps {
  items: Map<string, T[]>;
  render: (item: T) => React.ReactNode;
}

export function GroupedList<T>({
  items,
  render,
  ...rest
}: GroupedListProps<T>): JSX.Element {
  return (
    <Box as="ol" {...rest}>
      {[...items].map(([group, groupItems], index) => {
        return (
          <GroupingListItem groupText={group} key={group} zIndex={index + 100}>
            <Box
              as="ol"
              paddingX={{
                default: 0,
                tablet: "gutter",
                desktop: 0,
              }}
            >
              {groupItems.map((item) => {
                return render(item);
              })}
            </Box>
          </GroupingListItem>
        );
      })}
    </Box>
  );
}

export function GroupedListItem({ children }: { children: React.ReactNode }) {
  return (
    <Box
      as="li"
      flexDirection="row"
      columnGap={{ default: 16, tablet: 24 }}
      backgroundColor="zebra"
      paddingLeft={{ default: "gutter", desktop: 16 }}
      paddingY={16}
      display="flex"
    >
      {children}
    </Box>
  );
}

export function ListWithFiltersLayout({
  header,
  filters,
  list,
  visibleItems,
  totalItems,
  onMoreClick,
}: {
  header: React.ReactNode;
  filters: React.ReactNode;
  list: React.ReactNode;
  visibleItems: number;
  totalItems: number;
  onMoreClick: () => void;
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
          <Box className={stickyFiltersStyle}>
            <Fieldset legend="Filter & Sort">{filters}</Fieldset>
          </Box>
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
          <Box
            color="subtle"
            paddingX="gutter"
            textAlign="center"
            backgroundColor="default"
            lineHeight={36}
            className={stickyListInfoStyle}
          >
            <ListInfo visible={visibleItems} total={totalItems} />
          </Box>
          {list}
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            paddingX="pageMargin"
          >
            {totalItems > visibleItems && (
              <>
                <Spacer axis="vertical" size={32} />
                <Button
                  paddingX="pageMargin"
                  onClick={onMoreClick}
                  display="flex"
                  columnGap={16}
                >
                  <svg
                    width="24"
                    height="24"
                    focusable="false"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill={foregroundColors.accent}
                  >
                    <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"></path>
                  </svg>
                  Show More...
                </Button>
                <Spacer axis="vertical" size={32} />
              </>
            )}
          </Box>
        </Box>
      </Box>
    </Layout>
  );
}
