import { Box } from "../Box";
import { Link } from "../Link";

export function ListItemTitle({
  title,
  year,
  slug,
}: {
  title: string;
  year: number;
  slug: string;
}) {
  const yearBox = (
    <Box as="span" fontSize="xSmall" color="subtle" fontWeight="light">
      {year}
    </Box>
  );

  return (
    <Link to={`/reviews/${slug}/`} fontSize="default" display="block">
      {title}&#8239;&#8239;{yearBox}
    </Link>
  );
}
