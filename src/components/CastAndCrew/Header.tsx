import { Box } from "../Box";
import { PageTitle } from "../PageTitle";
import { Spacer } from "../Spacer";

export function Header({
  title,
  tagline,
}: {
  title: string;
  tagline: string;
}): JSX.Element {
  return (
    <>
      <PageTitle textAlign="center">
        {title}
        <Spacer axis="vertical" size={8} />
      </PageTitle>
      <Box color="subtle">
        <Box as="q" display="block" textAlign="center" color="subtle">
          {tagline}
        </Box>
      </Box>
    </>
  );
}
