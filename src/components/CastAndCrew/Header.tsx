import { Box } from "../Box";
import { PageTitle } from "../PageTitle";
import { Spacer } from "../Spacer";

export function Header(): JSX.Element {
  return (
    <>
      <PageTitle textAlign="center">
        Cast & Crew
        <Spacer axis="vertical" size={8} />
      </PageTitle>
      <Box color="subtle">
        <Box as="q" display="block" textAlign="center" color="subtle">
          Round up the usual suspects.
        </Box>
      </Box>
    </>
  );
}
