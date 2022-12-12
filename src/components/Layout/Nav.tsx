import { Link } from "gatsby";
import { Box, IBoxProps } from "../Box";
import {
  activeLinkVariants,
  linkVariants,
  listItemVariants,
  listVariants,
  NavVariants,
} from "./Nav.css";

interface NavItemProps {
  to: string;
  children: React.ReactNode;
  variant: NavVariants;
}

function NavItem({ to, children, variant }: NavItemProps): JSX.Element {
  return (
    <Box as="li" className={listItemVariants[variant]}>
      <Link
        to={to}
        className={linkVariants[variant]}
        activeClassName={activeLinkVariants[variant]}
      >
        {children}
      </Link>
    </Box>
  );
}

interface NavProps extends IBoxProps {
  variant: NavVariants;
}

export default function Nav({ variant, ...rest }: NavProps) {
  return (
    <Box as="nav" {...rest}>
      <Box as="ul" className={listVariants[variant]}>
        <NavItem variant={variant} to="/">
          Home
        </NavItem>
        <NavItem to="/about/" variant={variant}>
          About
        </NavItem>
        <NavItem to="/how-i-grade/" variant={variant}>
          How I Grade
        </NavItem>
        <NavItem to="/reviews/" variant={variant}>
          Reviews
        </NavItem>
        <NavItem to="/stats/" variant={variant}>
          Stats
        </NavItem>
        <NavItem to="/watchlist/" variant={variant}>
          Watchlist
        </NavItem>
      </Box>
    </Box>
  );
}
