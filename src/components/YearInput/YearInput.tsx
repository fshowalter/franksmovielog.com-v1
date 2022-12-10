import React from "react";
import { Box, IBoxProps } from "../Box";
import { LabelText } from "../LabelText";
import { SelectInput } from "../SelectInput";

interface IYearInputProps extends IBoxProps {
  label: string;
  years: readonly string[];
  onYearChange: (values: [number, number]) => void;
}

export function YearInput({
  label,
  years,
  onYearChange,
}: IYearInputProps): JSX.Element {
  const [minYear, setMinYear] = React.useState(parseInt(years[0], 10));
  const [maxYear, setMaxYear] = React.useState(
    parseInt(years[years.length - 1], 10)
  );

  const handleMinChange = (value: string) => {
    const newMin = parseInt(value, 10);
    setMinYear(newMin);

    if (newMin <= maxYear) {
      onYearChange([newMin, maxYear]);
    } else {
      onYearChange([maxYear, newMin]);
    }
  };

  const handleMaxChange = (value: string) => {
    const newMax = parseInt(value, 10);
    setMaxYear(newMax);

    if (minYear <= newMax) {
      onYearChange([minYear, newMax]);
    } else {
      onYearChange([newMax, minYear]);
    }
  };

  return (
    <Box as="fieldset" border={0} padding={0}>
      <LabelText as="legend" text={label} />
      <Box display="flex" alignItems="baseline">
        <Box as="label" display="flex" flex={1} alignItems="center">
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
            value={minYear}
            onChange={(e) => handleMinChange(e.target.value)}
          >
            {years.map((year) => {
              return (
                <option key={year} value={year}>
                  {year}
                </option>
              );
            })}
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
            value={maxYear}
            onChange={(e) => handleMaxChange(e.target.value)}
          >
            {years
              .slice()
              .reverse()
              .map((year) => {
                return (
                  <option key={year} value={year}>
                    {year}
                  </option>
                );
              })}
          </SelectInput>
        </Box>
      </Box>
    </Box>
  );
}
