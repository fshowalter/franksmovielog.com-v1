import React from "react";

/**
 * Maps grade letters to their letter and alt-text.
 */
const gradeMap: { [key: string]: [string, string] } = {
  A: ["/svg/5-stars.svg", "5 stars (out of 5)"],
  B: ["/svg/4-stars.svg", "4 stars (out of 5)"],
  C: ["/svg/3-stars.svg", "3 stars (out of 5)"],
  D: ["/svg/2-stars.svg", "2 stars (out of 5)"],
  F: ["/svg/1-star.svg", "1 star (out of 5)"],
};

export default function Grade({
  width,
  height,
  className,
  grade,
}: {
  /** The width of the stars image. */
  width?: number;
  /** The height of the stars image. */
  height?: number;
  /** The CSS class name of the stars image. */
  className?: string;
  /** The grade letter value. */
  grade: string;
}): JSX.Element | null {
  const [src, alt] = gradeMap[grade[0]];

  return (
    <img
      className={className}
      src={src}
      alt={`${grade}: ${alt}`}
      width={width}
      height={height}
    />
  );
}
