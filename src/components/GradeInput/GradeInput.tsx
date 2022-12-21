import { useState } from "react";
import { Box, IBoxProps } from "../Box";
import { SelectInput } from "../SelectInput";

const options = [
  <option key={13} value={13}>
    A+
  </option>,
  <option key={12} value={12}>
    A
  </option>,
  <option key={11} value={11}>
    A-
  </option>,
  <option key={10} value={10}>
    B+
  </option>,
  <option key={9} value={9}>
    B
  </option>,
  <option key={8} value={8}>
    B-
  </option>,
  <option key={7} value={7}>
    C+
  </option>,
  <option key={6} value={6}>
    C
  </option>,
  <option key={5} value={5}>
    C-
  </option>,
  <option key={4} value={4}>
    D+
  </option>,
  <option key={3} value={3}>
    D
  </option>,
  <option key={2} value={2}>
    D-
  </option>,
  <option key={1} value={1}>
    F
  </option>,
];

interface IGradeFilterProps extends IBoxProps {
  label: string;
  onGradeChange: (
    values: [number, number],
    includeNonReviewed: boolean
  ) => void;
}

export function GradeInput({
  label,
  onGradeChange,
}: IGradeFilterProps): JSX.Element {
  const [minValue, setMinValue] = useState(1);
  const [maxValue, setMaxValue] = useState(13);
  const [checkedValue, setCheckedValue] = useState(true);

  const handleMinChange = (value: string) => {
    const newMin = parseInt(value, 10);
    setMinValue(newMin);

    if (newMin <= maxValue) {
      onGradeChange([newMin, maxValue], checkedValue);
    } else {
      onGradeChange([maxValue, newMin], checkedValue);
    }
  };

  const handleMaxChange = (value: string) => {
    const newMax = parseInt(value, 10);
    setMaxValue(newMax);

    if (minValue <= newMax) {
      onGradeChange([minValue, newMax], checkedValue);
    } else {
      onGradeChange([newMax, minValue], checkedValue);
    }
  };

  const handleCheckedChange = (value: boolean) => {
    setCheckedValue(value);
    onGradeChange([minValue, maxValue], value);
  };

  return (
    <Box as="fieldset" border={0}>
      <Box
        as="legend"
        fontSize="label"
        color="subtle"
        fontWeight="bold"
        letterSpacing={0.5}
        height={24}
        textAlign="left"
      >
        {label}
      </Box>
      <Box display="flex" alignItems="baseline" flexWrap="wrap">
        <Box
          as="label"
          display="flex"
          flex={1}
          alignItems="center"
          columnGap=".5ch"
        >
          <Box
            as="span"
            fontSize="small"
            minWidth={40}
            textAlign="left"
            letterSpacing={0.5}
          >
            From
          </Box>
          <SelectInput
            value={minValue}
            onChange={(e) => handleMinChange(e.target.value)}
          >
            {options.slice().reverse()}
          </SelectInput>
        </Box>
        <Box as="label" display="flex" flex={1} alignItems="center">
          <Box
            as="span"
            fontSize="small"
            minWidth={40}
            textAlign="center"
            letterSpacing={0.5}
          >
            to
          </Box>
          <SelectInput
            value={maxValue}
            onChange={(e) => handleMaxChange(e.target.value)}
          >
            {options.slice()}
          </SelectInput>
        </Box>
        <Box minWidth="full" textAlign="left" height={24}>
          <Box
            as="label"
            flex={1}
            lineHeight={24}
            height={24}
            display="inline-flex"
            columnGap=".5ch"
            textAlign="left"
            fontWeight="semiBold"
            alignItems="center"
            fontSize="small"
            color="subtle"
          >
            <input
              onChange={(e) => handleCheckedChange(e.target.checked)}
              type="checkbox"
              checked={checkedValue}
            />
            Include unrated viewings
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
