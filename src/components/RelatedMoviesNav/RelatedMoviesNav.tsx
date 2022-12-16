import type { IBoxProps } from "../Box";
import { Box } from "../Box";

export function RelatedMoviesNav({ children }: IBoxProps) {
  return (
    <Box
      as="nav"
      position="relative"
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      {children}
    </Box>
  );
}
