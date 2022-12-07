import { createBox } from "@dessert-box/react";
import { sprinkles } from "../../styles/sprinkles.css";
import composeClassNames from "../../utils/composeClassNames";
import {
  desktopOnlyStyle,
  mobileOnlyStyle,
  screenReaderOnlyStyle,
} from "./Box.css";

const BaseBox = createBox({ atoms: sprinkles });

type IBaseBoxProps = React.ComponentPropsWithRef<typeof BaseBox>;

export interface IBoxProps extends IBaseBoxProps {
  hideOn?: "mobile" | "desktop";
  screenReaderOnly?: boolean;
}

export function Box({
  hideOn,
  screenReaderOnly,
  className,
  ...rest
}: IBoxProps) {
  const classNames = [];
  if (hideOn === "mobile") {
    classNames.push(desktopOnlyStyle);
  }

  if (hideOn === "desktop") {
    classNames.push(mobileOnlyStyle);
  }

  if (screenReaderOnly) {
    classNames.push(screenReaderOnlyStyle);
  }

  return (
    <BaseBox
      className={composeClassNames(...classNames, className)}
      {...rest}
    />
  );
}
