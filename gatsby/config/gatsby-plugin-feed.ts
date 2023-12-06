import { textStarsForGrade } from "../../src/utils/textStarsForGrade";

const query = `{
  reviewedTitle: allReviewedTitlesJson(sort: {sequence: DESC}, limit: 25) {
    nodes {
      sequence
      date: reviewDate
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
      review {
        excerpt
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
  reviewedTitle: {
    nodes: QueryNode[];
  };
}

interface QueryNode {
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
  review: {
    excerpt: string;
  };
}

function addMetaToExcerpt(excerpt: string, reviewedTitle: QueryNode) {
  const meta = `${textStarsForGrade(
    reviewedTitle.grade,
  )} D: ${reviewedTitle.directorNames.join(
    ", ",
  )}. ${reviewedTitle.principalCastNames.join(", ")}.`;

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
  return query.reviewedTitle.nodes.map((reviewedTitle) => {
    return {
      title: `${reviewedTitle.title} (${reviewedTitle.year})`,
      date: reviewedTitle.date,
      url: `${query.site.siteMetadata.siteUrl}/reviews/${reviewedTitle.slug}/`,
      guid: `${query.site.siteMetadata.siteUrl}/${reviewedTitle.sequence}-${reviewedTitle.slug}`,
      custom_elements: [
        {
          "content:encoded": `<img src="${
            reviewedTitle.still.childImageSharp.resize.src
          }" alt="A still from ${reviewedTitle.title}">${addMetaToExcerpt(
            reviewedTitle.review.excerpt,
            reviewedTitle,
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
