import type { IBoxProps } from "../Box";
import { Box } from "../Box";

export function RelatedMoviesNav({ children }: IBoxProps) {
  return (
    <Box
      as="nav"
      // boxShadow={{ default: "unset", desktop: "borderAll" }}
      borderRadius={8}
      // backgroundColor={{ default: "default", desktop: "zebra" }}
      width={{ default: "unset", desktop: "full" }}
      position="relative"
    >
      {children}
    </Box>
  );
}
