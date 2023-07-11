import { composeClassNames } from "../../styles/composeClassNames";
import { Box, IBoxProps } from "../Box";

export interface IGridAreaProps<T extends string> extends IBoxProps {
  name: T;
}

export function gridAreaComponent<T extends string>(
  gridAreas: Record<T, string>,
): (args: IGridAreaProps<T>) => JSX.Element {
  return function GridArea({ name, ...rest }: IGridAreaProps<T>) {
    return <Box className={gridAreas[name]} {...rest} />;
  };
}

export function gridComponent(
  gridStyle: string,
): (args: IBoxProps) => JSX.Element {
  return function Grid({ className, ...rest }: IBoxProps) {
    return (
      <Box className={composeClassNames(className, gridStyle)} {...rest} />
    );
  };
}
