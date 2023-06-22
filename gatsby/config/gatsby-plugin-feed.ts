const query = `{
  viewings: viewingsWithReviewOrNote(sort: {sequence: DESC}, limit: 25) {
    sequence
    date: viewingDate
    title
    year
    slug
    grade
    principalCastNames
    directorNames
    still {
      childImageSharp {
        resize(toFormat: JPG, width: 1200, quality: 80) {
          src
        }
      }
    }
    excerpt
  }
}`;

interface QueryResult {
  site: {
    siteMetadata: {
      title: string;
      description: string;
      siteUrl: string;
    };
  };
  viewings: ViewingNode[];
}

interface ViewingNode {
  sequence: number;
  date: string;
  title: string;
  year: string;
  slug: string;
  grade: string;
  directorNames: string[];
  principalCastNames: string[];
  still: {
    childImageSharp: {
      resize: {
        src: string;
      };
    };
  };
  excerpt: string;
}

const gradeMap: Record<string, string> = {
  A: "&#9733;&#9733;&#9733;&#9733;&#9733;",
  "A+": "&#9733;&#9733;&#9733;&#9733;&#9733;",
  "A-": "&#9733;&#9733;&#9733;&#9733;&#189;",
  B: "&#9733;&#9733;&#9733;&#9733;",
  "B+": "&#9733;&#9733;&#9733;&#9733;",
  "B-": "&#9733;&#9733;&#9733;&#189;",
  C: "&#9733;&#9733;&#9733;",
  "C+": "&#9733;&#9733;&#9733;",
  "C-": "&#9733;&#9733;&#189;",
  D: "&#9733;&#9733;",
  "D+": "&#9733;&#9733;",
  "D-": "&#9733;&#189;",
  F: "&#9733;",
};

function starsForGrade(grade: string) {
  if (grade in gradeMap) {
    return gradeMap[grade];
  }

  return "";
}

function addMetaToExcerpt(excerpt: string, viewing: ViewingNode) {
  const meta = `${starsForGrade(viewing.grade)} D: ${viewing.directorNames.join(
    ", "
  )}. ${viewing.principalCastNames.join(", ")}.`;

  return `<p>${meta}</p>${excerpt}`;
}

function setup(options: Record<string, unknown>) {
  return {
    ...options,
    custom_elements: [
      {
        'atom:link href="https://www.franksmovielog.com/feed.xml" rel="self" type="application/rss+xml"':
          null,
      },
    ],
  };
}

function serialize({ query }: { query: QueryResult }) {
  return query.viewings.map((viewing) => {
    return {
      title: `${viewing.title} (${viewing.year})`,
      date: viewing.date,
      url: `${query.site.siteMetadata.siteUrl}/reviews/${viewing.slug}/`,
      guid: `${query.site.siteMetadata.siteUrl}/${viewing.sequence}-${viewing.slug}`,
      custom_elements: [
        {
          "content:encoded": `<img src="${
            viewing.still.childImageSharp.resize.src
          }" alt="A still from ${viewing.title}">${addMetaToExcerpt(
            viewing.excerpt,
            viewing
          )}`,
        },
      ],
    };
  });
}

export default {
  resolve: `gatsby-plugin-feed`,
  options: {
    feeds: [
      {
        setup: setup,
        serialize: serialize,
        query,
        output: "/feed.xml",
        title: "Frank's Movie Log",
        site_url: "https://www.franksmovielog.com/",
        image_url: "https://www.franksmovielog.com/assets/favicon-128.png",
      },
    ],
  },
};
