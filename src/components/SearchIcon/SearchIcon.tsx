import React from "react";
import * as styles from "./searchIcon.module.scss";

/**
 * Renders a search icon.
 */
export default function SearchIcon({
  className = styles.icon,
}: {
  /** CSS class to apply to the rendered element. */
  className?: string;
}): JSX.Element {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 16 16"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        d="M10.442 10.442a1 1 0 011.415 0l3.85 3.85a1 1 0 01-1.414 1.415l-3.85-3.85a1 1 0 010-1.415z"
      />
      <path
        fillRule="evenodd"
        d="M6.5 12a5.5 5.5 0 100-11 5.5 5.5 0 000 11zM13 6.5a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z"
      />
    </svg>
  );
}

SearchIcon.defaultProps = {
  className: styles.icon,
};
