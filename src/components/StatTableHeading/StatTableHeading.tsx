import React from "react";
import { tableHeadingCss } from "./StatTableHeading.module.scss";

export default function StatTableHeading({
  text,
}: {
  text: string;
}): JSX.Element {
  return <h2 className={tableHeadingCss}>{text}</h2>;
}
