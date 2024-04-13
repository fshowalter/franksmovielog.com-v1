import { Box, IBoxProps } from "../Box";
import { Grade } from "../Grade";
import { ListItem } from "../ListItem";
import { ListItemPoster } from "../ListItemPoster";
import { ListItemTitle } from "../ListItemTitle";
import { Spacer } from "../Spacer";
import { stickyGroupHeaderStyle, stickySummaryStyle } from "./CreditsList.css";

interface CreditsListProps extends Omit<IBoxProps, "children"> {
  groupedItems: Map<string, Iterable<Queries.CastAndCrewMemberTitleFragment>>;
  summaryText: string;
  titleCount: number;
}

export function CreditsList({
  groupedItems,
  titleCount,
  summaryText,
  ...rest
}: CreditsListProps): React.ReactNode {
  if (titleCount === 0) {
    return null;
  }

  return (
    <>
      <Box as="section" boxShadow="borderAll">
        <Box as="details" open>
          <Box
            color="subtle"
            paddingX={{ default: "gutter", tablet: 24 }}
            paddingY={16}
            backgroundColor="subtle"
            lineHeight={36}
            className={stickySummaryStyle}
            as="summary"
          >
            <Box as="h2" fontSize="medium2" display="inline-block">
              {summaryText}{" "}
              <Box
                as="span"
                fontSize="default"
                color="subtle"
                fontWeight="normal"
              >
                ({titleCount} titles)
              </Box>
            </Box>
          </Box>

          <Box as="ol" {...rest}>
            {[...groupedItems].map((groupedItem, index) => {
              const [group, groupItems] = groupedItem;

              return (
                <GroupingListItem
                  groupText={group}
                  key={group}
                  zIndex={index + 100}
                >
                  <Box as="ol">
                    {[...groupItems].map((item) => {
                      return <CreditsListItem title={item} key={item.imdbId} />;
                    })}
                  </Box>
                </GroupingListItem>
              );
            })}
          </Box>
        </Box>
      </Box>
      <Spacer axis="vertical" size={{ default: 32, tablet: 64 }} />
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
      {children}
    </Box>
  );
}

function CreditsListItem({
  title,
}: {
  title: Queries.CastAndCrewTitleFragment;
}): JSX.Element {
  return (
    <ListItem alignItems="center" paddingY={{ default: 16, tablet: 32 }}>
      <ListItemPoster
        slug={title.slug}
        image={title.poster}
        title={title.title}
        year={title.year}
        flexShrink={0}
      />
      <Box
        flexGrow={1}
        width={{ tablet: "full" }}
        paddingRight={{ default: "gutter", desktop: 16 }}
      >
        <Box>
          <ListItemTitle
            title={title.title}
            year={title.year}
            slug={title.slug}
          />
          <Spacer axis="vertical" size={4} />
          {title.grade && <Grade grade={title.grade} height={18} />}
          <Spacer axis="vertical" size={8} />
        </Box>
      </Box>
    </ListItem>
  );
}
