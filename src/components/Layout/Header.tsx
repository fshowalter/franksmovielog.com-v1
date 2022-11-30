import { Link } from "gatsby";
import composeClassNames from "../../utils/composeClassNames";
import Box from "../Box";
import {
  gridAreaNavStyle,
  gridAreaSearchStyle,
  gridAreaTaglineStyle,
  gridAreaTitleStyle,
  gridContainerStyle,
  taglineStyle,
} from "./Header.css";
import Nav from "./Nav";
import SearchForm from "./SearchForm";

export default function Header({ className }: { className: string }) {
  return (
    <Box
      as="header"
      className={composeClassNames(className, gridContainerStyle)}
    >
      <Box
        as="h1"
        fontSize={{ mobile: "3", desktop: "4", max: "3" }}
        lineHeight="5"
        whiteSpace="nowrap"
        className={gridAreaTitleStyle}
      >
        <Link to="/">Frank&apos;s Movie Log</Link>
      </Box>
      <Box
        as="p"
        lineHeight={{ mobile: "3", desktop: "4" }}
        color="muted"
        className={composeClassNames(gridAreaTaglineStyle, taglineStyle)}
      >
        My life at the movies.
      </Box>
      <SearchForm className={gridAreaSearchStyle} />
      <Nav className={gridAreaNavStyle} />
    </Box>
  );
}
