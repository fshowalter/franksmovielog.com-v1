import { Box } from "../Box";
import { Link } from "../Link";

function AllTimeLink({
  currentYear,
  linkFunc,
}: {
  currentYear: string;
  linkFunc: (year: string) => string;
}): JSX.Element {
  if (!currentYear || currentYear === "all") {
    return <></>;
  }

  return (
    <Box as="li" display="block">
      <Link to={linkFunc("all")}>All-Time</Link>
    </Box>
  );
}

function YearLink({
  year,
  currentYear,
  linkFunc,
}: {
  year: string;
  currentYear: string;
  linkFunc: (y: string) => string;
}): JSX.Element | null {
  if (year === currentYear) {
    return (
      <Box as="li" display="block">
        {year}
      </Box>
    );
  }

  return (
    <Box as="li" display="block">
      <Link to={linkFunc(year)}>{year}</Link>
    </Box>
  );
}

export function StatsNavigation({
  currentYear,
  years,
  linkFunc,
}: {
  currentYear: string;
  years: readonly string[];
  linkFunc: (year: string) => string;
}): JSX.Element {
  return (
    <Box
      as="ul"
      display="flex"
      fontSize="medium"
      columnGap={16}
      rowGap={16}
      flexWrap="wrap"
      justifyContent="center"
    >
      <AllTimeLink currentYear={currentYear} linkFunc={linkFunc} />
      {[...years].reverse().map((year) => {
        return (
          <YearLink
            key={year}
            year={year}
            currentYear={currentYear}
            linkFunc={linkFunc}
          />
        );
      })}
    </Box>
  );
}
