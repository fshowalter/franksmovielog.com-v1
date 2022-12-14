import { Box, IBoxProps } from "../Box";

export function ReviewSubHeading({ as = "h2", children, ...rest }: IBoxProps) {
  return (
    <Box
      as={as}
      color="subtle"
      fontSize="reviewSubHeading"
      fontWeight="normal"
      letterSpacing={0.2}
      boxShadow="borderBottom"
      {...rest}
    >
      {children}
    </Box>
  );
}
