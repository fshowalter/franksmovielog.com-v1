import React from "react";
import { toggleButtonCss } from "./ToggleButton.module.scss";

export default function ToggleButton({
  id,
  onClick,
  children,
}: {
  id: string;
  children: React.ReactNode;
  onClick: () => void;
}): JSX.Element {
  return (
    <button id={id} type="button" className={toggleButtonCss} onClick={onClick}>
      {children}
    </button>
  );
}
