import { createContainer } from "@vanilla-extract/css";
import { generateMinContainerQuery } from "../../styles/breakpoints";

export const breakpoints = {
  columns: "calc(66ch + 288px)",
};

export const reviewContainerName = createContainer();

export const minReviewContainerQuery = generateMinContainerQuery(
  breakpoints,
  reviewContainerName
);
