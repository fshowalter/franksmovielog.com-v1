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
        Overrated Disappointments
        <Spacer axis="vertical" size={8} />
      </PageTitle>
      <Box color="subtle">
        <Box as="q" display="block" textAlign="center" color="subtle">
          Did you watch me? I gave all of me!
        </Box>
        <Spacer axis="vertical" size={32} />
      </Box>
      <Box as="p" color="subtle" maxWidth="shortForm">
        One and two star movies with an above-average IMDb rating and vote
        count.
      </Box>
    </>
  );
}
