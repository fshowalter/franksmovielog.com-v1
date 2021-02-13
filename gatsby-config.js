module.exports = {
  siteMetadata: {
    author: `Frank Showalter`,
    siteUrl: "https://www.franksmovielog.com/",
    image: "assets/default_og.jpg",
    title: "Frank's Movie Log",
  },
  plugins: [
    {
      resolve: "gatsby-plugin-sitemap",
      options: {
        createLinkInHead: false,
      },
    },
    "gatsby-plugin-sass",
    "gatsby-plugin-react-helmet",
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: "backdrop",
        path: `${__dirname}/content/assets/backdrops/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: "posters",
        path: `${__dirname}/content/assets/posters/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: "avatars",
        path: `${__dirname}/content/assets/avatars/`,
      },
    },
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/data/`,
        name: "data",
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/pages`,
        name: `pages`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/posts`,
        name: `posts`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/reviews`,
        name: `reviews`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        excerpt_separator: `<!-- end -->`,
        plugins: [`gatsby-remark-smartypants`],
      },
    },
    `gatsby-plugin-catch-links`,
    {
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
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        feeds: [
          {
            setup: (options) => ({
              ...options,
              custom_elements: [
                {
                  'atom:link href="https://www.franksmovielog.com/feed.xml" rel="self" type="application/rss+xml"': null,
                },
              ],
            }),
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              function starsForGrade(grade) {
                const gradeMap = {
                  A: "&#9733;&#9733;&#9733;&#9733;&#9733;",
                  B: "&#9733;&#9733;&#9733;&#9733;",
                  C: "&#9733;&#9733;&#9733;",
                  D: "&#9733;&#9733;",
                  F: "&#9733;",
                };

                return gradeMap[grade];
              }

              function addMetaToExcerpt(excerpt, reviewData) {
                const meta = `${starsForGrade(
                  reviewData.frontmatter.grade[0]
                )} D: ${reviewData.reviewedMovie.directors
                  .map((director) => director.name)
                  .join(", ")}. ${reviewData.reviewedMovie.principalCast
                  .map((person) => person.name)
                  .join(", ")}.`;

                return `<p>${meta}</p>${excerpt}`;
              }

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
                    excerpt
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
                      principalCast: principal_cast {
                        name: full_name
                      }
                      directors {
                        name: full_name
                      }
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
    },
    "gatsby-plugin-preact",
  ],
};
