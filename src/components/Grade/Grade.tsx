import { Box, IBoxProps } from "../Box";

/**
 * Maps grade letters to their letter and alt-text.
 */
const gradeMap: Record<string, [string, string]> = {
  A: ["/svg/5-stars.svg", "5 stars (out of 5)"],
  B: ["/svg/4-stars.svg", "4 stars (out of 5)"],
  C: ["/svg/3-stars.svg", "3 stars (out of 5)"],
  D: ["/svg/2-stars.svg", "2 stars (out of 5)"],
  F: ["/svg/1-star.svg", "1 star (out of 5)"],
};

// React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>,HTMLImageElement>

interface IGradeProps extends Omit<IBoxProps, "width" | "height"> {
  grade: string;
  height: number;
  width: number;
}

export function Grade({
  grade,
  width,
  height,
  ...rest
}: IGradeProps): JSX.Element | null {
  const [src, alt] = gradeMap[grade[0]];

  return (
    <Box
      as="img"
      src={src}
      alt={`${grade}: ${alt}`}
      __height={height}
      __width={width}
      {...rest}
    />
  );
}
