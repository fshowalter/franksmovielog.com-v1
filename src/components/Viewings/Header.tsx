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
      <Box as="q" display="block" textAlign="center" color="subtle">
        We have such sights to show you.
      </Box>
      <Spacer axis="vertical" size={16} />

      <Box color="subtle" textAlign="center">
        <Spacer axis="vertical" size={16} />
        <p>
          Since 2012, I&apos;ve watched{" "}
          <Box as="span" color="emphasis">
            {viewingCount.toLocaleString()}
          </Box>{" "}
          movies.
        </p>
      </Box>

      <Spacer axis="vertical" size={24} />

      <Box display="block">
        <Link
          to="/viewings/stats/"
          display="flex"
          columnGap={16}
          boxShadow="borderAll"
          paddingX={16}
          paddingY={8}
          borderRadius={8}
          alignItems="center"
          justifyContent="center"
        >
          <Box flexShrink={0}>
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-file-bar-graph"
              viewBox="0 0 16 16"
            >
              <path d="M4.5 12a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5zm3 0a.5.5 0 0 1-.5-.5v-4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5zm3 0a.5.5 0 0 1-.5-.5v-6a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-.5.5z" />
              <path d="M4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm0 1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1" />
            </svg>
          </Box>
          Stats
        </Link>
      </Box>
    </>
  );
}
