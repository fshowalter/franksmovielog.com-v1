import { Box, IBoxProps } from "../Box";
import { ExternalLink } from "../Link";
import ScreenReaderOnly from "../ScreenReaderOnly";
import { Nav } from "./Nav";

export function Footer({ ...rest }: IBoxProps) {
  return (
    <Box
      as="footer"
      color="inverse"
      display="flex"
      backgroundImage="ripNotComingSoon"
      {...rest}
    >
      <Nav justifyContent="center" />
      <Box as="p" fontWeight="light" fontSize="small" lineHeight={16}>
        All stills used in accordance with the{" "}
        <ExternalLink
          href="http://www.copyright.gov/title17/92chap1.html#107"
          color="inherit"
          textDecoration="none"
        >
          Fair Use Law.
        </ExternalLink>
      </Box>
      <ScreenReaderOnly>
        <a href="#top">To the top ↑</a>
      </ScreenReaderOnly>
    </Box>
  );
}
