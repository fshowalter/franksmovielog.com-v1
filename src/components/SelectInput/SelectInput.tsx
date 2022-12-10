import React, { ChangeEvent } from "react";
import { Box, IBoxProps } from "../Box";
import { inputSyle } from "./SelectInput.css";

interface ISelectInputProps extends IBoxProps {
  value?: string | number;
  children: React.ReactNode;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
}

export function SelectInput({
  value,
  onChange,
  children,
  ...rest
}: ISelectInputProps): JSX.Element {
  return (
    <Box
      as="select"
      value={value}
      className={inputSyle}
      onChange={onChange}
      {...rest}
    >
      {children}
    </Box>
  );
}
