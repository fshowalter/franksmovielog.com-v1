import BarGraphStatTable from "../BarGraphStatTable";

export interface DecadeWithViewings {
  decade: string;
  viewingCount: number;
}

export default function ViewingsByDecadeStatTable({
  collection,
}: {
  collection: DecadeWithViewings[];
}): JSX.Element {
  return BarGraphStatTable<DecadeWithViewings>({
    heading: "Viewings By Release Decade",
    collection,
    nameHeaderText: "Decade",
    valueHeaderText: "Viewings",
    nameFunc: (item) => item.decade,
    valueFunc: (item) => item.viewingCount,
  });
}
