import { Box, IBoxProps } from "../Box";
import { Container } from "../Container";
import { ExternalLink } from "../Link";
import ScreenReaderOnly from "../ScreenReaderOnly";
import { Spacer } from "../Spacer";
import Nav from "./Nav";

export default function Footer({ ...rest }: IBoxProps) {
  return (
    <Container
      as="footer"
      variant="fullWidth"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyItems="center"
      color="inverse"
      backgroundImage="ripNotComingSoon"
      {...rest}
    >
      <Spacer axis="vertical" size={{ mobile: 24, desktop: 32 }} />
      <Nav variant="footer" />
      <Spacer axis="vertical" size={{ mobile: 24, desktop: 32 }} />
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
      <Spacer axis="vertical" size={{ mobile: 24, desktop: 32 }} />
    </Container>
  );
}
