import React from "react";
import SelectInput from "../SelectInput";
import {
  containerCss,
  fromCss,
  fromInputCss,
  inputLabelCss,
  legendCss,
  toCss,
  toInputCss,
  wrapperCss,
} from "./YearInput.module.scss";

/**
 * Renders a dual-handle range slider.
 */
export default function YearInput({
  label,
  years,
  onChange,
}: {
  /** The label text. */
  label: string;
  years: string[];
  /** Handler called when the control changes. */
  onChange: (values: [number, number]) => void;
}): JSX.Element {
  const [minYear, setMinYear] = React.useState(parseInt(years[0], 10));
  const [maxYear, setMaxYear] = React.useState(
    parseInt(years[years.length - 1], 10)
  );

  const handleMinChange = (value: string) => {
    const newMin = parseInt(value, 10);
    setMinYear(newMin);

    if (newMin <= maxYear) {
      onChange([newMin, maxYear]);
    } else {
      onChange([maxYear, newMin]);
    }
  };

  const handleMaxChange = (value: string) => {
    const newMax = parseInt(value, 10);
    setMaxYear(newMax);

    if (minYear <= newMax) {
      onChange([minYear, newMax]);
    } else {
      onChange([newMax, minYear]);
    }
  };

  return (
    <fieldset className={containerCss}>
      <legend className={legendCss}>{label}</legend>
      <div className={wrapperCss}>
        <label className={inputLabelCss}>
          <span className={fromCss}>From</span>
          <SelectInput
            value={minYear}
            className={fromInputCss}
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
        </label>
        <label className={inputLabelCss}>
          <span className={toCss}>to</span>
          <SelectInput
            value={maxYear}
            className={toInputCss}
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
        </label>
      </div>
    </fieldset>
  );
}
