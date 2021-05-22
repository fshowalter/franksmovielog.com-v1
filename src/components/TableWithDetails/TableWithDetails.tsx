import React, { ReactElement } from "react";
import {
  Table,
  TableFillDataCell,
  TableNumberDataCell,
  TableNumberHeader,
  TableRow,
  TableSpacerHeader,
  TableTextHeader,
} from "../Table";
import {
  detailsLabelCss,
  detailsListCss,
  tableIndexCellCss,
} from "./TableWithDetails.module.scss";

function TableIndexCell({
  index,
}: {
  index: number;
}): ReactElement<HTMLTableDataCellElement> {
  return <td className={tableIndexCellCss}>{index}.&nbsp;</td>;
}

export default function TableWithDetails<T>({
  collection,
  nameHeaderText,
  valueHeaderText,
  nameFunc,
  valueFunc,
  detailsFunc,
}: {
  collection: T[];
  nameHeaderText: string;
  valueHeaderText: string;
  nameFunc: (x: T) => JSX.Element;
  valueFunc: (x: T) => number;
  detailsFunc: (x: T) => ReactElement<HTMLLIElement>[];
}): JSX.Element {
  const headers = [
    <TableSpacerHeader />,
    <TableTextHeader text={nameHeaderText} />,
    <TableNumberHeader text={valueHeaderText} />,
  ];

  const rows = collection.map((item, index) => {
    const value = valueFunc(item);
    const name = nameFunc(item);

    return (
      <>
        <TableRow>
          <TableIndexCell index={index + 1} />
          <TableFillDataCell>{name}</TableFillDataCell>
          <TableNumberDataCell number={value} />
        </TableRow>
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

  return <Table headers={headers}>{rows}</Table>;
}
