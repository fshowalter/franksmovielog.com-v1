import { Box } from "../Box";

export function StatsCallout({
  stat,
  label,
}: {
  stat: number;
  label: string;
}): JSX.Element {
  return (
    <Box
      boxShadow="borderAll"
      borderRadius="half"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      height={144}
      width={144}
      textAlign="center"
    >
      <Box fontSize="xLarge">{stat.toLocaleString()}</Box>{" "}
      <Box color="subtle">{label}</Box>
    </Box>
  );
}
