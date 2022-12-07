import React from "react";
import { srOnlyCss } from "./ScreenReaderOnly.css";

export default function ScreenReaderOnly({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return <div className={srOnlyCss}>{children}</div>;
}
