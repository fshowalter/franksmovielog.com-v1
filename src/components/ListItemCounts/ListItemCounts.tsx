import { Box } from "../Box";

import { countMarginStyle } from "./ListItemCounts.css";

export function ListItemCounts({
  current,
  total,
}: {
  current: number;
  total: number;
}): JSX.Element {
  if (current === total) {
    return <Box className={countMarginStyle}>{total}</Box>;
  }

  return (
    <Box className={countMarginStyle}>
      {current} / {total}
    </Box>
  );
}
