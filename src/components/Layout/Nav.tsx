import { Link } from "gatsby";
import composeClassNames from "../../utils/composeClassNames";
import Box from "../Box";
import { activeLinkStyle, linkStyle } from "./Nav.css";

type NavItemProps = {
  to: string;
  children: React.ReactNode;
};

function NavItem({ to, children }: NavItemProps): JSX.Element {
  return (
    <Box
      as="li"
      color="accent"
      display="block"
      position="relative"
      whiteSpace="nowrap"
    >
      <Link to={to} className={linkStyle} activeClassName={activeLinkStyle}>
        {children}
      </Link>
    </Box>
  );
}

export default function Nav({ className }: { className: string }) {
  return (
    <nav className={composeClassNames(className)}>
      <Box
        as="ul"
        display="flex"
        columnGap={{ mobile: "3", tablet: "4" }}
        flexDirection={{ mobile: "row", max: "column" }}
        flexWrap="wrap"
        fontSize="2"
        justifyContent={{ mobile: "center", desktop: "flex-start" }}
        rowGap="2"
        lineHeight="4"
        whiteSpace="nowrap"
        letterSpacing="5"
        paddingX={{ tablet: "4", desktop: "0" }}
      >
        <NavItem to="/">Home</NavItem>
        <NavItem to="/about/">About</NavItem>
        <NavItem to="/how-i-grade/">How I Grade</NavItem>
        <NavItem to="/reviews/">Reviews</NavItem>
        <NavItem to="/stats/">Stats</NavItem>
        <NavItem to="/watchlist/">Watchlist</NavItem>
      </Box>
    </nav>
  );
}
