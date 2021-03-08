import React from "react";
import { srOnlyCss } from "./ScreenReaderOnly.module.scss";

export default function ScreenReaderOnly({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return <div className={srOnlyCss}>{children}</div>;
}
