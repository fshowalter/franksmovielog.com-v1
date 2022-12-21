import { style } from "@vanilla-extract/css";
import {
  backgroundColors,
  borderColors,
  foregroundColors,
} from "../../styles/colors.css";

export const inputSyle = style({
  appearance: "none",
  backgroundColor: backgroundColors.subtle,
  backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' fill='%23054a93' height='20' width='20' viewBox='0 0 20 20' aria-hidden='true' focusable='false'><path d='M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z'></path></svg>")`,
  backgroundPositionX: `calc(100% - 8px)`,
  backgroundPositionY: "8px",
  backgroundRepeat: "no-repeat",
  border: 0,
  boxShadow: `0 0 0 1px ${borderColors.default}`,
  color: foregroundColors.subtle,
  fontSize: "1rem",
  lineHeight: "24px",
  padding: `8px 32px 8px 16px`,
  width: "100%",
});
