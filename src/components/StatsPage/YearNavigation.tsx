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
      <Link color="accent" textDecoration="none" to={linkFunc("all")}>
        All-Time
      </Link>
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
  if (year === "all") {
    return null;
  }

  if (year === currentYear) {
    return (
      <Box as="li" display="block">
        {year}
      </Box>
    );
  }

  return (
    <Box as="li" display="block">
      <Link color="accent" textDecoration="none" to={linkFunc(year)}>
        {year}
      </Link>
    </Box>
  );
}

export function YearNavigation({
  currentYear,
  years,
  linkFunc,
}: {
  currentYear: string;
  years: string[];
  linkFunc: (year: string) => string;
}): JSX.Element {
  return (
    <Box
      as="ul"
      padding={0}
      display="flex"
      fontSize="yearNavigation"
      columnGap={16}
    >
      <AllTimeLink currentYear={currentYear} linkFunc={linkFunc} />
      {years.map((year) => {
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
