import BarGraphTable from "../BarGraphTable";

export interface DistributionStat {
  grade: string;
  reviewCount: number;
}

export default function GradeDistributionTable({
  distributionStats,
}: {
  distributionStats: DistributionStat[];
}): JSX.Element {
  return BarGraphTable<DistributionStat>({
    heading: "Grades Distribution",
    collection: distributionStats,
    nameHeaderText: "Grade",
    valueHeaderText: "Reviews",
    renderName: (item) => item.grade,
    renderValue: (item) => item.reviewCount,
  });
}
