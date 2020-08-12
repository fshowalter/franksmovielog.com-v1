import PropTypes from "prop-types";
import React from "react";

export type onChangeHandler = (...args: unknown[]) => void;

/**
 * Wraps a given function in a setTimeout call with the given milliseconds.
 * @param func The function to wrap.
 * @param wait The number of millisecods to wait before executing.
 * @param args The function args.
 */
function delay<F extends onChangeHandler>(
  func: F,
  wait: number,
  ...args: unknown[]
): NodeJS.Timeout {
  return setTimeout(function delayWrap() {
    return func(...args);
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

  const later = function later(...args: unknown[]) {
    timeout = null;
    if (args) {
      func(...args);
    }
  };

  return function debouncedFunction(...args): void {
    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = delay(later, wait, null, args);
  };
}

export default function DebouncedInput({
  className,
  id,
  placeholder = "",
  onChange,
}: {
  className?: string;
  id: string;
  placeholder: string;
  onChange: onChangeHandler;
}): JSX.Element {
  const debouncedHandleChange = underscoreDebounce(onChange, 150);

  return (
    <input
      className={className}
      type="text"
      id={id}
      placeholder={placeholder}
      onChange={(e) => debouncedHandleChange(e.target.value)}
    />
  );
}

DebouncedInput.defaultProps = {
  placeholder: "",
  className: null,
};

DebouncedInput.propTypes = {
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};
