import React from "react";
import { fieldsetCss, legendCss, wrapperCss } from "./Fieldset.module.scss";

export default function Label({
  legend,
  children,
}: {
  legend: string;
  children: React.ReactNode;
}): JSX.Element {
  return (
    <fieldset className={fieldsetCss}>
      <legend className={legendCss}>{legend}</legend>
      <div className={wrapperCss}>{children}</div>
    </fieldset>
  );
}
