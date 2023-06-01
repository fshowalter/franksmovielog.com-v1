import { Box } from "../Box";
import { Link } from "../Link";
import { PageTitle } from "../PageTitle";
import { Spacer } from "../Spacer";

export function Header(): JSX.Element {
  return (
    <>
      <Box textAlign="center">
        <Link to="/reviews/">Reviews</Link>
      </Box>
      <PageTitle textAlign="center">
        Underseen Gems
        <Spacer axis="vertical" size={8} />
      </PageTitle>
      <Box color="subtle">
        <Box as="q" display="block" textAlign="center" color="subtle">
          My God, it&apos;s full of stars!
        </Box>
        <Spacer axis="vertical" size={32} />
      </Box>
      <Box as="p" color="subtle" maxWidth="shortForm">
        Four and five star movies with a below average number of IMDb votes.
      </Box>
    </>
  );
}
