import { Box, IBoxProps } from "../Box";
import { ExternalLink } from "../Link";
import { Nav } from "../Nav";

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
      <Box as="a" href="#top" screenReaderOnly={true}>
        To the top ↑
      </Box>
    </Box>
  );
}
