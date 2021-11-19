import React from "react";
import {
  hideOnSmallScreensCss,
  tableCss,
  tableDataCellFillCss,
  tableDataCellLeftCss,
  tableDataCellRightCss,
  tableHeadCss,
  tableHeaderCellLeftCss,
  tableHeaderCellRightCss,
  tableRowCss,
} from "./Table.module.scss";

export function Table({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return <table className={tableCss}>{children}</table>;
}

export function TableHead({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return <thead className={tableHeadCss}>{children}</thead>;
}

export function TableRow({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return <tr className={tableRowCss}>{children}</tr>;
}

export function TableHeaderCell({
  align,
  children,
}: {
  align: "left" | "right";
  children: React.ReactNode;
}): JSX.Element {
  const classMap = {
    left: tableHeaderCellLeftCss,
    right: tableHeaderCellRightCss,
  };

  return <th className={classMap[align]}>{children}</th>;
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
  const classMap = {
    left: tableDataCellLeftCss,
    right: tableDataCellRightCss,
    fill: tableDataCellFillCss,
  };

  const classNames = [classMap[align]];

  if (hideOnSmallScreens) {
    classNames.push(hideOnSmallScreensCss);
  }

  return <td className={classNames.join(" ")}>{children}</td>;
}
