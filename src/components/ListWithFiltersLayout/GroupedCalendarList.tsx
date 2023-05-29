import { Box } from "../Box";
import { ListItem } from "./List";

import {
  stickyCalendarStyle,
  subListItemStyle,
} from "./GroupedCalendarList.css";

export function GroupedCalendarListItem<T>({
  day,
  date,
  items,
  children,
}: {
  day: string;
  date: string;
  items: T[];
  children: (items: T) => React.ReactNode;
}) {
  return (
    <ListItem paddingBottom={0}>
      <Box alignSelf="flex-start" className={stickyCalendarStyle}>
        <Box boxShadow="borderAll" borderRadius={4}>
          <Box
            backgroundColor="canvas"
            textAlign="center"
            width={48}
            paddingY={8}
            textTransform="uppercase"
            fontSize="small"
          >
            {day}
          </Box>
          <Box textAlign="center" fontSize="large">
            {date}
          </Box>
        </Box>
      </Box>
      <Box
        as="ul"
        display="flex"
        flexDirection="column"
        rowGap={16}
        flexGrow={1}
      >
        {items.map((item) => {
          return children(item);
        })}
      </Box>
    </ListItem>
  );
}

export function GroupedCalendarSubListItem({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <ListItem
      alignItems="flex-start"
      boxShadow="borderBottom"
      paddingTop={0}
      className={subListItemStyle}
      backgroundColor="unset"
    >
      {children}
    </ListItem>
  );
}
