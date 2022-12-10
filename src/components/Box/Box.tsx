import { createBox } from "@dessert-box/react";
import { sprinkles } from "../../styles/sprinkles.css";
import composeClassNames from "../../utils/composeClassNames";
import { screenReaderOnlyStyle } from "./Box.css";

const BaseBox = createBox({ atoms: sprinkles });

type IBaseBoxProps = React.ComponentPropsWithRef<typeof BaseBox>;

export interface IBoxProps extends IBaseBoxProps {
  screenReaderOnly?: boolean;
  innerRef?: React.Ref<HTMLElement>;
}

export function Box({
  screenReaderOnly,
  className,
  innerRef,
  ...rest
}: IBoxProps) {
  const classNames = [];

  if (screenReaderOnly) {
    classNames.push(screenReaderOnlyStyle);
  }

  return (
    <BaseBox
      className={composeClassNames(...classNames, className)}
      ref={innerRef}
      {...rest}
    />
  );
}
