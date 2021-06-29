import React, { ReactElement } from "react";
import {
  fillCellCss,
  headingCss,
  leftCellCss,
  leftHeaderCss,
  rightCellCss,
  rightHeaderCss,
  rowCss,
  tableCss,
} from "./StatTable.module.scss";

function LeftHeader({
  value,
}: {
  value: React.ReactNode;
}): ReactElement<HTMLTableHeaderCellElement> {
  return <th className={leftHeaderCss}>{value}</th>;
}

function LeftCell({
  value,
}: {
  value: React.ReactNode;
}): ReactElement<HTMLTableHeaderCellElement> {
  return <td className={leftCellCss}>{value}</td>;
}

function FillCell({
  children,
}: {
  children: React.ReactNode;
}): ReactElement<HTMLTableHeaderCellElement> {
  return <td className={fillCellCss}>{children}</td>;
}

function RightCell({
  value,
}: {
  value: React.ReactNode;
}): ReactElement<HTMLTableHeaderCellElement> {
  return <td className={rightCellCss}>{value}</td>;
}

function RightHeader({
  value,
}: {
  value: React.ReactNode;
}): ReactElement<HTMLTableHeaderCellElement> {
  return <th className={rightHeaderCss}>{value}</th>;
}

function SpacerHeader(): ReactElement<HTMLTableHeaderCellElement> {
  return <th>&nbsp;</th>;
}

function Row({
  children,
}: {
  children: ReactElement<HTMLTableDataCellElement>[];
}): ReactElement<HTMLTableRowElement> {
  return <tr className={rowCss}>{children}</tr>;
}

function StatTable<T>({
  heading,
  headers,
  collection,
  renderRow,
}: {
  heading: string;
  headers: ReactElement<HTMLTableHeaderCellElement>[];
  collection: T[];
  renderRow: (item: T, index: number) => ReactElement<HTMLTableRowElement>;
}): JSX.Element {
  return (
    <>
      <h2 className={headingCss}>{heading}</h2>
      <table className={tableCss}>
        <thead>
          <tr>{headers}</tr>
        </thead>
        <tbody>
          {collection.map((item, index) => {
            return renderRow(item, index);
          })}
        </tbody>
      </table>
    </>
  );
}

StatTable.LeftHeader = LeftHeader;
StatTable.RightCell = RightCell;
StatTable.RightHeader = RightHeader;
StatTable.Row = Row;
StatTable.FillCell = FillCell;
StatTable.SpacerHeader = SpacerHeader;
StatTable.LeftCell = LeftCell;

export default StatTable;
