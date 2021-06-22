import BarGraphTable from "../BarGraphTable";

interface DecadeWithAverageGrade {
  decade: string;
  averageGradeValue: number;
}

export default function AverageGradeForDecadeTable({
  decadeStats,
}: {
  decadeStats: DecadeWithAverageGrade[];
}): JSX.Element {
  return BarGraphTable<DecadeWithAverageGrade>({
    heading: "Average Grades For Release Decade",
    collection: decadeStats,
    nameHeaderText: "Decade",
    valueHeaderText: "Grade",
    renderName: (item) => item.decade,
    renderValue: (item) => item.averageGradeValue,
  });
}
