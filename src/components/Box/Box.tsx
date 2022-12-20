import { createBox } from "@dessert-box/react";
import { sprinkles } from "../../styles/sprinkles.css";

const BaseBox = createBox({ atoms: sprinkles });

type IBaseBoxProps = React.ComponentPropsWithRef<typeof BaseBox>;

export interface IBoxProps extends IBaseBoxProps {
  innerRef?: React.Ref<HTMLElement>;
}

export function Box({ innerRef, ...rest }: IBoxProps) {
  return <BaseBox ref={innerRef} {...rest} />;
}
