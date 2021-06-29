import React from "react";
import { buttonCss } from "./Button.module.scss";

export default function Button({
  onClick,
  children,
}: {
  children: React.ReactNode;
  onClick: () => void;
}): JSX.Element {
  return (
    <button type="button" className={buttonCss} onClick={onClick}>
      {children}
    </button>
  );
}
