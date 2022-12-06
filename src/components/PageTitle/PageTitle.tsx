import { Box, IBoxProps } from "../Box";
import { headingStyle } from "./PageTitle.css";

export function PageTitle({ children }: IBoxProps): JSX.Element {
  return (
    <Box as="h1" className={headingStyle}>
      {children}
    </Box>
  );
}
