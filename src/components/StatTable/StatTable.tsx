import React, { ReactElement } from "react";
import {
  fillDataCellCss,
  headingCss,
  numberDataCellCss,
  numberHeaderCss,
  rowCss,
  tableCss,
  textDataCellCss,
  textHeaderCss,
} from "./StatTable.module.scss";

export function StatTableTextHeader({
  text,
}: {
  text: string;
}): ReactElement<HTMLTableHeaderCellElement> {
  return <th className={textHeaderCss}>{text}</th>;
}

export function StatTableTextDataCell({
  text,
}: {
  text: string;
}): ReactElement<HTMLTableHeaderCellElement> {
  return <td className={textDataCellCss}>{text}</td>;
}

export function StatTableFillDataCell({
  children,
}: {
  children: JSX.Element;
}): ReactElement<HTMLTableHeaderCellElement> {
  return <td className={fillDataCellCss}>{children}</td>;
}

export function StatTableNumberDataCell({
  number,
}: {
  number: number;
}): ReactElement<HTMLTableHeaderCellElement> {
  return <td className={numberDataCellCss}>{number}</td>;
}

export function StatTableNumberHeader({
  text,
}: {
  text: string;
}): ReactElement<HTMLTableHeaderCellElement> {
  return <th className={numberHeaderCss}>{text}</th>;
}

export function StatTableSpacerHeader(): ReactElement<HTMLTableHeaderCellElement> {
  return <th>&nbsp;</th>;
}

export function StatTableRow({
  children,
}: {
  children: ReactElement<HTMLTableDataCellElement>[];
}): ReactElement<HTMLTableRowElement> {
  return <tr className={rowCss}>{children}</tr>;
}

export default function TableHeading({ text }: { text: string }): JSX.Element {
  return <h2 className={headingCss}>{text}</h2>;
}

export function StatTable({
  heading,
  headers,
  children,
}: {
  heading: string;
  headers: ReactElement<HTMLTableHeaderCellElement>[];
  children: ReactElement<HTMLTableRowElement>[];
}): JSX.Element {
  return (
    <>
      <TableHeading text={heading} />
      <table className={tableCss}>
        <thead>
          <tr>{headers}</tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </>
  );
}
