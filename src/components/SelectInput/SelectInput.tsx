import React, { ChangeEvent } from "react";
import styles from "./SelectInput.module.scss";

export default function SelectInput({
  value,
  id,
  className,
  onChange,
  children,
}: {
  value?: string;
  id: string;
  className?: string;
  children: React.ReactNode;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}): JSX.Element {
  return (
    <select
      value={value}
      id={id}
      className={`${styles.select_input} ${className || ""}`}
      onChange={onChange}
    >
      {children}
    </select>
  );
}

SelectInput.defaultProps = {
  value: undefined,
  className: undefined,
};
