type JsonReview = {
  date: string;
  directors: { name: string }[];
  grade: string;
  gradeValue: number;
  imdbId: string;
  principalCast: { name: string }[];
  sequence: number;
  slug: string;
  title: string;
  year: string;
  releaseDate: string;
};

export default JsonReview;
