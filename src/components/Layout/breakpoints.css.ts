import { createContainer } from "@vanilla-extract/css";
import { generateMinContainerQuery } from "../../styles/breakpoints";

export const breakpoints = {
  tablet: "510px",
  desktop: "1120px",
  max: "1408px",
};

export const pageContainerName = createContainer();

export const minContainerQuery = generateMinContainerQuery(
  breakpoints,
  pageContainerName
);
