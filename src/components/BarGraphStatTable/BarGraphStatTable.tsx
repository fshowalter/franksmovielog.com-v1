import React from "react";
import {
  StatTable,
  StatTableFillDataCell,
  StatTableNumberDataCell,
  StatTableNumberHeader,
  StatTableRow,
  StatTableSpacerHeader,
  StatTableTextDataCell,
  StatTableTextHeader,
} from "../StatTable";
import { barCss } from "./BarGraphStatTable.module.scss";

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

export default function BarGraphStatTable<T>({
  heading,
  collection,
  nameHeaderText,
  valueHeaderText,
  nameFunc,
  valueFunc,
}: {
  heading: string;
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
    <StatTableTextHeader text={nameHeaderText} />,
    <StatTableSpacerHeader />,
    <StatTableNumberHeader text={valueHeaderText} />,
  ];

  const rows = collection.map((item) => {
    const value = valueFunc(item);
    const name = nameFunc(item);

    return (
      <StatTableRow>
        <StatTableTextDataCell text={name} />
        <StatTableFillDataCell>
          <BarGraph value={value} maxValue={maxBar} />
        </StatTableFillDataCell>
        <StatTableNumberDataCell number={value} />
      </StatTableRow>
    );
  });

  return (
    <StatTable heading={heading} headers={headers}>
      {rows}
    </StatTable>
  );
}
