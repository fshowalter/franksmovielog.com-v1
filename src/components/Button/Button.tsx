import { Box, IBoxProps } from "../Box";
import { buttonStyle } from "./Button.css";

interface IButtonProps extends IBoxProps {
  onClick: () => void;
}

export function Button({
  onClick,
  children,
  ...rest
}: IButtonProps): JSX.Element {
  return (
    <Box
      as="button"
      type="button"
      onClick={onClick}
      backgroundColor="subtle"
      borderRadius={24}
      fontSize="default"
      whiteSpace="nowrap"
      lineHeight={24}
      boxShadow="borderAll"
      paddingY={8}
      paddingX={16}
      color="default"
      className={buttonStyle}
      width="full"
      display="flex"
      justifyContent="center"
      {...rest}
    >
      {children}
    </Box>
  );
}
