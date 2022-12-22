import { HEADER_HEIGHT } from "../../styles/sizes.css";
import { Box } from "../Box";

export function StatHeading({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <Box
      as="h3"
      backgroundColor="canvas"
      fontSize="medium"
      position="sticky"
      top={{ default: 0, desktop: HEADER_HEIGHT }}
      paddingX="gutter"
      paddingY={8}
      zIndex={500}
      fontWeight="normal"
    >
      {children}
    </Box>
  );
}
