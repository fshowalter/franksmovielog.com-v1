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
type CommonGradeProps = {
  /** The width of the stars image. */
  width?: number;
  /** The height of the stars image. */
  height?: number;
  /** The CSS class name of the stars image. */
  className?: string;
};

type LetterGradeProps = {
  /** The grade letter value. */
  grade: string;
} & CommonGradeProps;

type ValueGradeProps = {
  /** The grade letter value. */
  gradeValue: number;
} & CommonGradeProps;

type GradeProps = LetterGradeProps | ValueGradeProps;

export default function Grade(props: GradeProps): JSX.Element | null {
  let src;
  let alt = "";
  let grade = "";

  if ("grade" in props) {
    grade = props.grade;
    [src, alt] = gradeMap[props.grade[0]];
  }

  if ("gradeValue" in props) {
    const gradeValueInt = Math.round(props.gradeValue);

    grade = props.gradeValue.toString();
    [src, alt] = gradeValueMap[gradeValueInt];
  }

  return (
    <img
      className={props.className}
      src={src}
      alt={`${grade}: ${alt}`}
      width={props.width}
      height={props.height}
    />
  );
}
