const query = `#graphql
{
  viewing: allViewingsJson(
    sort: {order: DESC, fields: sequence}
    limit: 25
    filter: {reviewedMovie: {imdb_id: {ne: null}}}
  ) {
    nodes {
      sequence
      date: viewing_date
      reviewedMovie {
        title
        year
        slug
        grade
        principalCastNames: principal_cast_names
        directorNames: director_names
        image: backdrop {
          childImageSharp {
            resize(toFormat: JPG, width: 1200, quality: 80) {
              src
            }
          }
        }
        review {
          linkedExcerpt(includeCssClass: false)
        }
      }
    }
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
  viewing: {
    nodes: ViewingNode[];
  };
}

interface ViewingNode {
  sequence: number;
  date: string;
  reviewedMovie: {
    title: string;
    year: string;
    slug: string;
    grade: string;
    directorNames: string[];
    principalCastNames: string[];
    image: {
      childImageSharp: {
        resize: {
          src: string;
        };
      };
    };
    review: {
      linkedExcerpt: string;
    };
  };
}

const gradeMap: Record<string, string> = {
  A: "&#9733;&#9733;&#9733;&#9733;&#9733;",
  B: "&#9733;&#9733;&#9733;&#9733;",
  C: "&#9733;&#9733;&#9733;",
  D: "&#9733;&#9733;",
  F: "&#9733;",
};

function starsForGrade(grade: string) {
  if (grade in gradeMap) {
    return gradeMap[grade];
  }

  return "";
}

function addMetaToExcerpt(excerpt: string, viewing: ViewingNode) {
  const meta = `${starsForGrade(
    viewing.reviewedMovie.grade[0]
  )} D: ${viewing.reviewedMovie.directorNames.join(
    ", "
  )}. ${viewing.reviewedMovie.principalCastNames.join(", ")}.`;

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
  return query.viewing.nodes.map((viewing) => {
    return {
      title: `${viewing.reviewedMovie.title} (${viewing.reviewedMovie.year})`,
      date: viewing.date,
      url: `${query.site.siteMetadata.siteUrl}/reviews/${viewing.reviewedMovie.slug}/`,
      guid: `${query.site.siteMetadata.siteUrl}/${viewing.sequence}-${viewing.reviewedMovie.slug}`,
      custom_elements: [
        {
          "content:encoded": `<img src="${
            viewing.reviewedMovie.image.childImageSharp.resize.src
          }" alt="A still from ${
            viewing.reviewedMovie.title
          }">${addMetaToExcerpt(
            viewing.reviewedMovie.review.linkedExcerpt,
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
