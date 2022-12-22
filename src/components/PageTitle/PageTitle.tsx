import { Box, IBoxProps } from "../Box";
import { typographyStyle } from "./PageTitle.css";

export function PageTitle({ children, ...rest }: IBoxProps): JSX.Element {
  return (
    <Box as="h1" className={typographyStyle} {...rest}>
      {children}
    </Box>
  );
}
