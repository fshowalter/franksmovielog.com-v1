import { Box, IBoxProps } from "../Box";

export function PageTitle({ children, ...rest }: IBoxProps): JSX.Element {
  return (
    <Box
      as="h1"
      paddingY={{ default: 24, desktop: 32 }}
      fontSize="pageTitle"
      textAlign="center"
      {...rest}
    >
      {children}
    </Box>
  );
}
