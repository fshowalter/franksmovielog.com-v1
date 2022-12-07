import { Box, IBoxProps } from "../Box";
import { gridAreaComponent, gridComponent } from "../Grid";
import { ExternalLink } from "../Link";
import { gridAreas, gridStyle } from "./Footer.css";
import Nav from "./Nav";

const Grid = gridComponent(gridStyle);
const GridArea = gridAreaComponent(gridAreas);

export default function Footer({ ...rest }: IBoxProps) {
  return (
    <Grid
      as="footer"
      color="inverse"
      backgroundImage="ripNotComingSoon"
      {...rest}
    >
      <GridArea name="nav">
        <Nav variant="footer" />
      </GridArea>
      <GridArea name="fairUse">
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
      </GridArea>
      <Box as="a" href="#top" screenReaderOnly={true}>
        To the top ↑
      </Box>
    </Grid>
  );
}
