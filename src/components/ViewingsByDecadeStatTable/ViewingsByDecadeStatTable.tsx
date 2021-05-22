import BarGraphStatTable from "../BarGraphStatTable";

interface DecadeWithViewings {
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
    collection: collection,
    nameHeaderText: "Venue",
    valueHeaderText: "Viewings",
    nameFunc: (item) => item.decade,
    valueFunc: (item) => item.viewingCount,
  });
}
