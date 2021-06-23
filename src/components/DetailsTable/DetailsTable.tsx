import React, { ReactElement } from "react";
import StatTable from "../StatTable";
import {
  detailsLabelCss,
  detailsListCss,
  tableIndexCellCss,
} from "./DetailsTable.module.scss";

function IndexCell({
  index,
}: {
  index: number;
}): ReactElement<HTMLTableDataCellElement> {
  return <td className={tableIndexCellCss}>{index}.&nbsp;</td>;
}

export default function DetailsStatTable<T>({
  heading,
  collection,
  leftHeaderText,
  rightHeaderText,
  renderKey,
  renderLeft,
  renderRight,
  renderDetails,
}: {
  heading: string;
  collection: T[];
  leftHeaderText: string;
  rightHeaderText: string;
  renderKey: (x: T) => string | number;
  renderLeft: (x: T) => React.ReactNode;
  renderRight: (x: T) => React.ReactNode;
  renderDetails: (x: T) => ReactElement<HTMLLIElement>[];
}): JSX.Element {
  const headers = [
    <StatTable.SpacerHeader key={0} />,
    <StatTable.LeftHeader key={1} value={leftHeaderText} />,
    <StatTable.RightHeader key={2} value={rightHeaderText} />,
  ];

  function renderRow(item: T, index: number) {
    const name = renderLeft(item);
    const value = renderRight(item);

    return (
      <React.Fragment key={renderKey(item)}>
        <StatTable.Row>
          <IndexCell index={index + 1} />
          <StatTable.FillCell>{name}</StatTable.FillCell>
          <StatTable.RightCell value={value} />
        </StatTable.Row>
        <tr>
          <td>&nbsp;</td>
          <td colSpan={2}>
            <details>
              <summary className={detailsLabelCss}>Details</summary>
              <ul className={detailsListCss}>{renderDetails(item)}</ul>
            </details>
          </td>
        </tr>
      </React.Fragment>
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
