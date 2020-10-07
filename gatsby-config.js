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
    }, // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
    "gatsby-plugin-preact",
    "gatsby-plugin-webpack-bundle-analyser-v2",
  ],
};
