import React from "react";
import { headingCss } from "./StatHeading.module.scss";

export default function StatHeading({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return <h3 className={headingCss}>{children}</h3>;
}
