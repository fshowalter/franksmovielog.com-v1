import PropTypes from "prop-types";
import React from "react";
import ReactSlider from "react-slider";
import * as styles from "./rangeInput.module.scss";

export default function RangeFilter({
  id,
  min,
  max,
  onChange,
}: {
  id: string;
  min: number;
  max: number;
  onChange: (arg0: [number, number]) => void;
}): JSX.Element {
  const initialState: [number, number] = [min, max];

  const [state, setState] = React.useState(initialState.slice());

  const valuesAreValid = (values: [number, number]) => {
    return (
      values[0] >= min &&
      values[0] <= values[1] &&
      values[0] >= min &&
      values[1] <= max
    );
  };

  const handleSliderUpdate = (values: number | number[] | null | undefined) => {
    if (!Array.isArray(values)) {
      return;
    }
    onChange(values as [number, number]);
  };

  const handleSliderChange = (values: number | number[] | null | undefined) => {
    if (!Array.isArray(values)) {
      return;
    }
    setState([...values]);
  };

  const handleMinChange = (value: string) => {
    const newState: [number, number] = [parseInt(value, 10), state[1]];
    setState(newState);

    if (valuesAreValid(newState)) {
      onChange(newState);
    }
  };

  const handleMaxChange = (value: string) => {
    const newState: [number, number] = [state[0], parseInt(value, 10)];
    setState(newState);

    if (valuesAreValid(newState)) {
      onChange(newState);
    }
  };

  return (
    <div id={id} className={styles.container}>
      <ReactSlider
        value={state}
        max={max}
        min={min}
        onChange={handleSliderChange}
        onAfterChange={handleSliderUpdate}
        thumbClassName={styles.thumb}
        trackClassName={styles.track}
        thumbActiveClassName={styles.dragging}
        className={styles.slider}
      />
      <input
        type="number"
        min={min}
        max={max}
        value={state[0]}
        step="1"
        onChange={(e) => handleMinChange(e.target.value)}
        className={styles.year_input}
      />
      <span className={styles.to}> to </span>
      <input
        type="number"
        value={state[1]}
        min={min}
        max={max}
        onChange={(e) => handleMaxChange(e.target.value)}
        step="1"
        className={styles.year_input}
      />
    </div>
  );
}

RangeFilter.propTypes = {
  id: PropTypes.string.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};
