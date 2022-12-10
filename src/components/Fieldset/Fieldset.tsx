import { Box, IBoxProps } from "../Box";
import {
  fieldsetCss,
  legendPaddingStyle,
  responsiveFlexStyle,
} from "./Fieldset.css";

interface IFieldSetProps extends IBoxProps {
  legend: string;
}

export function Fieldset({ legend, children }: IFieldSetProps): JSX.Element {
  return (
    <Box as="fieldset" className={fieldsetCss}>
      <Box
        as="legend"
        textAlign="center"
        fontSize="legend"
        className={legendPaddingStyle}
        backgroundColor="default"
      >
        {legend}
      </Box>
      <Box
        display="flex"
        flexWrap="wrap"
        justifyContent="space-between"
        className={responsiveFlexStyle}
        padding={24}
      >
        {children}
      </Box>
    </Box>
  );
}
