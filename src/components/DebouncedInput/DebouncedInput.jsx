import React from "react";
import PropTypes from "prop-types";

function delay(func, wait, ...args) {
  return setTimeout(function delayWrap() {
    return func(...args);
  }, wait);
}

function underscoreDebounce(func, wait) {
  let result;
  let timeout = null;

  const later = function later(context, args) {
    timeout = null;
    if (args) {
      result = func.apply(context, args);
    }
  };

  return function debouncedFunction(...args) {
    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = delay(later, wait, null, args);
    return result;
  };
}

export default function DebouncedInput({
  className,
  id,
  placeholder,
  onChange,
}) {
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
