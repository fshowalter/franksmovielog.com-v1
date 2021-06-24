import React from "react";
import { inputCss, labelCss } from "./DebouncedInput.module.scss";

export type onChangeHandler = (value: string) => void;

/**
 * Wraps a given function in a setTimeout call with the given milliseconds.
 * @param func The function to wrap.
 * @param wait The number of millisecods to wait before executing.
 * @param args The function args.
 */
function delay<F extends onChangeHandler>(
  func: F,
  wait: number,
  value: string
): NodeJS.Timeout {
  return setTimeout(function delayWrap() {
    return func(value);
  }, wait);
}

/**
 * Debounce function lifted from underscore.js.
 * @param func The function to wrap.
 * @param wait The number of milliseconds to wait.
 */
function underscoreDebounce<F extends onChangeHandler>(
  func: F,
  wait: number
): onChangeHandler {
  let timeout: NodeJS.Timeout | null = null;

  const later = function later(value: string) {
    timeout = null;
    func(value);
  };

  return function debouncedFunction(value: string): void {
    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = delay(later, wait, value);
  };
}

export default function DebouncedInput({
  label,
  placeholder = "",
  onChange,
}: {
  label: string;
  placeholder?: string;
  onChange: onChangeHandler;
}): JSX.Element {
  const debouncedHandleChange = underscoreDebounce(onChange, 150);

  return (
    <label className={labelCss}>
      {label}
      <input
        className={inputCss}
        type="text"
        placeholder={placeholder}
        onChange={(e) => debouncedHandleChange(e.target.value)}
      />
    </label>
  );
}
