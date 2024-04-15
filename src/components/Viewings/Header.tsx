import { Box } from "../Box";
import { Link } from "../Link";
import { PageTitle } from "../PageTitle";
import { Spacer } from "../Spacer";

export function Header({
  viewingCount,
}: {
  viewingCount: number;
}): JSX.Element {
  return (
    <>
      <PageTitle textAlign="center">Viewing Log</PageTitle>
      <Spacer axis="vertical" size={8} />
      <Box as="q" display="block" textAlign="center" color="subtle">
        We have such sights to show you.
      </Box>
      <Spacer axis="vertical" size={32} />
      <Box color="subtle" textAlign="center">
        <p>
          Since 2012, I&apos;ve watched{" "}
          <Box as="span" color="emphasis">
            {viewingCount.toLocaleString()}
          </Box>{" "}
          movies.
        </p>
      </Box>
      <Spacer axis="vertical" size={16} />
      <Box as="p" color="subtle">
        See more <Link to="/viewings/stats/">stats</Link>.
      </Box>
    </>
  );
}
