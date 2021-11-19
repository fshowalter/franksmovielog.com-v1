import React from "react";
import { barCss, hideOnSmallScreensCss } from "./Bar.module.scss";

export default function Bar({
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

  const classNames = [barCss];

  if (hideOnSmallScreens) {
    classNames.push(hideOnSmallScreensCss);
  }

  return (
    <div className={classNames.join(" ")} style={barPercentProperty}>
      &nbsp;
    </div>
  );
}
