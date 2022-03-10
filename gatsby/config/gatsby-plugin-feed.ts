const query = `
{
  review: allMarkdownRemark(
    sort: { order: DESC, fields: [frontmatter___sequence] },
    limit: 25,
    filter: { postType: { eq: "REVIEW" } }
  ) {
    nodes {
      linkedExcerpt
      frontmatter {
          date
          sequence
          grade
      }
      reviewedMovie {
        title
        year
        slug
        principalCastNames: principal_cast_names
        directorNames: director_names
        image: backdrop {
          childImageSharp {
            resize(toFormat: JPG, width: 1200, quality: 80) {
              src
            }
          }
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
  review: {
    nodes: Review[];
  };
}

interface Review {
  frontmatter: {
    grade: string;
    date: string;
    sequence: number;
  };
  reviewedMovie: {
    directorNames: string[];
    principalCastNames: string[];
    title: string;
    year: string;
    slug: string;
    image: {
      childImageSharp: {
        resize: {
          src: string;
        };
      };
    };
  };
  linkedExcerpt: string;
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

function addMetaToExcerpt(excerpt: string, review: Review) {
  const meta = `${starsForGrade(
    review.frontmatter.grade[0]
  )} D: ${review.reviewedMovie.directorNames.join(
    ", "
  )}. ${review.reviewedMovie.principalCastNames.join(", ")}.`;

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
  return query.review.nodes.map((node) => {
    return {
      title: `${node.reviewedMovie.title} (${node.reviewedMovie.year})`,
      date: node.frontmatter.date,
      url: `${query.site.siteMetadata.siteUrl}/reviews/${node.reviewedMovie.slug}/`,
      guid: `${query.site.siteMetadata.siteUrl}/${node.frontmatter.sequence}-${node.reviewedMovie.slug}`,
      custom_elements: [
        {
          "content:encoded": `<img src="${
            node.reviewedMovie.image.childImageSharp.resize.src
          }" alt="A still from ${node.reviewedMovie.title}">${addMetaToExcerpt(
            node.linkedExcerpt,
            node
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
