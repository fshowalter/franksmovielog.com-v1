import { Box } from "..//Box";
import { PageTitle } from "..//PageTitle";
import { Link } from "../Link";
import { Spacer } from "../Spacer";

export function Header(): JSX.Element {
  return (
    <Box
      as="header"
      display="flex"
      flexDirection="column"
      paddingX="pageMargin"
      columnGap={32}
      alignItems="center"
    >
      <PageTitle paddingTop={{ default: 24, desktop: 32 }} lineHeight={40}>
        Watchlist Progress
      </PageTitle>
      <Spacer axis="vertical" size={8} />
      <Box as="q" color="subtle">
        I find your lack of faith disturbing.
      </Box>
      <Spacer axis="vertical" size={32} />
      <Box color="subtle" as="p">
        My progress working through{" "}
        <Link to="/watchlist/">my movie-review bucketlist</Link>.
      </Box>
    </Box>
  );
}
