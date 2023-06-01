import { Button } from "../Button";

import { foregroundColors } from "../../styles/colors.css";

export function ShowMoreButton({
  onClick,
}: {
  onClick: () => void;
}): JSX.Element {
  return (
    <Button
      paddingX="pageMargin"
      onClick={onClick}
      display="flex"
      columnGap={16}
    >
      <svg
        width="24"
        height="24"
        focusable="false"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill={foregroundColors.accent}
      >
        <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"></path>
      </svg>
      Show More...
    </Button>
  );
}
