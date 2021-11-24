import React from "react";
import { titleCss } from "./PageTitle.module.scss";

export default function PageTitle({
  className,
  children,
}: {
  children: React.ReactNode;
  className?: string;
}): JSX.Element {
  return <h1 className={[titleCss, className].join(" ")}>{children}</h1>;
}
