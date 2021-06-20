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

/**
 * Maps grade values to their letter and alt-text.
 */
const gradeValueMap: { [key: number]: [string, string] } = {
  5: ["/svg/5-stars.svg", "5 stars (out of 5)"],
  4: ["/svg/4-stars.svg", "4 stars (out of 5)"],
  3: ["/svg/3-stars.svg", "3 stars (out of 5)"],
  2: ["/svg/2-stars.svg", "2 stars (out of 5)"],
  1: ["/svg/1-star.svg", "1 star (out of 5)"],
};

type GradeProps = {
  /** The grade letter value. */
  grade: string | null;
  /** The grade float value. */
  gradeValue: number | null;
  /** The width of the stars image. */
  width?: number;
  /** The height of the stars image. */
  height?: number;
  /** The CSS class name of the stars image. */
  className?: string;
};

export default function Grade({
  grade,
  gradeValue,
  className = undefined,
  width = 70,
  height = 14,
}: GradeProps): JSX.Element | null {
  let src: string | undefined;
  let alt: string | undefined;

  if (!grade && !gradeValue) {
    return null;
  }

  if (grade) {
    if (!(grade[0] in gradeMap)) {
      return null;
    }

    [src, alt] = gradeMap[grade[0]];
  }

  if (gradeValue) {
    const gradeValueInt = Math.round(gradeValue);

    if (!(gradeValueInt in gradeValueMap)) {
      return null;
    }

    [src, alt] = gradeValueMap[gradeValueInt];
  }

  return (
    <img
      className={className}
      src={src}
      alt={`${grade || ""}: ${alt || ""}`}
      width={width}
      height={height}
    />
  );
}
