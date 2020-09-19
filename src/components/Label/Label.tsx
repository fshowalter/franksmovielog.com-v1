import React from "react";
import styles from "./Label.module.scss";

export default function Label({
  htmlFor,
  children,
}: {
  htmlFor: string;
  children: React.ReactNode;
}): JSX.Element {
  return (
    <label className={styles.label} htmlFor={htmlFor}>
      {children}
    </label>
  );
}
