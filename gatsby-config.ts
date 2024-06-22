import type { GatsbyConfig } from "gatsby";
import path from "path";
import gatsbyPluginFeed from "./gatsby/config/gatsby-plugin-feed";

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
  image: "/assets/default_og.jpg",
  title: "Frank's Movie Log",
};

const gatsbyPluginPageCreator = {
  resolve: `gatsby-plugin-page-creator`,
  options: {
    path: path.resolve("src/pages"),
    ignore: {
      patterns: [`**.fixtures.ts`, `**.reducer.ts`],
    },
  },
};

const gatsbyPluginSitemap = {
  resolve: "gatsby-plugin-sitemap",
  options: {
    createLinkInHead: false,
  },
};

const gatsbySourceFileSystemStills = {
  resolve: "gatsby-source-filesystem",
  options: {
    name: "stills",
    path: path.resolve("content/assets/stills/"),
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

const gatsbySourceFileSystemViewingNotes = {
  resolve: `gatsby-source-filesystem`,
  options: {
    path: path.resolve("content/viewings"),
    name: `viewings`,
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

const config: GatsbyConfig = {
  jsxRuntime: "automatic",
  graphqlTypegen: {
    generateOnBuild: true,
  },
  siteMetadata: siteMetadata,
  plugins: [
    gatsbyPluginPageCreator,
    gatsbyPluginSitemap,
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    gatsbySourceFileSystemStills,
    gatsbySourceFileSystemPosters,
    gatsbySourceFileSystemAvatars,
    "gatsby-transformer-json",
    gatsbySourceFileSystemData,
    gatsbySourceFileSystemPages,
    gatsbySourceFileSystemReviews,
    gatsbySourceFileSystemViewingNotes,
    gatsbyTransformerRemark,
    gatsbyPluginCatchLinks,
    gatsbyPluginManifest,
    gatsbyPluginFeed,
    "gatsby-plugin-vanilla-extract",
  ],
};

export default config;
