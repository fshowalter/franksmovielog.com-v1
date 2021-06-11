import BarGraphStatTable from "../BarGraphStatTable";

export interface DecadeWithAverageGrade {
  decade: string;
  averageGradeValue: number;
}

export default function AverageGradeForDecadesStatTable({
  collection,
}: {
  collection: DecadeWithAverageGrade[];
}): JSX.Element {
  return BarGraphStatTable<DecadeWithAverageGrade>({
    heading: "Average Grades For Release Decade",
    collection,
    nameHeaderText: "Decade",
    valueHeaderText: "Grade",
    nameFunc: (item) => item.decade,
    valueFunc: (item) => item.averageGradeValue,
  });
}
