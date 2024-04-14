import { Box } from "../Box";
import { PageTitle } from "../PageTitle";
import { Spacer } from "../Spacer";

export function Header(): JSX.Element {
  return (
    <>
      <PageTitle textAlign="center">
        Collections
        <Spacer axis="vertical" size={8} />
      </PageTitle>
      <Box color="subtle">
        <Box as="q" display="block" textAlign="center" color="subtle">
          Okay remblers, let&apos;s get rambling.
        </Box>
      </Box>
    </>
  );
}
