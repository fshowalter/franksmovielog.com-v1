import React, { ReactElement } from "react";
import {
  StatTable,
  StatTableFillDataCell,
  StatTableNumberDataCell,
  StatTableNumberHeader,
  StatTableRow,
  StatTableSpacerHeader,
  StatTableTextHeader,
} from "../StatTable";
import {
  detailsLabelCss,
  detailsListCss,
  tableIndexCellCss,
} from "./DetailsStatTable.module.scss";

function DetailsStatTableIndexCell({
  index,
}: {
  index: number;
}): ReactElement<HTMLTableDataCellElement> {
  return <td className={tableIndexCellCss}>{index}.&nbsp;</td>;
}

export default function DetailsStatTable<T>({
  heading,
  collection,
  nameHeaderText,
  valueHeaderText,
  nameFunc,
  valueFunc,
  detailsFunc,
}: {
  heading: string;
  collection: T[];
  nameHeaderText: string;
  valueHeaderText: string;
  nameFunc: (x: T) => JSX.Element;
  valueFunc: (x: T) => number;
  detailsFunc: (x: T) => ReactElement<HTMLLIElement>[];
}): JSX.Element {
  const headers = [
    <StatTableSpacerHeader />,
    <StatTableTextHeader text={nameHeaderText} />,
    <StatTableNumberHeader text={valueHeaderText} />,
  ];

  const rows = collection.map((item, index) => {
    const value = valueFunc(item);
    const name = nameFunc(item);

    return (
      <>
        <StatTableRow>
          <DetailsStatTableIndexCell index={index + 1} />
          <StatTableFillDataCell>{name}</StatTableFillDataCell>
          <StatTableNumberDataCell number={value} />
        </StatTableRow>
        <tr>
          <td>&nbsp;</td>
          <td colSpan={2}>
            <details>
              <summary className={detailsLabelCss}>Details</summary>
              <ul className={detailsListCss}>{detailsFunc(item)}</ul>
            </details>
          </td>
        </tr>
      </>
    );
  });

  return (
    <StatTable heading={heading} headers={headers}>
      {rows}
    </StatTable>
  );
}
