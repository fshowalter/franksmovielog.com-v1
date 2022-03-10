export default function valueForGrade(grade: string | null) {
  if (!grade) {
    return null;
  }

  switch (grade) {
    case "A+": {
      return 13;
    }
    case "A": {
      return 12;
    }
    case "A-": {
      return 11;
    }
    case "B+": {
      return 10;
    }
    case "B": {
      return 9;
    }
    case "B-": {
      return 8;
    }
    case "C+": {
      return 7;
    }
    case "C": {
      return 6;
    }
    case "C-": {
      return 5;
    }
    case "D+": {
      return 4;
    }
    case "D": {
      return 3;
    }
    case "D-": {
      return 2;
    }
    default: {
      return 1;
    }
  }
}
