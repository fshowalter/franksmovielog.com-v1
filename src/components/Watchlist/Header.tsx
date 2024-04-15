import { Box } from "../Box";
import { Link } from "../Link";
import { PageTitle } from "../PageTitle";
import { Spacer } from "../Spacer";

export function Header({ titleCount }: { titleCount: number }): JSX.Element {
  return (
    <>
      <PageTitle textAlign="center">Watchlist</PageTitle>
      <Spacer axis="vertical" size={8} />
      <Box as="q" display="block" textAlign="center" color="subtle">
        A man&apos;s got to know his limitations.
      </Box>
      <Spacer axis="vertical" size={32} />

      <Box as="p" color="subtle" maxWidth="shortForm">
        My movie review bucketlist. {titleCount.toLocaleString()} titles. No
        silents or documentaries.
      </Box>
      <Spacer axis="vertical" size={16} />
      <Box as="p" color="subtle">
        Track my <Link to="/watchlist/progress/">progress</Link>.
      </Box>
    </>
  );
}
