import { ChangeEvent } from "react";
import { Box, IBoxProps } from "../Box";
import { LabelText } from "../LabelText";
import { SelectInput } from "../SelectInput";

interface SelectFieldProps extends IBoxProps {
  label: string;
  value?: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

export function SelectField({
  label,
  value,
  onChange,
  children,
  ...rest
}: SelectFieldProps): JSX.Element {
  return (
    <Box as="label" display="flex" flexDirection="column" {...rest}>
      <LabelText text={label} />
      <SelectInput value={value?.toString()} onChange={onChange}>
        {children}
      </SelectInput>
    </Box>
  );
}
