import { Sprinkles } from "../../styles/sprinkles.css";
import { Box } from "../Box";

interface ISpacerProps extends Sprinkles {
  size: Omit<Sprinkles["width"], "unset">;
  axis: "vertical" | "horizontal";
}

export const Spacer = ({ size, axis, ...rest }: ISpacerProps) => {
  const width = axis === `vertical` ? `px` : size;
  const height = axis === `horizontal` ? `px` : size;
  return (
    <Box
      as="span"
      width={width}
      height={height}
      minWidth={width}
      minHeight={height}
      display="block"
      {...rest}
    />
  );
};
