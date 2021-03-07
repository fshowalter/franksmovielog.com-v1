import React from "react";
import { labelCss } from "./Label.module.scss";

export default function Label({
  htmlFor,
  children,
}: {
  htmlFor: string;
  children: React.ReactNode;
}): JSX.Element {
  return (
    <label className={labelCss} htmlFor={htmlFor}>
      {children}
    </label>
  );
}
