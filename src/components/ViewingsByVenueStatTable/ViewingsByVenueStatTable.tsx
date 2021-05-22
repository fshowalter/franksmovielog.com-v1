import BarGraphStatTable from "../BarGraphStatTable";

export interface VenueWithViewings {
  name: string;
  viewingCount: number;
}

export default function ViewingsByVenueStatTable({
  collection,
}: {
  collection: VenueWithViewings[];
}): JSX.Element {
  return BarGraphStatTable<VenueWithViewings>({
    heading: "Viewings By Venue",
    collection: collection,
    nameHeaderText: "Venue",
    valueHeaderText: "Viewings",
    nameFunc: (item) => item.name,
    valueFunc: (item) => item.viewingCount,
  });
}
