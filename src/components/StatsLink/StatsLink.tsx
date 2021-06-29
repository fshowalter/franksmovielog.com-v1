import { Link } from "gatsby";
import React from "react";
import { iconCss, linkCss } from "./StatsLink.module.scss";

export default function StatsLink({ to }: { to: string }): JSX.Element {
  return (
    <Link to={to} className={linkCss}>
      Stats{" "}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className={iconCss}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
        />
      </svg>
    </Link>
  );
}
