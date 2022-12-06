import composeClassNames from "../../utils/composeClassNames";
import { Box, IBoxProps } from "../Box";
import { containerVariants, ContainerVariants } from "./Container.css";

interface IContainerProps extends IBoxProps {
  variant?: ContainerVariants;
}

export function Container({
  variant = "default",
  className,
  children,
  ...rest
}: IContainerProps) {
  return (
    <Box
      className={composeClassNames(className, containerVariants[variant])}
      {...rest}
    >
      {children}
    </Box>
  );
}
