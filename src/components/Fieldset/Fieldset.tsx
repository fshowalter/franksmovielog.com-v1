import React from "react";
import { fieldsetCss, legendCss } from "./Fieldset.module.scss";

export default function Label({
  className,
  legend,
  children,
}: {
  className: string;
  legend: string;
  children: React.ReactNode;
}): JSX.Element {
  return (
    <fieldset className={`${fieldsetCss} ${className}`}>
      <legend className={legendCss}>{legend}</legend>
      {children}
    </fieldset>
  );
}
