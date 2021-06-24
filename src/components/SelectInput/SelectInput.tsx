import React, { ChangeEvent } from "react";
import { labelCss, selectInputCss } from "./SelectInput.module.scss";

export default function SelectInput({
  label,
  value,
  onChange,
  children,
}: {
  label: string;
  value?: string;
  children: React.ReactNode;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}): JSX.Element {
  return (
    <label className={labelCss}>
      {label}
      <select value={value} className={selectInputCss} onChange={onChange}>
        {children}
      </select>
    </label>
  );
}
