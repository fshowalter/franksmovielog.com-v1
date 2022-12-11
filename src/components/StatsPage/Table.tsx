import React from "react";
import composeClassNames from "../../utils/composeClassNames";
import { Box } from "../Box";
import {
  hideOnSmallScreensStyle,
  stickyTableHeaderStyle,
  tableBorderStyle,
  tableWhiteSpaceStyle,
} from "./Table.css";

export function Table({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <Box
      as="table"
      position="relative"
      boxShadow="borderAll"
      className={composeClassNames(tableBorderStyle, tableWhiteSpaceStyle)}
    >
      {children}
    </Box>
  );
}

export function TableHead({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <Box
      as="thead"
      backgroundColor="default"
      paddingX={24}
      className={stickyTableHeaderStyle}
    >
      {children}
    </Box>
  );
}

export function TableRow({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <Box as="tr" backgroundColor="zebraOdd">
      {children}
    </Box>
  );
}

export function TableHeaderCell({
  align,
  children,
}: {
  align: "left" | "right";
  children: React.ReactNode;
}): JSX.Element {
  if (align === "left") {
    return (
      <Box as="th" textAlign="left" paddingLeft={24}>
        {children}
      </Box>
    );
  }

  return (
    <Box as="th" textAlign="right" paddingRight={24}>
      {children}
    </Box>
  );
}

export function TableDataCell({
  align,
  children,
  hideOnSmallScreens = false,
}: {
  hideOnSmallScreens?: boolean;
  align: "left" | "right" | "fill";
  children: React.ReactNode;
}): JSX.Element {
  const className = hideOnSmallScreens ? hideOnSmallScreensStyle : undefined;

  if (align === "fill") {
    return (
      <Box as="td" width="full" className={className}>
        {children}
      </Box>
    );
  }

  if (align === "left") {
    return (
      <Box as="td" textAlign="left" paddingX={24} className={className}>
        {children}
      </Box>
    );
  }

  return (
    <Box as="td" textAlign="right" paddingRight={24} className={className}>
      {children}
    </Box>
  );
}
