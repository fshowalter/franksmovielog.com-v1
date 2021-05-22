import React from "react";
import {
  Table,
  TableFillDataCell,
  TableNumberDataCell,
  TableNumberHeader,
  TableRow,
  TableSpacerHeader,
  TableTextDataCell,
  TableTextHeader,
} from "../Table";
import { barCss } from "./TableWithBarGraph.module.scss";

function BarGraph({
  value,
  maxValue,
}: {
  value: number;
  maxValue: number;
}): JSX.Element {
  const barPercentProperty = {
    "--bar-percent": `${(value / maxValue) * 100}%`,
  } as React.CSSProperties;

  return (
    <div className={barCss} style={barPercentProperty}>
      &nbsp;
    </div>
  );
}

export default function TableWithBarGraph<T>({
  collection,
  nameHeaderText,
  valueHeaderText,
  nameFunc,
  valueFunc,
}: {
  collection: T[];
  nameHeaderText: string;
  valueHeaderText: string;
  nameFunc: (x: T) => string;
  valueFunc: (x: T) => number;
}): JSX.Element {
  const maxBar = collection.reduce((acc, item) => {
    const value = valueFunc(item);
    return acc > value ? acc : value;
  }, 0);

  const headers = [
    <TableTextHeader text={nameHeaderText} />,
    <TableSpacerHeader />,
    <TableNumberHeader text={valueHeaderText} />,
  ];

  const rows = collection.map((item) => {
    const value = valueFunc(item);
    const name = nameFunc(item);

    return (
      <TableRow>
        <TableTextDataCell text={name} />
        <TableFillDataCell>
          <BarGraph value={value} maxValue={maxBar} />
        </TableFillDataCell>
        <TableNumberDataCell number={value} />
      </TableRow>
    );
  });

  return <Table headers={headers}>{rows}</Table>;
}
