import React from "react";
import ReactSlider from "react-slider";
import styles from "./rangeInput.module.scss";

/**
 * Renders a dual-handle range slider.
 */
export default function RangeFilter({
  id,
  min,
  max,
  onChange,
}: {
  /** A unique id for this form control. */
  id: string;
  /** The lowest number in the range. */
  min: number;
  /** The highest number in the range. */
  max: number;
  /** Handler called when the control changes. */
  onChange: (values: [number, number]) => void;
}): JSX.Element {
  const initialState: [number, number] = [min, max];

  const [state, setState] = React.useState(initialState.slice());

  /**
   * Validates a given pair of values fall within the min and max.
   * @param values The values to validate.
   */
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
