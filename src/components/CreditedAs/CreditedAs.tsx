import { capitalize } from "../../utils";
import { Box } from "../Box";

export function CreditedAs({
  creditedAs,
}: {
  creditedAs: readonly string[];
}): JSX.Element | null {
  return (
    <Box color="subtle" fontSize="small" letterSpacing={0.5} lineHeight={16}>
      {creditedAs.map((credit, index) => {
        if (index === 0) {
          return (
            <Box key={credit} as="span">
              {capitalize(credit)}
            </Box>
          );
        }

        return (
          <Box as="span" key={credit}>
            {" "}
            | {capitalize(credit)}
          </Box>
        );
      })}
    </Box>
  );
}
