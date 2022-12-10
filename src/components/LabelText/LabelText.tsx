import { Box, IBoxProps } from "../Box";

interface ILabelTextProps extends IBoxProps {
  text: string;
}

export function LabelText({ text, ...rest }: ILabelTextProps) {
  return (
    <Box
      as="span"
      fontSize="label"
      display="inline-block"
      letterSpacing={0.5}
      textAlign="left"
      fontWeight="semiBold"
      height={24}
      {...rest}
    >
      {text}
    </Box>
  );
}
