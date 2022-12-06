import { Box, IBoxProps } from "../Box";
import { gridAreaComponent, gridComponent } from "../Grid";
import { Link } from "../Link";
import { gridAreas, gridStyle, taglineStyle, titleStyle } from "./Header.css";
import Nav from "./Nav";
import SearchForm from "./SearchForm";

const Grid = gridComponent(gridStyle);
const GridArea = gridAreaComponent(gridAreas);

export default function Header({ ...rest }: IBoxProps) {
  return (
    <Box as="header" {...rest} display="flex" flexDirection="column">
      <Grid>
        <GridArea name="title">
          <Box
            as="h1"
            lineHeight={32}
            whiteSpace="nowrap"
            fontWeight="normal"
            className={titleStyle}
          >
            <Link color="default" textDecoration="none" to="/">
              Frank&apos;s Movie Log
            </Link>
          </Box>
        </GridArea>
        <GridArea name="tagline">
          <Box as="p" color="muted" className={taglineStyle}>
            My life at the movies.
          </Box>
        </GridArea>
        <GridArea name="search">
          <SearchForm />
        </GridArea>
        <GridArea name="nav">
          <Nav variant="header" />
        </GridArea>
      </Grid>
    </Box>
  );
}
