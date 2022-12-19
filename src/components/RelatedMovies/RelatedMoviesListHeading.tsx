import { Box } from "../Box";
import { Link } from "../Link";

export function RelatedMoviesListHeading({
  leadText,
  linkText,
  linkTarget,
}: {
  leadText: string;
  linkText: string;
  linkTarget: string;
}) {
  return (
    <Box
      boxShadow={{ default: "borderBottom", tablet: "unset" }}
      paddingY={{ default: 8, tablet: 16 }}
      paddingX={{ default: "popoutGutter", desktop: "gutter" }}
      letterSpacing={0.5}
      width="full"
    >
      <Box as="span" fontWeight="semiBold" color="muted">
        {leadText}{" "}
      </Box>
      <Link
        to={linkTarget}
        color="accent"
        textDecoration="none"
        display="inline-flex"
        columnGap=".5ch"
      >
        {linkText}
      </Link>
    </Box>
  );
}
