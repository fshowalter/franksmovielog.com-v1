import React from "react";
import styles from "./ScreenReaderOnly.module.scss";

export default function ScreenReaderOnly({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return <div className={styles.sr_only}>{children}</div>;
}
