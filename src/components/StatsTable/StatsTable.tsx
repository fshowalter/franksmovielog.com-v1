import React from "react";
import { composeClassNames } from "../../styles/composeClassNames";
import type { IBoxProps } from "../Box";
import { Box } from "../Box";
import {
  hideOnSmallScreensStyle,
  stickyTableHeaderStyle,
  tableBorderStyle,
  tableWhiteSpaceStyle,
} from "./StatsTable.css";

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
      width="full"
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
    <Box as="tr" lineHeight={40} backgroundColor="zebraOdd">
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
      <Box as="th" textAlign="left" paddingLeft="popoutGutter">
        {children}
      </Box>
    );
  }

  return (
    <Box as="th" textAlign="right" paddingRight="popoutGutter">
      {children}
    </Box>
  );
}

interface ITableDataCellProps extends IBoxProps {
  hideOnSmallScreens?: boolean;
  align: "left" | "right" | "fill";
}

export function TableDataCell({
  align,
  children,
  hideOnSmallScreens = false,
  ...rest
}: ITableDataCellProps): JSX.Element {
  const className = hideOnSmallScreens ? hideOnSmallScreensStyle : undefined;

  if (align === "fill") {
    return (
      <Box as="td" width="full" paddingY={0} className={className} {...rest}>
        {children}
      </Box>
    );
  }

  if (align === "left") {
    return (
      <Box
        as="td"
        textAlign="left"
        paddingY={0}
        paddingX="popoutGutter"
        className={className}
        {...rest}
      >
        {children}
      </Box>
    );
  }

  return (
    <Box
      as="td"
      textAlign="right"
      paddingY={0}
      paddingRight="popoutGutter"
      className={className}
      {...rest}
    >
      {children}
    </Box>
  );
}
