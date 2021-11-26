import React, { ChangeEvent } from "react";
import { selectInputCss } from "./SelectInput.module.scss";

export default function SelectInput({
  value,
  onChange,
  children,
  className,
}: {
  value?: string | number;
  children: React.ReactNode;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
}): JSX.Element {
  return (
    <select
      value={value}
      className={[selectInputCss, className].join(" ")}
      onChange={onChange}
    >
      {children}
    </select>
  );
}
