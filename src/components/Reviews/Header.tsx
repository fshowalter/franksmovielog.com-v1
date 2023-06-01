import { Box } from "../Box";
import { Link } from "../Link";
import { PageTitle } from "../PageTitle";
import { Spacer } from "../Spacer";

export function Header({ reviewCount }: { reviewCount: number }): JSX.Element {
  return (
    <>
      <PageTitle textAlign="center">Reviews</PageTitle>
      <Box as="q" display="block" textAlign="center" color="subtle">
        We have such sights to show you.
      </Box>
      <Spacer axis="vertical" size={16} />

      <Box color="subtle" textAlign="center">
        <Spacer axis="vertical" size={16} />
        <p>
          Since 2012, I&apos;ve published{" "}
          <Box as="span" color="emphasis">
            {reviewCount.toLocaleString()}
          </Box>{" "}
          reviews.
        </p>
        <Spacer axis="vertical" size={16} />
        <p>
          <Box as="span" fontWeight="semiBold">
            Looking for something new?
          </Box>
          <br /> Peruse my list of{" "}
          <Link to="/reviews/underseen/">underseen gems</Link>.
        </p>
        <Spacer axis="vertical" size={16} />
        <p>
          <Box as="span" fontWeight="semiBold">
            Feeling contrarian?
          </Box>
          <br />
          Behold my list of{" "}
          <Link to="/reviews/overrated/">overrated disappointments</Link>.
        </p>
      </Box>
    </>
  );
}
