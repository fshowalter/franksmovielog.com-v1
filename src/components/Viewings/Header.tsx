import { Box } from "../Box";
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
      <Box as="q" display="block" textAlign="center" color="subtle">
        We have such sights to show you.
      </Box>
      <Spacer axis="vertical" size={16} />

      <Box color="subtle">
        <Spacer axis="vertical" size={16} />
        <p>
          Since 2012, I&apos;ve watched{" "}
          <Box as="span" color="emphasis">
            {viewingCount.toLocaleString()}
          </Box>{" "}
          movies.
        </p>
      </Box>
    </>
  );
}
