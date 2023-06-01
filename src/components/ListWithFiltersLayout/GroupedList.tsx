import { Box, IBoxProps } from "../Box";
import { Spacer } from "../Spacer";

import { stickyGroupHeaderStyle } from "./GroupedList.css";
import { ListInfo } from "./ListInfo";
import { ShowMoreButton } from "./ShowMoreButton";

interface GroupedListProps<T> extends Omit<IBoxProps, "children"> {
  groupedItems: Map<string, Iterable<T>>;
  visibleCount: number;
  totalCount: number;
  onShowMore: () => void;
  children: (item: T) => React.ReactNode;
}

export function GroupedList<T>({
  groupedItems,
  visibleCount,
  totalCount,
  onShowMore,
  children,
  ...rest
}: GroupedListProps<T>): JSX.Element {
  return (
    <>
      <ListInfo visibleCount={visibleCount} totalCount={totalCount} />

      <Box as="ol" {...rest}>
        {[...groupedItems].map((groupedItem, index) => {
          const [group, groupItems] = groupedItem;

          return (
            <GroupingListItem
              groupText={group}
              key={group}
              zIndex={index + 100}
            >
              <Box as="ol">{[...groupItems].map(children)}</Box>
            </GroupingListItem>
          );
        })}
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        paddingX="pageMargin"
      >
        {totalCount > visibleCount && (
          <>
            <Spacer axis="vertical" size={32} />
            <ShowMoreButton onClick={onShowMore} />
            <Spacer axis="vertical" size={32} />
          </>
        )}
      </Box>
    </>
  );
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
          paddingX={{ default: "gutter", tablet: 24 }}
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
