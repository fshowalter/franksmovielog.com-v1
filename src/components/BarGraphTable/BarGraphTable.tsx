import React from "react";
import StatTable from "../StatTable";
import { barCss } from "./BarGraphTable.module.scss";

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

export default function BarGraphTable<T>({
  heading,
  collection,
  nameHeaderText,
  valueHeaderText,
  renderName,
  renderValue,
}: {
  heading: string;
  collection: T[];
  nameHeaderText: string;
  valueHeaderText: string;
  renderName: (x: T) => string;
  renderValue: (x: T) => number;
}): JSX.Element {
  const maxBar = collection.reduce((acc, item) => {
    const value = renderValue(item);
    return acc > value ? acc : value;
  }, 0);

  const headers = [
    <StatTable.LeftHeader key={0} value={nameHeaderText} />,
    <StatTable.SpacerHeader key={1} />,
    <StatTable.RightHeader key={2} value={valueHeaderText} />,
  ];

  function renderRow(item: T) {
    const value = renderValue(item);
    const name = renderName(item);

    return (
      <StatTable.Row key={name}>
        <StatTable.LeftCell value={name} />
        <StatTable.FillCell>
          <BarGraph value={value} maxValue={maxBar} />
        </StatTable.FillCell>
        <StatTable.RightCell value={value} />
      </StatTable.Row>
    );
  }

  return (
    <StatTable
      heading={heading}
      headers={headers}
      collection={collection}
      renderRow={renderRow}
    />
  );
}
