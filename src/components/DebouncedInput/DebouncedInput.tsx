import { Box, IBoxProps } from "../Box";
import { inputStyle } from "./DebouncedInput.css";

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

interface IDebouncedInputProps extends IBoxProps {
  label: string;
  placeholder: string;
  onInputChange: onChangeHandler;
}

export function DebouncedInput({
  label,
  placeholder,
  onInputChange,
}: IDebouncedInputProps): JSX.Element {
  const debouncedHandleChange = underscoreDebounce(onInputChange, 150);

  return (
    <Box as="label" color="subtle" display="flex" flexDirection="column">
      <Box
        as="span"
        fontSize="small"
        display="inline-block"
        letterSpacing={0.5}
        textAlign="left"
        fontWeight="semiBold"
        height={24}
      >
        {label}
      </Box>
      <Box
        as="input"
        borderRadius={4}
        className={inputStyle}
        type="text"
        placeholder={placeholder}
        onChange={(e) =>
          debouncedHandleChange((e.target as HTMLInputElement).value)
        }
      />
    </Box>
  );
}
