import { Box, IBoxProps } from "../Box";
import { Link } from "../Link";
import { navColumnGapStyle } from "./Nav.css";

function NavItem({
  to,
  children,
  activeClassName,
}: {
  to: string;
  children: React.ReactNode;
  activeClassName?: string;
}): JSX.Element {
  return (
    <Box as="li" display="block" letterSpacing={0.5} whiteSpace="nowrap">
      <Link color="inherit" activeClassName={activeClassName} to={to}>
        {children}
      </Link>
    </Box>
  );
}

interface INavProps extends IBoxProps {
  activeClassName?: string;
}

export function Nav({ activeClassName, justifyContent, ...rest }: INavProps) {
  return (
    <Box as="nav" {...rest}>
      <Box
        as="ul"
        display="flex"
        flexWrap="wrap"
        justifyContent={justifyContent}
        rowGap={8}
        className={navColumnGapStyle}
      >
        <NavItem activeClassName={activeClassName} to="/">
          Home
        </NavItem>
        <NavItem activeClassName={activeClassName} to="/about/">
          About
        </NavItem>
        <NavItem activeClassName={activeClassName} to="/how-i-grade/">
          How I Grade
        </NavItem>
        <NavItem activeClassName={activeClassName} to="/reviews/">
          Reviews
        </NavItem>
        <NavItem activeClassName={activeClassName} to="/stats/">
          Stats
        </NavItem>
        <NavItem activeClassName={activeClassName} to="/watchlist/">
          Watchlist
        </NavItem>
      </Box>
    </Box>
  );
}
