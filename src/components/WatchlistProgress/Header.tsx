import { Box } from "..//Box";
import { PageTitle } from "..//PageTitle";
import { Link } from "../Link";
import { Spacer } from "../Spacer";

export function Header(): JSX.Element {
  return (
    <Box
      as="header"
      display="flex"
      flexDirection={{ default: "column", desktop: "row" }}
      flexWrap="wrap"
      paddingX="pageMargin"
      columnGap={32}
      justifyContent="space-between"
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems={{ default: "center", desktop: "flex-start" }}
      >
        <PageTitle paddingTop={{ default: 24, desktop: 32 }} lineHeight={40}>
          Watchlist Progress
        </PageTitle>
        <Box as="q" color="subtle">
          I find your lack of faith disturbing.
        </Box>
        <Spacer axis="vertical" size={16} />
        <Box color="subtle">
          <Spacer axis="vertical" size={16} />
          <p>
            My progress working through{" "}
            <Link to="/watchlist/">my movie-review bucketlist</Link>.
          </p>
        </Box>
      </Box>
    </Box>
  );
}
