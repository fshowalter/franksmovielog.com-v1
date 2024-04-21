import type { IBoxProps } from "../Box";
import { Box } from "../Box";

export function StillListNav({ children }: IBoxProps) {
  return (
    <Box
      as="nav"
      position="relative"
      display="flex"
      flexDirection="column"
      alignItems="center"
      width={{ default: "full", tablet: "unset" }}
    >
      {children}
    </Box>
  );
}
