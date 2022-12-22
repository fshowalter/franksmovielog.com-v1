import React from "react";
import { Box } from "../Box";
import { gradientBackgroundStyle } from "./BarGradient.css";

export function BarGradient({
  value,
  maxValue,
}: {
  value: number;
  maxValue: number;
  hideOnSmallScreens?: boolean;
}): JSX.Element {
  const barPercentProperty = {
    "--bar-percent": `${(value / maxValue) * 100}%`,
  } as React.CSSProperties;

  return (
    <Box className={gradientBackgroundStyle} style={barPercentProperty}>
      &nbsp;
    </Box>
  );
}
