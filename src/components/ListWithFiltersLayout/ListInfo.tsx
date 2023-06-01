import { Box } from "../Box";
import { stickyStyle } from "./ListInfo.css";

export function ListInfo({
  visibleCount,
  totalCount,
}: {
  visibleCount: number;
  totalCount: number;
}): JSX.Element {
  let showingText;

  if (visibleCount > totalCount) {
    showingText = `Showing ${totalCount.toLocaleString()} of ${totalCount.toLocaleString()}`;
  } else {
    showingText = `Showing 1-${visibleCount.toLocaleString()} of ${totalCount.toLocaleString()}`;
  }

  return (
    <Box
      color="subtle"
      paddingX="gutter"
      textAlign="center"
      backgroundColor="default"
      lineHeight={36}
      className={stickyStyle}
    >
      {showingText}
    </Box>
  );
}
