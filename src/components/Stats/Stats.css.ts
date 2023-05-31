import { style } from "@vanilla-extract/css";
import { relativeSize } from "../../styles/sizes.css";

export const maxWidthStyle = style({
  maxWidth: relativeSize[960],
  width: "100%",
  margin: "0 auto",
});
