import { Box, IBoxProps } from "../Box";

export function ListItem({ children, ...rest }: IBoxProps) {
  return (
    <Box
      as="li"
      flexDirection="row"
      columnGap={{ default: 16, tablet: 24 }}
      backgroundColor="zebra"
      paddingX={{ default: "gutter", tablet: 24 }}
      paddingY={16}
      display="flex"
      {...rest}
    >
      {children}
    </Box>
  );
}
