import React from "react";
import { screenReaderOnlyStyle } from "./ScreenReaderOnly.css";

export default function ScreenReaderOnly({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return <div className={screenReaderOnlyStyle}>{children}</div>;
}
