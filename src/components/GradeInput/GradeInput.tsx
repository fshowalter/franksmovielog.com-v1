import React from "react";
import SelectInput from "../SelectInput";
import {
  checkboxLabelCss,
  containerCss,
  fromCss,
  inputLabelCss,
  legendCss,
  toCss,
  wrapperCss,
} from "./GradeInput.module.scss";

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

/**
 * Renders a dual-handle range slider.
 */
export default function GradeFilter({
  label,
  onChange,
}: {
  /** The label text. */
  label: string;
  /** Handler called when the control changes. */
  onChange: (values: [number, number], includeNonReviewed: boolean) => void;
}): JSX.Element {
  const [minValue, setMinValue] = React.useState(1);
  const [maxValue, setMaxValue] = React.useState(13);
  const [checkedValue, setCheckedValue] = React.useState(true);

  const handleMinChange = (value: string) => {
    const newMin = parseInt(value, 10);
    setMinValue(newMin);

    if (newMin <= maxValue) {
      onChange([newMin, maxValue], checkedValue);
    } else {
      onChange([maxValue, newMin], checkedValue);
    }
  };

  const handleMaxChange = (value: string) => {
    const newMax = parseInt(value, 10);
    setMaxValue(newMax);

    if (minValue <= newMax) {
      onChange([minValue, newMax], checkedValue);
    } else {
      onChange([newMax, minValue], checkedValue);
    }
  };

  const handleCheckedChange = (value: boolean) => {
    console.log(value);
    setCheckedValue(value);
    onChange([minValue, maxValue], value);
  };

  return (
    <fieldset className={containerCss}>
      <legend className={legendCss}>{label}</legend>
      <div className={wrapperCss}>
        <label className={inputLabelCss}>
          <span className={fromCss}>From</span>
          <SelectInput
            value={minValue}
            onChange={(e) => handleMinChange(e.target.value)}
          >
            {options.slice().reverse()}
          </SelectInput>
        </label>
        <label className={inputLabelCss}>
          <span className={toCss}>to</span>
          <SelectInput
            value={maxValue}
            onChange={(e) => handleMaxChange(e.target.value)}
          >
            {options.slice()}
          </SelectInput>
        </label>
        <label className={checkboxLabelCss}>
          <input
            onChange={(e) => handleCheckedChange(e.target.checked)}
            type="checkbox"
            checked={checkedValue}
          />
          Include unrated viewings
        </label>
      </div>
    </fieldset>
  );
}
