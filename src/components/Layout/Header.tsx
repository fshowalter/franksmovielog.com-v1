import { Box, IBoxProps } from "../Box";
import { Link } from "../Link";
import { taglineStyle } from "./Header.css";
import Nav from "./Nav";
import SearchForm from "./SearchForm";

export default function Header({ ...rest }: IBoxProps) {
  return (
    <Box as="header" display="flex" {...rest}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="inherit"
        justifyItems="inherit"
      >
        <Box
          as="h1"
          whiteSpace="nowrap"
          fontWeight="normal"
          fontSize={25}
          lineHeight={32}
        >
          <Link color="default" textDecoration="none" to="/">
            Frank&apos;s Movie Log
          </Link>
        </Box>
        <Box
          as="p"
          color="muted"
          fontStyle="italic"
          lineHeight={16}
          className={taglineStyle}
          width="full"
        >
          My life at the movies.
        </Box>
      </Box>
      <Nav variant="header" />
      <SearchForm maxWidth="prose" />
    </Box>
  );
}
