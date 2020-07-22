import React from "react";
import PropTypes from "prop-types";

import F from "../../../content/assets/1-star.svg";
import D from "../../../content/assets/2-stars.svg";
import C from "../../../content/assets/3-stars.svg";
import B from "../../../content/assets/4-stars.svg";
import A from "../../../content/assets/5-stars.svg";

const gradeMap = {
  A: [A, "5 stars (out of 5)"],
  B: [B, "4 stars (out of 5)"],
  C: [C, "3 stars (out of 5)"],
  D: [D, "2 stars (out of 5)"],
  F: [F, "1 star (out of 5)"],
};

const gradeValueMap = {
  5: [A, "5 stars (out of 5)"],
  4: [B, "4 stars (out of 5)"],
  3: [C, "3 stars (out of 5)"],
  2: [D, "2 stars (out of 5)"],
  1: [F, "1 star (out of 5)"],
};

export default function Grade({ grade, gradeValue, width, height, className }) {
  let src;
  let alt;

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
    if (!(gradeValue in gradeValueMap)) {
      return null;
    }

    [src, alt] = gradeValueMap[gradeValue];
  }

  return (
    <img
      className={className}
      src={src}
      alt={alt}
      width={width}
      height={height}
    />
  );
}

Grade.propTypes = {
  grade: PropTypes.oneOf([
    "A+",
    "A",
    "A-",
    "B+",
    "B",
    "B-",
    "C+",
    "C",
    "C-",
    "D+",
    "D",
    "D-",
    "F",
  ]),
  gradeValue: PropTypes.oneOf([1, 2, 3, 4, 5]),
  width: PropTypes.number,
  height: PropTypes.number,
  className: PropTypes.string,
};

Grade.defaultProps = {
  width: 70,
  height: 14,
  className: null,
  grade: null,
  gradeValue: null,
};
