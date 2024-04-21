import { Box, IBoxProps } from "../Box";
import { Link } from "../Link";
import {
  flagTypographyStyle,
  navActiveLinkStyle,
  orderStyle,
  taglineStyle,
} from "./Mast.css";
import { Nav } from "./Nav";
import { SiteSearchForm } from "./SiteSearchForm";

export function Mast({ ...rest }: IBoxProps) {
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
          className={flagTypographyStyle}
        >
          <Link color="default" to="/">
            Frank&apos;s Movie Log
          </Link>
        </Box>
        <Box
          as="p"
          color="muted"
          lineHeight={16}
          className={taglineStyle}
          width="full"
          fontSize="small"
        >
          My life at the movies.
        </Box>
      </Box>
      <SiteSearchForm maxWidth="prose" className={orderStyle} />
      <Nav
        activeClassName={navActiveLinkStyle}
        color="accent"
        justifyContent={{ default: "center", desktop: "flex-start" }}
        width={{ default: "full", max: "unset" }}
      />
    </Box>
  );
}
