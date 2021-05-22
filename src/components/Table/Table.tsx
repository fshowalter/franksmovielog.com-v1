import React, { ReactElement } from "react";
import {
  fillDataCellCss,
  numberDataCellCss,
  numberHeaderCss,
  rowCss,
  tableCss,
  textDataCellCss,
  textHeaderCss,
} from "./Table.module.scss";

export function TableTextHeader({
  text,
}: {
  text: string;
}): ReactElement<HTMLTableHeaderCellElement> {
  return <th className={textHeaderCss}>{text}</th>;
}

export function TableTextDataCell({
  text,
}: {
  text: string;
}): ReactElement<HTMLTableHeaderCellElement> {
  return <td className={textDataCellCss}>{text}</td>;
}

export function TableFillDataCell({
  children,
}: {
  children: JSX.Element;
}): ReactElement<HTMLTableHeaderCellElement> {
  return <td className={fillDataCellCss}>{children}</td>;
}

export function TableNumberDataCell({
  number,
}: {
  number: number;
}): ReactElement<HTMLTableHeaderCellElement> {
  return <td className={numberDataCellCss}>{number}</td>;
}

export function TableNumberHeader({
  text,
}: {
  text: string;
}): ReactElement<HTMLTableHeaderCellElement> {
  return <th className={numberHeaderCss}>{text}</th>;
}

export function TableSpacerHeader(): ReactElement<HTMLTableHeaderCellElement> {
  return <th>&nbsp;</th>;
}

export function TableRow({
  children,
}: {
  children: ReactElement<HTMLTableDataCellElement>[];
}): ReactElement<HTMLTableRowElement> {
  return <tr className={rowCss}>{children}</tr>;
}

export function Table({
  headers,
  children,
}: {
  headers: ReactElement<HTMLTableHeaderCellElement>[];
  children: ReactElement<HTMLTableRowElement>[];
}): JSX.Element {
  return (
    <table className={tableCss}>
      <thead>
        <tr>{headers}</tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
}
