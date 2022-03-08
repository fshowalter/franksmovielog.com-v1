import type { GatsbyConfig } from "gatsby";
import path from "path";

interface SiteMetadata {
  [index: string]: string;
  author: string;
  siteUrl: string;
  image: string;
  title: string;
}

const siteMetadata: SiteMetadata = {
  author: "Frank Showalter",
  siteUrl: "https://www.franksmovielog.com/",
  image: "assets/default_og.jpg",
  title: "Frank's Movie Log",
};

const gatsbyPluginPageCreator = {
  resolve: `gatsby-plugin-page-creator`,
  options: {
    path: path.resolve("src/pages"),
    ignore: {
      patterns: [`*.fixtures.ts`],
    },
  },
};

const gatsbyPluginSitemap = {
  resolve: "gatsby-plugin-sitemap",
  options: {
    createLinkInHead: false,
  },
};

const gatsbySourceFileSystemBackdrops = {
  resolve: "gatsby-source-filesystem",
  options: {
    name: "backdrops",
    path: path.resolve("content/assets/backdrops/"),
  },
};

const gatsbySourceFileSystemPosters = {
  resolve: `gatsby-source-filesystem`,
  options: {
    name: "posters",
    path: path.resolve("content/assets/posters/"),
  },
};

const gatsbySourceFileSystemAvatars = {
  resolve: `gatsby-source-filesystem`,
  options: {
    name: "avatars",
    path: path.resolve("content/assets/avatars/"),
  },
};

const gatsbySourceFileSystemData = {
  resolve: `gatsby-source-filesystem`,
  options: {
    path: path.resolve("content/data/"),
    name: "data",
  },
};

const gatsbySourceFileSystemPages = {
  resolve: `gatsby-source-filesystem`,
  options: {
    path: path.resolve("content/pages"),
    name: `pages`,
  },
};

const gatsbySourceFileSystemReviews = {
  resolve: `gatsby-source-filesystem`,
  options: {
    path: path.resolve("content/reviews"),
    name: `reviews`,
  },
};

const gatsbyTransformerRemark = {
  resolve: `gatsby-transformer-remark`,
  options: {
    excerpt_separator: `<!-- end -->`,
    plugins: [`gatsby-remark-smartypants`],
  },
};

const gatsbyPluginCatchLinks = {
  resolve: `gatsby-plugin-catch-links`,
  options: {
    excludePattern: /#/,
  },
};

const gatsbyPluginManifest = {
  resolve: `gatsby-plugin-manifest`,
  options: {
    name: `Frank's Movie Log`,
    short_name: `Movie Log`,
    start_url: `/`,
    background_color: `#e9e7e0`,
    theme_color: `#222`,
    display: `minimal-ui`,
    icon: `src/images/favicon.png`, // This path is relative to the root of the site.
    legacy: false,
    theme_color_in_head: false,
  },
};

interface FeedReview {
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

function addMetaToExcerpt(excerpt: string, review: FeedReview) {
  const meta = `${starsForGrade(
    review.frontmatter.grade[0]
  )} D: ${review.reviewedMovie.directorNames.join(
    ", "
  )}. ${review.reviewedMovie.principalCastNames.join(", ")}.`;

  return `<p>${meta}</p>${excerpt}`;
}

const gatsbyPluginFeed = {
  resolve: `gatsby-plugin-feed`,
  options: {
    feeds: [
      {
        setup: (options: Record<string, unknown>) => ({
          ...options,
          custom_elements: [
            {
              'atom:link href="https://www.franksmovielog.com/feed.xml" rel="self" type="application/rss+xml"':
                null,
            },
          ],
        }),
        serialize: ({
          query: { site, allMarkdownRemark },
        }: {
          query: {
            site: { siteMetadata: SiteMetadata };
            allMarkdownRemark: { nodes: FeedReview[] };
          };
        }) => {
          return allMarkdownRemark.nodes.map((node) => {
            return {
              title: `${node.reviewedMovie.title} (${node.reviewedMovie.year})`,
              date: node.frontmatter.date,
              url: `${site.siteMetadata.siteUrl}/reviews/${node.reviewedMovie.slug}/`,
              guid: `${site.siteMetadata.siteUrl}/${node.frontmatter.sequence}-${node.reviewedMovie.slug}`,
              custom_elements: [
                {
                  "content:encoded": `<img src="${
                    node.reviewedMovie.image.childImageSharp.resize.src
                  }" alt="A still from ${
                    node.reviewedMovie.title
                  }">${addMetaToExcerpt(node.linkedExcerpt, node)}`,
                },
              ],
            };
          });
        },
        query: `
          {
            allMarkdownRemark(
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
          }
        `,
        output: "/feed.xml",
        title: "Frank's Movie Log",
        site_url: "https://www.franksmovielog.com/",
        image_url: "https://www.franksmovielog.com/assets/favicon-128.png",
      },
    ],
  },
};

const config: GatsbyConfig = {
  siteMetadata: siteMetadata,
  plugins: [
    gatsbyPluginPageCreator,
    gatsbyPluginSitemap,
    "gatsby-plugin-sass",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    gatsbySourceFileSystemBackdrops,
    gatsbySourceFileSystemPosters,
    gatsbySourceFileSystemAvatars,
    "gatsby-transformer-json",
    gatsbySourceFileSystemData,
    gatsbySourceFileSystemPages,
    gatsbySourceFileSystemReviews,
    gatsbyTransformerRemark,
    gatsbyPluginCatchLinks,
    gatsbyPluginManifest,
    gatsbyPluginFeed,
    "gatsby-plugin-preact",
  ],
};

export default config;
