import React from "react";
import styles from "./Fieldset.module.scss";

export default function Label({
  className,
  children,
}: {
  className: string;
  children: React.ReactNode;
}): JSX.Element {
  return (
    <fieldset className={`${styles.fieldset} ${className}`}>
      {children}
    </fieldset>
  );
}
