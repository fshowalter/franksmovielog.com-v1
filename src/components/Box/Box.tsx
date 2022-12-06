import { createBox } from "@dessert-box/react";
import { sprinkles } from "../../styles/sprinkles.css";

export const Box = createBox({ atoms: sprinkles });

export type IBoxProps = React.ComponentPropsWithRef<typeof Box>;
