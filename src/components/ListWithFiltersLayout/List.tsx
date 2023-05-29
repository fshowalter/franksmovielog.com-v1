import { Box, IBoxProps } from "../Box";

interface ListProps<T> extends Omit<IBoxProps, "children"> {
  items: Iterable<T>;
  children: (item: T, index: number) => React.ReactNode;
}

export function List<T>({
  items,
  children,
  ...rest
}: ListProps<T>): JSX.Element {
  return (
    <Box as="ol" {...rest}>
      {[...items].map(children)}
    </Box>
  );
}

export function ListItem({ children, ...rest }: IBoxProps) {
  return (
    <Box
      as="li"
      flexDirection="row"
      columnGap={{ default: 16, tablet: 24 }}
      backgroundColor="zebra"
      paddingX={{ default: "gutter", desktop: 16 }}
      paddingY={16}
      display="flex"
      {...rest}
    >
      {children}
    </Box>
  );
}
