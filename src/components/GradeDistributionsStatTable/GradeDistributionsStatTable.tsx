import BarGraphStatTable from "../BarGraphStatTable";

export interface GradeDistribution {
  grade: string;
  reviewCount: number;
}

export default function GradeDistributionsStatTable({
  collection,
}: {
  collection: GradeDistribution[];
}): JSX.Element {
  return BarGraphStatTable<GradeDistribution>({
    heading: "Grades Distribution",
    collection,
    nameHeaderText: "Grade",
    valueHeaderText: "Reviews",
    nameFunc: (item) => item.grade,
    valueFunc: (item) => item.reviewCount,
  });
}
