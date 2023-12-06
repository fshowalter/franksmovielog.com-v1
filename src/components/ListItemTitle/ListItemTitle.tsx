import { Box } from "../Box";
import { Link } from "../Link";

export function ListItemTitle({
  title,
  year,
  slug,
}: {
  title: string;
  year: string;
  slug: string | null | undefined;
}) {
  const yearBox = (
    <Box as="span" fontSize="xSmall" color="subtle" fontWeight="light">
      {year}
    </Box>
  );

  if (slug) {
    return (
      <Link to={`/reviews/${slug}/`} fontSize="medium" display="block">
        {title}&#8239;&#8239;{yearBox}
      </Link>
    );
  }

  return (
    <Box as="span" fontSize="medium" display="block">
      {title}&#8239;&#8239;{yearBox}
    </Box>
  );
}
