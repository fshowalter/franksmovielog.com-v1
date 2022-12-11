import React from "react";
import { Box } from "../Box";
import { gradientBackgroundStyle } from "./Bar.css";

export function Bar({
  value,
  maxValue,
  hideOnSmallScreens = false,
}: {
  value: number;
  maxValue: number;
  hideOnSmallScreens?: boolean;
}): JSX.Element {
  const barPercentProperty = {
    "--bar-percent": `${(value / maxValue) * 100}%`,
  } as React.CSSProperties;

  // const classNames = [barCss];

  // if (hideOnSmallScreens) {
  //   classNames.push(hideOnSmallScreensCss);
  // }

  return (
    <Box className={gradientBackgroundStyle} style={barPercentProperty}>
      &nbsp;
    </Box>
  );
}
