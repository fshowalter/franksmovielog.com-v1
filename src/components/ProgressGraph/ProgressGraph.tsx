import React from "react";
import styles from "./ProgressGraph.module.scss";

export default function ProgressGraph({
  total,
  complete,
  children,
}: {
  total: number;
  complete: number;
  children: React.ReactNode;
}): JSX.Element | null {
  if (total === 0) {
    return null;
  }

  const percent = Math.floor((complete / total) * 100);

  return (
    <>
      <svg viewBox="0 0 36 36" className={styles.percent_graph}>
        <path
          className={styles.percent_graph_background}
          d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
        />
        <path
          d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
          className={styles.percent_graph_progress}
          strokeDasharray={`${percent}, 100`}
        />
        <text x="18" y="20.35" className={styles.percent_number}>
          {percent}%
        </text>
      </svg>
      <div className={styles.percent_totals}>{children}</div>
    </>
  );
}
