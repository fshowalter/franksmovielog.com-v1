import { Box } from "../Box";
import { Link } from "../Link";

export function StillListHeading({
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
      width="full"
    >
      <Box as="span" fontWeight="semiBold" color="muted">
        {leadText}{" "}
      </Box>
      <Link to={linkTarget}>{linkText}</Link>
    </Box>
  );
}
