import React, { ChangeEvent } from "react";
import SelectInput from "../SelectInput";
import { labelCss } from "./SelectField.module.scss";

export default function SelectField({
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
      <SelectInput value={value?.toString()} onChange={onChange}>
        {children}
      </SelectInput>
    </label>
  );
}
