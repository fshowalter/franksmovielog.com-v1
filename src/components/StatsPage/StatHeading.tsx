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
      fontSize="statHeading"
      position="sticky"
      top={HEADER_HEIGHT}
      paddingX={24}
      paddingY={8}
      zIndex={100}
      fontWeight="normal"
    >
      {children}
    </Box>
  );
}
