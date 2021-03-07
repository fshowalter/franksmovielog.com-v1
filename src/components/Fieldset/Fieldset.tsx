import React from "react";
import { fieldsetCss } from "./Fieldset.module.scss";

export default function Label({
  className,
  children,
}: {
  className: string;
  children: React.ReactNode;
}): JSX.Element {
  return (
    <fieldset className={`${fieldsetCss} ${className}`}>{children}</fieldset>
  );
}
